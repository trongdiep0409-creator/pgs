'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DbStore, Profile, Organization, OrganizationMember } from '@/services/dbStore';

interface AuthContextType {
  user: Profile | null;
  currentOrg: Organization | null;
  userRole: string | null;
  organizations: Organization[];
  login: (email: string) => boolean;
  logout: () => void;
  selectWorkspace: (orgId: string) => void;
  hasPermission: (action: string) => boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize LocalStorage Database first
    DbStore.initialize();

    // Check if session exists in localStorage
    const savedUserEmail = localStorage.getItem('pgs_session_user');
    const savedOrgId = localStorage.getItem('pgs_session_org');

    if (savedUserEmail) {
      const profiles = DbStore.getProfiles();
      const matchedUser = profiles.find(p => p.email === savedUserEmail);
      if (matchedUser) {
        setUser(matchedUser);

        // Fetch User Orgs
        const memberships = DbStore.getMembers();
        const userMemberships = memberships.filter(m => m.profile_id === matchedUser.id);
        const orgIds = userMemberships.map(m => m.organization_id);
        const orgs = DbStore.getOrganizations().filter(o => orgIds.includes(o.id));
        setOrganizations(orgs);

        // Select Workspace
        const targetOrgId = savedOrgId || orgIds[0];
        if (targetOrgId) {
          const org = orgs.find(o => o.id === targetOrgId);
          if (org) {
            setCurrentOrg(org);
            const mShip = userMemberships.find(m => m.organization_id === targetOrgId);
            setUserRole(mShip?.role || null);
          }
        }
      }
    }
    setLoading(false);
  }, []);

  const login = (email: string): boolean => {
    const profiles = DbStore.getProfiles();
    const matchedUser = profiles.find(p => p.email.toLowerCase() === email.toLowerCase());
    if (!matchedUser) return false;

    setUser(matchedUser);
    localStorage.setItem('pgs_session_user', matchedUser.email);
    document.cookie = `pgs_session_user=${encodeURIComponent(matchedUser.email)}; path=/; max-age=86400; SameSite=Lax`;

    // Fetch Orgs
    const memberships = DbStore.getMembers();
    const userMemberships = memberships.filter(m => m.profile_id === matchedUser.id);
    const orgIds = userMemberships.map(m => m.organization_id);
    const orgs = DbStore.getOrganizations().filter(o => orgIds.includes(o.id));
    setOrganizations(orgs);

    if (orgs.length > 0) {
      setCurrentOrg(orgs[0]);
      localStorage.setItem('pgs_session_org', orgs[0].id);
      const mShip = userMemberships.find(m => m.organization_id === orgs[0].id);
      setUserRole(mShip?.role || null);
    } else {
      setCurrentOrg(null);
      setUserRole(null);
    }
    
    DbStore.addAuditLog({
      actor_id: matchedUser.id,
      organization_id: orgs[0]?.id || undefined,
      entity_type: 'auth',
      entity_id: matchedUser.id,
      action: 'login'
    });

    return true;
  };

  const logout = () => {
    if (user) {
      DbStore.addAuditLog({
        actor_id: user.id,
        organization_id: currentOrg?.id || undefined,
        entity_type: 'auth',
        entity_id: user.id,
        action: 'logout'
      });
    }

    setUser(null);
    setCurrentOrg(null);
    setUserRole(null);
    setOrganizations([]);
    localStorage.removeItem('pgs_session_user');
    localStorage.removeItem('pgs_session_org');
    document.cookie = 'pgs_session_user=; path=/; max-age=0';
  };

  const selectWorkspace = (orgId: string) => {
    const org = organizations.find(o => o.id === orgId);
    if (org && user) {
      setCurrentOrg(org);
      localStorage.setItem('pgs_session_org', org.id);
      const memberships = DbStore.getMembers();
      const mShip = memberships.find(m => m.profile_id === user.id && m.organization_id === orgId);
      setUserRole(mShip?.role || null);

      DbStore.addAuditLog({
        actor_id: user.id,
        organization_id: org.id,
        entity_type: 'auth',
        entity_id: org.id,
        action: 'switch_workspace'
      });
    }
  };

  const hasPermission = (action: string): boolean => {
    if (!userRole || !user) return false;
    
    // Pending approval or disabled users have ZERO permissions
    if (user.account_status && user.account_status !== 'active') {
      return false;
    }

    // Super admin has all permissions
    if (userRole === 'super_admin') return true;

    // Define rules mappings
    switch (action) {
      case 'view_admin_panel':
        return ['super_admin', 'admin'].includes(userRole);
      case 'view_all_projects':
        return ['super_admin', 'admin', 'manager', 'accountant'].includes(userRole);
      case 'create_project':
      case 'manage_users':
        return ['super_admin', 'admin'].includes(userRole);
      case 'manage_tasks':
        return ['super_admin', 'admin', 'manager', 'employee'].includes(userRole);
      case 'view_payroll':
        return ['super_admin', 'admin', 'accountant'].includes(userRole);
      case 'view_own_payroll':
        return ['employee', 'manager', 'accountant'].includes(userRole);
      case 'approve_timesheets':
        return ['super_admin', 'admin', 'manager', 'accountant'].includes(userRole);
      case 'manage_billing':
        return ['super_admin', 'admin', 'accountant'].includes(userRole);
      default:
        return false;
    }
  };

  const value = React.useMemo(() => ({
    user,
    currentOrg,
    userRole,
    organizations,
    login,
    logout,
    selectWorkspace,
    hasPermission,
    loading,
  }), [user, currentOrg, userRole, organizations, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
