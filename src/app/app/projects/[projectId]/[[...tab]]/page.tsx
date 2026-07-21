'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import {
  DbStore,
  Project,
  Milestone,
  Task,
  Deliverable,
  DeliverableVersion,
  FileMetadata,
  Contract,
  ContractSigner,
  PaymentSchedule,
  Payment,
  AdsReport,
  Profile,
  TaskComment
} from '@/services/dbStore';
import {
  ArrowLeft,
  Calendar,
  Layers,
  CheckSquare,
  FileCheck,
  FolderOpen,
  BarChart3,
  DollarSign,
  TrendingUp,
  Clock,
  Plus,
  Trash2,
  Lock,
  MessageSquare,
  Upload,
  User,
  AlertTriangle,
  Download,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Award,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
// Recharts for Ads Report
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const tabRoute = params.tab?.[0]; // Catch-all route path
  const { user, userRole, hasPermission } = useAuth();

  // Active Tab - fallback to catch-all URL params if present
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'tasks' | 'approvals' | 'files' | 'ads' | 'billing'>('overview');

  // Database States
  const [project, setProject] = useState<Project | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [contract, setContract] = useState<Contract | null>(null);
  const [signers, setSigners] = useState<ContractSigner[]>([]);
  const [schedules, setSchedules] = useState<PaymentSchedule[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [adsReports, setAdsReports] = useState<AdsReport[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  // Task Interaction Modal/Form states
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskMilestone, setNewTaskMilestone] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [taskComments, setTaskComments] = useState<TaskComment[]>([]);

  // Deliverable action comments
  const [revComment, setRevComment] = useState('');

  // File Uploading States
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadingName, setUploadingName] = useState('');
  const [uploadVisibility, setUploadVisibility] = useState<'project_client' | 'project_internal' | 'finance_private'>('project_client');

  // Billing Proof Upload States
  const [uploadingProofSchedId, setUploadingProofSchedId] = useState<string | null>(null);

  // Syncing Ads States
  const [isSyncingAds, setIsSyncingAds] = useState(false);

  // New Milestone Form States
  const [newMilestoneName, setNewMilestoneName] = useState('');
  const [newMilestoneWeight, setNewMilestoneWeight] = useState(25);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'paid':
      case 'verified':
      case 'done':
        return 'bg-success/10 text-success border-success/20';
      case 'in_progress':
      case 'client_review':
      case 'ready_for_client':
      case 'pending_manager_review':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'client_blocked':
      case 'exception':
      case 'overdue':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20';
    }
  };

  useEffect(() => {
    if (tabRoute) {
      // Map potential plural or singular URL segments to activeTab state
      const tabMap: Record<string, typeof activeTab> = {
        overview: 'overview',
        milestones: 'milestones',
        timeline: 'milestones',
        tasks: 'tasks',
        approvals: 'approvals',
        files: 'files',
        ads: 'ads',
        contracts: 'billing',
        payments: 'billing',
        billing: 'billing',
      };
      const matchedTab = tabMap[tabRoute];
      if (matchedTab) {
        setActiveTab(matchedTab);
      }
    }
  }, [tabRoute]);

  useEffect(() => {
    const proj = DbStore.getProjectById(projectId);
    if (proj) {
      setProject(proj);
      setMilestones(DbStore.getMilestonesByProjectId(projectId));
      setTasks(DbStore.getTasksByProjectId(projectId));
      setDeliverables(DbStore.getDeliverables().filter(d => d.project_id === projectId));
      setFiles(DbStore.getFiles().filter(f => f.project_id === projectId && !f.is_deleted));
      
      const matchedContract = DbStore.getContracts().find(c => c.project_id === projectId);
      if (matchedContract) {
        setContract(matchedContract);
        setSigners(DbStore.getContractSigners(matchedContract.id));
        setSchedules(DbStore.getPaymentSchedules().filter(s => s.contract_id === matchedContract.id));
      }
      setPayments(DbStore.getPayments());
      setAdsReports(DbStore.getAdsReports().filter(r => r.project_id === projectId));
      setProfiles(DbStore.getProfiles());
    }
  }, [projectId]);

  if (!project) {
    return (
      <div className="py-12 text-center text-sm font-medium text-muted-foreground font-space">
        Đang tải thông tin dự án...
      </div>
    );
  }

  // Refreshes data locally from store
  const refreshData = () => {
    setProject(DbStore.getProjectById(projectId) || null);
    setMilestones(DbStore.getMilestonesByProjectId(projectId));
    setTasks(DbStore.getTasksByProjectId(projectId));
    setDeliverables(DbStore.getDeliverables().filter(d => d.project_id === projectId));
    setFiles(DbStore.getFiles().filter(f => f.project_id === projectId && !f.is_deleted));
    setAdsReports(DbStore.getAdsReports().filter(r => r.project_id === projectId));
  };

  // Milestone Actions
  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneName) return;

    const newM: Milestone = {
      id: `m-${Math.random().toString(36).substring(7)}`,
      project_id: projectId,
      name: newMilestoneName,
      weight_percent: newMilestoneWeight,
      completion_percent: 0,
      status: 'not_started'
    };

    const currentMilestones = DbStore.getMilestones();
    DbStore.saveMilestones([...currentMilestones, newM]);
    setNewMilestoneName('');
    refreshData();
  };

  const handleUpdateMilestoneProgress = (mId: string, progress: number) => {
    const list = DbStore.getMilestones();
    const idx = list.findIndex(m => m.id === mId);
    if (idx !== -1) {
      list[idx].completion_percent = progress;
      list[idx].status = progress === 100 ? 'completed' : progress > 0 ? 'in_progress' : 'not_started';
      DbStore.updateMilestone(list[idx]);
      refreshData();
    }
  };

  // Task Actions
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    const newTask: Task = {
      id: `t-${Math.random().toString(36).substring(7)}`,
      project_id: projectId,
      milestone_id: newTaskMilestone || undefined,
      title: newTaskTitle,
      priority: 'medium',
      status: 'todo'
    };

    const currentTasks = DbStore.getTasks();
    DbStore.saveTasks([...currentTasks, newTask]);
    setNewTaskTitle('');
    setNewTaskMilestone('');
    refreshData();
  };

  const handleUpdateTaskStatus = (tId: string, newStatus: Task['status']) => {
    const list = DbStore.getTasks();
    const idx = list.findIndex(t => t.id === tId);
    if (idx !== -1) {
      const oldStatus = list[idx].status;
      list[idx].status = newStatus;
      if (newStatus === 'done') {
        list[idx].completed_at = new Date().toISOString();
        if (user) list[idx].completed_by = user.id;
      }
      DbStore.updateTask(list[idx]);
      refreshData();

      // Log action
      if (user) {
        DbStore.addAuditLog({
          actor_id: user.id,
          entity_type: 'task',
          entity_id: tId,
          action: 'update_task_status',
          before_state: { status: oldStatus },
          after_state: { status: newStatus }
        });
      }
    }
  };

  const selectTaskForDetails = (task: Task) => {
    setSelectedTask(task);
    setTaskComments(DbStore.getComments().filter(c => c.task_id === task.id));
  };

  const handleAddTaskComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText || !selectedTask || !user) return;

    const comment: TaskComment = {
      id: Math.random().toString(36).substring(7),
      task_id: selectedTask.id,
      profile_id: user.id,
      content: newCommentText,
      visibility: 'client_visible',
      created_at: new Date().toISOString()
    };

    DbStore.addComment(comment);
    setNewCommentText('');
    setTaskComments(DbStore.getComments().filter(c => c.task_id === selectedTask.id));
  };

  // Deliverable Actions
  const handleApproveDeliverable = (dId: string) => {
    const list = DbStore.getDeliverables();
    const idx = list.findIndex(d => d.id === dId);
    if (idx !== -1) {
      list[idx].status = 'approved';
      DbStore.updateDeliverable(list[idx]);
      refreshData();

      // Notification
      const pmId = project.pm_id;
      if (pmId) {
        const notif = {
          id: Math.random().toString(36).substring(7),
          profile_id: pmId,
          title: 'Khách hàng đã duyệt Deliverable',
          content: `Tài liệu/Thiết kế "${list[idx].title}" đã được khách hàng duyệt thành công.`,
          type: 'success' as const,
          link_url: `/app/projects/${projectId}`,
          is_read: false,
          created_at: new Date().toISOString()
        };
        const allN = JSON.parse(localStorage.getItem('pgs_notifications') || '[]');
        allN.push(notif);
        localStorage.setItem('pgs_notifications', JSON.stringify(allN));
      }
    }
  };

  const handleRequestRevisionDeliverable = (dId: string) => {
    if (!revComment) return;
    const list = DbStore.getDeliverables();
    const idx = list.findIndex(d => d.id === dId);
    if (idx !== -1) {
      list[idx].status = 'revision_requested';
      DbStore.updateDeliverable(list[idx]);
      setRevComment('');
      refreshData();

      // Notification
      const pmId = project.pm_id;
      if (pmId) {
        const notif = {
          id: Math.random().toString(36).substring(7),
          profile_id: pmId,
          title: 'Yêu cầu sửa đổi Deliverable',
          content: `Khách hàng yêu cầu chỉnh sửa "${list[idx].title}". Phản hồi: "${revComment}"`,
          type: 'warning' as const,
          link_url: `/app/projects/${projectId}`,
          is_read: false,
          created_at: new Date().toISOString()
        };
        const allN = JSON.parse(localStorage.getItem('pgs_notifications') || '[]');
        allN.push(notif);
        localStorage.setItem('pgs_notifications', JSON.stringify(allN));
      }
    }
  };

  // Files Upload Mock
  const handleUploadFileMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploadingName(file.name);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 10;
        if (prev >= 100) {
          clearInterval(interval);
          
          const newMeta: FileMetadata = {
            id: `f-${Math.random().toString(36).substring(7)}`,
            organization_id: project.organization_id,
            project_id: projectId,
            name: file.name,
            size_bytes: file.size,
            mime_type: file.type || 'application/octet-stream',
            storage_path: `organizations/${project.organization_id}/projects/${projectId}/files/${file.name}`,
            visibility: uploadVisibility,
            created_by: user.id,
            is_deleted: false,
            created_at: new Date().toISOString()
          };

          DbStore.uploadFile(newMeta);
          refreshData();
          setUploadingName('');
          return null;
        }
        return prev + 30;
      });
    }, 300);
  };

  const handleDeleteFile = (fId: string) => {
    if (confirm('Bạn có chắc chắn muốn xoá file này?')) {
      DbStore.deleteFile(fId);
      refreshData();
    }
  };

  // Ads Reporting actions
  const handleSyncAdsReport = () => {
    setIsSyncingAds(true);
    setTimeout(() => {
      // Simulate fetching Meta Ads insights
      const reports = DbStore.getAdsReports();
      const reportIndex = reports.findIndex(r => r.project_id === projectId);
      if (reportIndex !== -1) {
        reports[reportIndex].spend = 21000000.00;
        reports[reportIndex].impressions = 520000;
        reports[reportIndex].clicks = 18200;
        reports[reportIndex].leads = 368;
        DbStore.saveAdsReports(reports);
      }
      setIsSyncingAds(false);
      refreshData();
    }, 1200);
  };

  // Contract E-signature Sign Action
  const handleSignatureAction = (signerId: string) => {
    if (!contract) return;
    DbStore.signContract(contract.id, signerId, {
      ip_address: '113.190.230.12',
      device_metadata: 'Chrome / Windows 11 (Simulated Sign)',
      verification_method: 'OTP SMS Verification'
    });
    
    // Refresh Contract Status
    const matchedContract = DbStore.getContracts().find(c => c.project_id === projectId);
    if (matchedContract) {
      setContract(matchedContract);
      setSigners(DbStore.getContractSigners(matchedContract.id));
    }
  };

  // Upload Payment Receipt Voucher proof mock
  const handleUploadPaymentProofMock = (schedId: string) => {
    setUploadingProofSchedId(schedId);
    setTimeout(() => {
      const pay: Payment = {
        id: `pay-${Math.random().toString(36).substring(7)}`,
        payment_schedule_id: schedId,
        amount_paid: schedules.find(s => s.id === schedId)?.amount || 0,
        paid_date: new Date().toISOString().split('T')[0],
        payment_method: 'Chuyển khoản Ngân hàng',
        proof_file_url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=500',
        notes: 'Khách hàng tải lên ủy nhiệm chi.',
        created_at: new Date().toISOString()
      };
      DbStore.addPayment(pay);
      setUploadingProofSchedId(null);
      
      // Refresh Billing status
      if (contract) {
        setSchedules(DbStore.getPaymentSchedules().filter(s => s.contract_id === contract.id));
      }
      setPayments(DbStore.getPayments());
    }, 1000);
  };

  // Format Helper
  const formatCurrency = (val: number) => {
    return val.toLocaleString('vi-VN') + 'đ';
  };

  const handleCompleteProject = () => {
    if (!project) return;
    const updated = {
      ...project,
      status: 'completed' as const,
      progress: 100,
      actual_end_date: new Date().toISOString().split('T')[0]
    };
    DbStore.updateProject(updated);
    setProject(updated);

    if (user) {
      DbStore.addAuditLog({
        actor_id: user.id,
        organization_id: project.organization_id,
        entity_type: 'project',
        entity_id: project.id,
        action: 'complete_project',
        after_state: { status: 'completed', progress: 100 }
      });
    }

    alert('Dự án đã được đánh dấu HOÀN THÀNH! Tự động chuyển hướng qua trang "Dự án đã triển khai".');
    router.push('/app/portfolio');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top breadcrumb navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push('/app/projects')}
          className="p-2 rounded-xl border border-border hover:bg-background-cream transition-all"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
        </button>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Link href="/app/projects" className="hover:underline">Dự án</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-bold">{project.name}</span>
        </div>
      </div>

      {/* Project Banner Title & Code */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold font-space text-foreground">{project.name}</h1>
            <span className="text-[10px] font-mono border border-border px-2 py-0.5 rounded-lg bg-background-cream font-bold">
              {project.code}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{project.description || 'Không có mô tả cho dự án này.'}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground">Tiến độ:</span>
            <span className="text-base font-bold font-space text-primary-dark">{project.progress}%</span>
          </div>

          {project.status !== 'completed' ? (
            <button
              onClick={handleCompleteProject}
              className="px-4 py-2 bg-success text-white hover:bg-green-700 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Hoàn thành Dự án</span>
            </button>
          ) : (
            <span className="px-3 py-1.5 bg-success/10 text-success border border-success/20 font-bold text-xs rounded-xl flex items-center gap-1.5">
              <Award className="h-4 w-4" />
              <span>Đã hoàn thành</span>
            </span>
          )}
        </div>
      </div>

      {/* Tabs list navigation */}
      <div className="flex border-b border-border overflow-x-auto scrollbar-none gap-2">
        {(
          [
            { id: 'overview', label: 'Tổng quan', icon: Layers },
            { id: 'milestones', label: 'Milestones', icon: Clock },
            { id: 'tasks', label: 'Tasks', icon: CheckSquare },
            { id: 'approvals', label: 'Duyệt file (Deliverables)', icon: FileCheck },
            { id: 'files', label: 'Tài liệu & Storage', icon: FolderOpen },
            { id: 'ads', label: 'Báo cáo Ads', icon: BarChart3 },
            { id: 'billing', label: 'Thanh toán & Hợp đồng', icon: DollarSign },
          ] as const
        ).map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                router.push(`/app/projects/${projectId}/${tab.id}`);
              }}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-bold shrink-0 transition-all ${
                isActive
                  ? 'border-primary text-black font-space'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT RENDER */}
      <div className="space-y-8">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              
              {/* Milestones status check */}
              <div className="border border-border rounded-2xl p-6 bg-background space-y-4">
                <h3 className="text-sm font-bold font-space text-foreground">Trạng thái các Milestones</h3>
                <div className="divide-y divide-border">
                  {milestones.map((m) => (
                    <div key={m.id} className="py-3.5 first:pt-0 last:pb-0 flex justify-between items-center gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-foreground">{m.name}</h4>
                        <p className="text-[10px] text-muted-foreground">
                          Trọng số: <span className="font-semibold">{m.weight_percent}%</span> • Đã xong:{' '}
                          <span className="font-semibold">{m.completion_percent}%</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[9px] font-bold px-2 py-0.5 border rounded-md uppercase tracking-wider bg-background-cream text-foreground border-border`}>
                          {m.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Status Summary */}
              {contract && (
                <div className="border border-border rounded-2xl p-6 bg-background space-y-4">
                  <h3 className="text-sm font-bold font-space text-foreground">Tình hình tài chính dự án</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-background-cream/40 border border-border rounded-xl p-4">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Giá trị hợp đồng</p>
                      <h4 className="text-base font-bold font-space text-foreground mt-1">
                        {formatCurrency(contract.value)}
                      </h4>
                    </div>

                    <div className="bg-background-cream/40 border border-border rounded-xl p-4">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Đã thanh toán</p>
                      <h4 className="text-base font-bold font-space text-success mt-1">
                        {formatCurrency(
                          schedules
                            .filter(s => s.status === 'paid')
                            .reduce((sum, s) => sum + s.amount, 0)
                        )}
                      </h4>
                    </div>

                    <div className="bg-background-cream/40 border border-border rounded-xl p-4">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Còn lại</p>
                      <h4 className="text-base font-bold font-space text-warning mt-1">
                        {formatCurrency(
                          schedules
                            .filter(s => s.status !== 'paid')
                            .reduce((sum, s) => sum + s.amount, 0)
                        )}
                      </h4>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6">
              {/* Project Members / Team */}
              <div className="border border-border rounded-2xl p-6 bg-background space-y-4">
                <h3 className="text-sm font-bold font-space text-foreground">Thành viên tham gia</h3>
                <div className="space-y-3">
                  {profiles.slice(0, 4).map((m) => (
                    <div key={m.id} className="flex items-center gap-3">
                      <img src={m.avatar_url} alt={m.full_name} className="h-8 w-8 rounded-lg bg-background-cream border border-border" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-foreground truncate">{m.full_name}</span>
                        <span className="text-[9px] text-muted-foreground truncate">{m.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MILESTONES TAB */}
        {activeTab === 'milestones' && (
          <div className="space-y-6">
            <div className="border border-border rounded-2xl p-6 bg-background space-y-6">
              <h3 className="text-sm font-bold font-space text-foreground">Thiết lập Milestones & Trọng số</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tiến độ của dự án được tính dựa trên công thức trọng số của từng Milestone:{' '}
                <code className="bg-background-cream px-1.5 py-0.5 rounded font-mono font-bold text-primary-dark">
                  Tổng(milestone.weight_percent * milestone.completion_percent / 100)
                </code>. Tổng tất cả trọng số các milestone phải bằng 100%.
              </p>

              <div className="divide-y divide-border">
                {milestones.map((m) => (
                  <div key={m.id} className="py-4 first:pt-0 last:pb-0 space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-foreground">{m.name}</h4>
                        <span className="text-[10px] text-muted-foreground">
                          Trọng số đóng góp: <span className="font-bold">{m.weight_percent}%</span>
                        </span>
                      </div>

                      {/* Manual update slider for PM/Admin */}
                      {['super_admin', 'admin', 'manager'].includes(userRole!) ? (
                        <div className="flex items-center gap-3">
                          <label className="text-[10px] font-semibold text-muted-foreground shrink-0">
                            Tiến độ: {m.completion_percent}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={m.completion_percent}
                            onChange={(e) => handleUpdateMilestoneProgress(m.id, parseInt(e.target.value))}
                            className="w-32 accent-primary cursor-pointer"
                          />
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-primary-dark">Đã hoàn thành: {m.completion_percent}%</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Milestone Form for PMs */}
              {['super_admin', 'admin', 'manager'].includes(userRole!) && (
                <form onSubmit={handleAddMilestone} className="pt-4 border-t border-border flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Tên Milestone mới..."
                    value={newMilestoneName}
                    onChange={(e) => setNewMilestoneName(e.target.value)}
                    className="flex-1 text-xs bg-background-cream/30 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary"
                  />
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-muted-foreground">Trọng số (%):</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={newMilestoneWeight}
                      onChange={(e) => setNewMilestoneWeight(parseInt(e.target.value) || 0)}
                      className="w-16 text-xs bg-background border border-border rounded-xl px-2 py-2.5 outline-none focus:border-primary text-center font-bold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-xs font-bold bg-primary hover:bg-primary-dark text-black px-4 py-2.5 rounded-xl transition-all"
                  >
                    Thêm Milestone
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* TASKS TAB */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-sm font-bold font-space text-foreground">Danh sách công việc & Trạng thái</h3>
              
              {/* Task adding form */}
              {['super_admin', 'admin', 'manager', 'employee'].includes(userRole!) && (
                <form onSubmit={handleCreateTask} className="flex gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    required
                    placeholder="Tên công việc mới..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="flex-1 sm:w-60 text-xs bg-background border border-border rounded-xl px-3.5 py-2 outline-none focus:border-primary"
                  />
                  <select
                    value={newTaskMilestone}
                    onChange={(e) => setNewTaskMilestone(e.target.value)}
                    className="text-xs bg-background border border-border rounded-xl px-2 py-2 cursor-pointer outline-none"
                  >
                    <option value="">Chọn Milestone</option>
                    {milestones.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-black text-xs font-bold px-4 py-2 rounded-xl transition-all"
                  >
                    Thêm
                  </button>
                </form>
              )}
            </div>

            {/* Task list view */}
            <div className="border border-border rounded-2xl bg-background overflow-hidden">
              <div className="divide-y divide-border">
                {tasks.map((t) => (
                  <div key={t.id} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-background-cream/10 transition-all">
                    <div className="space-y-1">
                      <h4
                        onClick={() => selectTaskForDetails(t)}
                        className="text-xs font-bold text-foreground hover:text-primary-dark cursor-pointer transition-all"
                      >
                        {t.title}
                      </h4>
                      <p className="text-[10px] text-muted-foreground">
                        Mức độ: <span className="font-semibold text-warning">{t.priority}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={t.status}
                        onChange={(e) => handleUpdateTaskStatus(t.id, e.target.value as Task['status'])}
                        className={`text-[10px] font-bold border rounded-md px-2 py-1 uppercase tracking-wide cursor-pointer outline-none ${getStatusBadge(t.status)}`}
                      >
                        <option value="todo">Chưa làm</option>
                        <option value="in_progress">Đang làm</option>
                        <option value="internal_review">Kiểm tra nội bộ</option>
                        <option value="waiting_client">Chờ phản hồi khách</option>
                        <option value="done">Hoàn thành</option>
                      </select>
                      
                      <button
                        onClick={() => selectTaskForDetails(t)}
                        className="p-1.5 rounded-lg border border-border hover:bg-background-cream"
                      >
                        <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Task Detail & Comments Modal Drawer */}
            {selectedTask && (
              <div className="border border-border rounded-2xl p-6 bg-background-cream/40 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-foreground">Bình luận & Trao đổi: {selectedTask.title}</h4>
                  <button onClick={() => setSelectedTask(null)} className="text-[10px] font-bold text-muted-foreground hover:underline">
                    Đóng
                  </button>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {taskComments.length === 0 ? (
                    <p className="text-[11px] text-muted-foreground italic">Chưa có bình luận nào cho task này.</p>
                  ) : (
                    taskComments.map(c => {
                      const sender = profiles.find(p => p.id === c.profile_id);
                      return (
                        <div key={c.id} className="p-3 bg-background border border-border rounded-xl space-y-1">
                          <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                            <span className="font-bold text-foreground">{sender?.full_name || 'Người dùng'}</span>
                            <span>{new Date(c.created_at).toLocaleDateString('vi-VN')}</span>
                          </div>
                          <p className="text-xs text-foreground leading-relaxed">{c.content}</p>
                        </div>
                      );
                    })
                  )}
                </div>

                <form onSubmit={handleAddTaskComment} className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Nhập nội dung bình luận..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="flex-1 text-xs bg-background border border-border rounded-xl px-3.5 py-2 outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-black text-xs font-bold px-4 py-2 rounded-xl transition-all"
                  >
                    Gửi
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* APPROVALS TAB (Deliverables) */}
        {activeTab === 'approvals' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold font-space text-foreground">Tài liệu, Ấn phẩm chờ duyệt (Deliverables)</h3>

            <div className="space-y-6">
              {deliverables.map((deliv) => {
                const versions = DbStore.getDeliverableVersions(deliv.id);
                const currentVersion = versions[0];
                return (
                  <div key={deliv.id} className="border border-border bg-background rounded-2xl p-5 space-y-4 shadow-xs">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-foreground">{deliv.title}</h4>
                        <p className="text-[10px] text-muted-foreground">{deliv.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-md uppercase tracking-wider ${getStatusBadge(deliv.status)}`}>
                          {deliv.status}
                        </span>
                      </div>
                    </div>

                    {currentVersion && (
                      <div className="p-3.5 bg-background-cream/45 border border-border rounded-xl space-y-2">
                        <div className="flex justify-between items-center text-[10px] text-muted-foreground font-medium">
                          <span>Phiên bản v{currentVersion.version}</span>
                          <span>Tải lên lúc: {new Date(currentVersion.created_at).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <p className="text-xs text-foreground italic">Ghi chú version: &quot;{currentVersion.notes}&quot;</p>
                        
                        <div className="pt-2">
                          <a
                            href={currentVersion.file_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-primary-dark font-bold hover:underline"
                          >
                            <span>Xem liên kết đính kèm</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Customer decision options */}
                    {['client_owner', 'client_member', 'super_admin'].includes(userRole!) && deliv.status === 'ready_for_client' && (
                      <div className="pt-3 border-t border-border flex flex-col sm:flex-row gap-3 items-center">
                        <button
                          onClick={() => handleApproveDeliverable(deliv.id)}
                          className="w-full sm:w-auto text-xs font-bold bg-success hover:bg-success/90 text-white px-4 py-2.5 rounded-xl transition-all"
                        >
                          Phê duyệt bản này
                        </button>
                        
                        <div className="flex-1 flex gap-2 w-full">
                          <input
                            type="text"
                            placeholder="Ghi chú chỉnh sửa nếu yêu cầu làm lại..."
                            value={revComment}
                            onChange={(e) => setRevComment(e.target.value)}
                            className="flex-1 text-xs bg-background border border-border rounded-xl px-3.5 py-2 outline-none"
                          />
                          <button
                            onClick={() => handleRequestRevisionDeliverable(deliv.id)}
                            disabled={!revComment}
                            className="text-xs font-bold bg-error hover:bg-error/95 text-white px-4 py-2.5 rounded-xl transition-all disabled:opacity-50"
                          >
                            Yêu cầu sửa lại
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* FILES & STORAGE TAB */}
        {activeTab === 'files' && (
          <div className="space-y-6">
            <div className="border border-border rounded-2xl p-6 bg-background space-y-6">
              <h3 className="text-sm font-bold font-space text-foreground">Kho dữ liệu File Dự án</h3>

              {/* Upload control panel */}
              {['super_admin', 'admin', 'manager', 'employee'].includes(userRole!) && (
                <div className="p-4 bg-background-cream/35 border border-border rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="text-xs font-bold text-foreground">Đăng tải File tài liệu</span>
                    <span className="text-[10px] text-muted-foreground">Kéo thả hoặc chọn file để tải vào kho lưu trữ Supabase</span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <select
                      value={uploadVisibility}
                      onChange={(e) => setUploadVisibility(e.target.value as 'project_client' | 'project_internal' | 'finance_private')}
                      className="text-xs bg-background border border-border rounded-xl p-2.5 cursor-pointer"
                    >
                      <option value="project_client">Công khai với Khách</option>
                      <option value="project_internal">PGS Nội bộ</option>
                      <option value="finance_private">Kế toán Bảo mật</option>
                    </select>

                    <label className="text-xs font-bold bg-primary hover:bg-primary-dark text-black px-4 py-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      <span>{uploadProgress !== null ? `Đang tải ${uploadProgress}%` : 'Chọn File tải lên'}</span>
                      <input
                        type="file"
                        onChange={handleUploadFileMock}
                        disabled={uploadProgress !== null}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Uploading progress notification */}
              {uploadProgress !== null && (
                <div className="p-3.5 bg-background-cream border border-border rounded-xl space-y-1.5">
                  <p className="text-xs font-bold text-foreground">Đang tải lên: {uploadingName}</p>
                  <div className="w-full bg-border h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              )}

              {/* List files */}
              <div className="divide-y divide-border">
                {files.map((file) => (
                  <div key={file.id} className="py-3.5 first:pt-0 last:pb-0 flex justify-between items-center gap-4">
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-foreground truncate">{file.name}</h4>
                      <p className="text-[10px] text-muted-foreground">
                        {(file.size_bytes / (1024 * 1024)).toFixed(2)} MB • Phạm vi:{' '}
                        <span className="font-semibold text-primary-dark uppercase">{file.visibility}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={file.storage_path}
                        download
                        className="p-1.5 rounded-lg border border-border hover:bg-background-cream"
                      >
                        <Download className="h-3.5 w-3.5 text-muted-foreground" />
                      </a>
                      
                      {['super_admin', 'admin', 'manager'].includes(userRole!) && (
                        <button
                          onClick={() => handleDeleteFile(file.id)}
                          className="p-1.5 rounded-lg border border-border hover:bg-error/10 hover:border-error group"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-muted-foreground group-hover:text-error" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {files.length === 0 && (
                  <p className="py-4 text-center text-xs text-muted-foreground italic">Không có tài liệu nào trong dự án.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ADS REPORTING TAB */}
        {activeTab === 'ads' && (
          <div className="space-y-6">
            <div className="border border-border rounded-2xl p-6 bg-background space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-sm font-bold font-space text-foreground">Hiệu suất Chiến dịch Quảng cáo</h3>
                  <p className="text-xs text-muted-foreground">Báo cáo trực quan hợp nhất từ Meta, Google, TikTok Ads.</p>
                </div>
                
                {['super_admin', 'admin', 'manager'].includes(userRole!) && (
                  <button
                    onClick={handleSyncAdsReport}
                    disabled={isSyncingAds}
                    className="flex items-center gap-2 rounded-xl bg-primary hover:bg-primary-dark text-black px-4 py-2.5 text-xs font-bold transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`h-4 w-4 ${isSyncingAds ? 'animate-spin' : ''}`} />
                    <span>{isSyncingAds ? 'Đang đồng bộ live API...' : 'Đồng bộ Live API'}</span>
                  </button>
                )}
              </div>

              {/* Analytical Charts */}
              {adsReports.map((report) => (
                <div key={report.id} className="space-y-6">
                  {/* KPI cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="border border-border rounded-xl p-4 bg-background-cream/20">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Tổng ngân sách chi</span>
                      <h4 className="text-base font-bold font-space text-foreground mt-1">{formatCurrency(report.spend)}</h4>
                    </div>
                    <div className="border border-border rounded-xl p-4 bg-background-cream/20">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Số Leads đạt được</span>
                      <h4 className="text-base font-bold font-space text-success mt-1">{report.leads} Leads</h4>
                    </div>
                    <div className="border border-border rounded-xl p-4 bg-background-cream/20">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">CPL trung bình</span>
                      <h4 className="text-base font-bold font-space text-warning mt-1">
                        {formatCurrency(Math.round(report.spend / report.leads))}
                      </h4>
                    </div>
                    <div className="border border-border rounded-xl p-4 bg-background-cream/20">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">CTR trung bình</span>
                      <h4 className="text-base font-bold font-space text-primary-dark mt-1">
                        {((report.clicks / report.impressions) * 100).toFixed(2)}%
                      </h4>
                    </div>
                  </div>

                  {/* Recharts chart mockup */}
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={[
                          { name: 'Tuần 1', spend: 4000000, leads: 72 },
                          { name: 'Tuần 2', spend: 5600000, leads: 106 },
                          { name: 'Tuần 3', spend: 4800000, leads: 137 },
                          { name: 'Tuần 4', spend: report.spend - 14400000, leads: report.leads - 315 },
                        ]}
                        margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
                        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: 10 }} />
                        <Bar yAxisId="left" dataKey="spend" name="Chi tiêu (VND)" fill="#FFC400" radius={[4, 4, 0, 0]} />
                        <Line yAxisId="right" type="monotone" dataKey="leads" name="Leads" stroke="#16803A" strokeWidth={2.5} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Comments analysis */}
                  <div className="p-4 rounded-xl bg-background-cream/45 border border-border space-y-2">
                    <span className="text-xs font-bold text-foreground">Phân tích nhận định của PGS Agency:</span>
                    <p className="text-xs text-foreground leading-relaxed">{report.analysis}</p>
                    
                    <div className="pt-2 border-t border-border/60">
                      <span className="text-xs font-bold text-foreground">Đề xuất hành động tiếp theo:</span>
                      <p className="text-xs text-foreground whitespace-pre-line leading-relaxed mt-1">{report.next_actions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BILLING & CONTRACTS TAB */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            
            {/* E-signature digital signing status */}
            {contract && (
              <div className="border border-border rounded-2xl p-6 bg-background space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold font-space text-foreground">Hợp đồng điện tử: {contract.contract_number}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-md uppercase tracking-wider ${getStatusBadge(contract.status)}`}>
                    {contract.status}
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="p-3.5 bg-background-cream/45 border border-border rounded-xl flex items-center justify-between">
                    <span className="text-xs text-foreground font-semibold">{contract.title}</span>
                    <a
                      href={contract.signed_file_url || contract.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-primary-dark font-bold hover:underline flex items-center gap-1 shrink-0"
                    >
                      <span>Tải PDF hợp đồng</span>
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  {/* Signers log */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Trạng thái ký số</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {signers.map(s => {
                        const matchedProfile = profiles.find(p => p.id === s.profile_id);
                        return (
                          <div key={s.id} className="p-3.5 border border-border rounded-xl bg-background flex flex-col justify-between min-h-[110px]">
                            <div>
                              <p className="text-xs font-bold text-foreground">{s.role_title}</p>
                              <p className="text-[10px] text-muted-foreground">{matchedProfile?.full_name || 'Đang chờ chỉ định'}</p>
                            </div>
                            
                            <div className="mt-2 pt-2 border-t border-border flex justify-between items-center">
                              {s.signed_at ? (
                                <div className="text-[10px] text-success font-semibold flex items-center gap-1">
                                  <CheckSquare className="h-3.5 w-3.5" />
                                  <span>Đã ký ngày {new Date(s.signed_at).toLocaleDateString('vi-VN')}</span>
                                </div>
                              ) : (
                                <>
                                  <span className="text-[10px] text-error font-medium">Chưa ký</span>
                                  {user && user.id === s.profile_id && (
                                    <button
                                      onClick={() => handleSignatureAction(user.id)}
                                      className="text-[10px] font-bold bg-primary hover:bg-primary-dark text-black px-2.5 py-1 rounded-md transition-all"
                                    >
                                      Ký duyệt
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment schedules billing list */}
            {contract && (
              <div className="border border-border rounded-2xl p-6 bg-background space-y-4">
                <h3 className="text-sm font-bold font-space text-foreground">Lịch trình thanh toán & Đợt hóa đơn</h3>

                <div className="divide-y divide-border">
                  {schedules.map((s) => {
                    const proofPayment = payments.find(p => p.payment_schedule_id === s.id);
                    return (
                      <div key={s.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                          <h4 className="text-xs font-bold text-foreground">{s.milestone_name}</h4>
                          <p className="text-[10px] text-muted-foreground">
                            Hạn thanh toán: <span className="font-semibold">{new Date(s.due_date).toLocaleDateString('vi-VN')}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <span className="text-xs font-bold text-foreground font-space">{formatCurrency(s.amount)}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-md uppercase tracking-wider ${getStatusBadge(s.status)}`}>
                            {s.status}
                          </span>

                          {/* Client upload payment proof receipt voucher */}
                          {['client_owner', 'client_member', 'super_admin'].includes(userRole!) && s.status !== 'paid' && (
                            <button
                              onClick={() => handleUploadPaymentProofMock(s.id)}
                              disabled={uploadingProofSchedId === s.id}
                              className="text-[10px] font-bold border border-border bg-background-cream/40 hover:bg-primary hover:text-black hover:border-primary px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
                            >
                              {uploadingProofSchedId === s.id ? 'Đang gửi...' : 'Gửi chứng từ thanh toán'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
