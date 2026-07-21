'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { DbStore, FileMetadata } from '@/services/dbStore';
import { FolderOpen, Download, Trash2, ShieldAlert } from 'lucide-react';

export default function GlobalFilesPage() {
  const { user, userRole, loading } = useAuth();
  const [files, setFiles] = useState<FileMetadata[]>([]);

  useEffect(() => {
    if (user) {
      // Load all files that are not deleted and visible to this user role
      const allFiles = DbStore.getFiles().filter(f => !f.is_deleted);
      if (['super_admin', 'admin', 'accountant'].includes(userRole!)) {
        setFiles(allFiles);
      } else if (userRole === 'manager' || userRole === 'employee') {
        setFiles(allFiles.filter(f => f.visibility !== 'finance_private'));
      } else {
        // Client only sees project client files
        setFiles(allFiles.filter(f => f.visibility === 'project_client'));
      }
    }
  }, [user, userRole]);

  const handleDeleteFile = (fId: string) => {
    if (confirm('Bạn có chắc chắn muốn xoá file này?')) {
      DbStore.deleteFile(fId);
      // Reload
      const allFiles = DbStore.getFiles().filter(f => !f.is_deleted);
      setFiles(allFiles);
    }
  };

  if (loading || !user) {
    return <div className="text-center text-xs text-muted-foreground">Đang tải...</div>;
  }

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold font-space text-foreground font-space">Kho lưu trữ tài liệu</h1>
        <p className="text-xs text-muted-foreground">Xem toàn bộ tài liệu dự án và văn bản pháp lý được phân quyền cho bạn.</p>
      </div>

      <div className="border border-border rounded-2xl p-6 bg-background space-y-4">
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
            <div className="py-12 flex flex-col items-center justify-center text-center p-6 bg-background-cream/15 rounded-xl border border-dashed border-border">
              <FolderOpen className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground italic">Không có tài liệu nào khả dụng.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
