'use client';

import React, { useState } from 'react';
import { Download, FileText, BookOpen, Layers, Video, Search, ShieldCheck, Sparkles, Plus, X, Link as LinkIcon, FileSpreadsheet, Film } from 'lucide-react';

interface ResourceItem {
  id: string;
  title: string;
  category: 'brand' | 'contracts' | 'sop' | 'pitch' | 'training';
  description: string;
  fileSize: string;
  fileType: string;
  downloadUrl: string;
  updatedAt: string;
}

const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'PGS Agency — Brand Guidelines & Color Tokens 2026',
    category: 'brand',
    description: 'Quy chuẩn hệ thống nhận diện thương hiệu PGS, mã màu Vàng-Trắng (#FFC400, #FFFBF0), Font Space Grotesk & Logo Vectors (SVG, PNG, AI).',
    fileSize: '18.4 MB',
    fileType: 'ZIP / PDF',
    downloadUrl: '/public/PGS_Brand_Kit_2026.zip',
    updatedAt: '2026-07-01'
  },
  {
    id: 'res-2',
    title: 'PGS Hub — UI/UX Specification & Component System',
    category: 'brand',
    description: 'Tài liệu thiết kế giao diện chuẩn Châu Âu dành cho đội ngũ Designer và Frontend Developer.',
    fileSize: '4.2 MB',
    fileType: 'PDF / DOCS',
    downloadUrl: '/docs/pgs-hub/04-ui-ux-specification.md',
    updatedAt: '2026-07-21'
  },
  {
    id: 'res-3',
    title: 'Mẫu Hợp đồng Dịch vụ Marketing & Campaign Performance (Chuẩn)',
    category: 'contracts',
    description: 'Mẫu hợp đồng pháp lý đầy đủ điều khoản bảo mật NDA, tiến độ thanh toán (40-30-30) và cam kết KPI.',
    fileSize: '1.2 MB',
    fileType: 'DOCX / SHEET',
    downloadUrl: '/public/Sample_Marketing_Contract.docx',
    updatedAt: '2026-06-15'
  },
  {
    id: 'res-4',
    title: 'Mẫu Biên bản Nghiệm thu & Thanh lý Hợp đồng PGS Agency',
    category: 'contracts',
    description: 'Biểu mẫu chuẩn dành cho Account & Kế toán khi hoàn thành milestone hoặc dự án.',
    fileSize: '540 KB',
    fileType: 'DOCX',
    downloadUrl: '/public/Acceptance_Report_Template.docx',
    updatedAt: '2026-06-20'
  },
  {
    id: 'res-5',
    title: 'PGS Pitch Proposal & Báo giá Dịch vụ Tổng thể 2026',
    category: 'contracts',
    description: 'Template Slide Proposal đề xuất giải pháp truyền thông, KPIs và Báo giá dành cho Client mới.',
    fileSize: '24.8 MB',
    fileType: 'PPTX / SLIDE',
    downloadUrl: '/public/PGS_Proposal_Template_2026.pptx',
    updatedAt: '2026-07-10'
  },
  {
    id: 'res-6',
    title: 'SOP — Quy trình Chấm công Geofence & Khởi tạo Thiết bị Tin cậy',
    category: 'sop',
    description: 'Quy định nội bộ về giờ làm việc, Grace Period đi muộn, chấm công QR tại văn phòng và duyệt thiết bị cá nhân.',
    fileSize: '850 KB',
    fileType: 'PDF / DOCS',
    downloadUrl: '/public/SOP_Attendance_Device_Policy.pdf',
    updatedAt: '2026-07-19'
  },
  {
    id: 'res-7',
    title: 'SOP — Quy trình Phê duyệt Deliverable 2 Vòng (Internal ➔ Client Review)',
    category: 'sop',
    description: 'Hướng dẫn quản lý phiên bản thiết kế/content, chặn Client xem thảo luận nội bộ và workflow duyệt duyệt tự động.',
    fileSize: '1.1 MB',
    fileType: 'PDF',
    downloadUrl: '/public/SOP_Deliverable_Approval_Workflow.pdf',
    updatedAt: '2026-07-15'
  },
  {
    id: 'res-8',
    title: 'PGS Agency — Official Company Profile & Portfolio 2026',
    category: 'pitch',
    description: 'Hồ sơ năng lực PGS Agency trình bày các Case Study nổi bật, đội ngũ chuyên gia và giải thưởng.',
    fileSize: '32.1 MB',
    fileType: 'PDF / SLIDE',
    downloadUrl: '/public/PGS_Company_Profile_2026.pdf',
    updatedAt: '2026-07-05'
  },
  {
    id: 'res-9',
    title: 'Bộ Video & Document Đào tạo Workflow Vận hành PGS Hub',
    category: 'training',
    description: 'Hướng dẫn sử dụng Kanban Task, tạo Milestone trọng số, tính toán tiến độ dự án và quản lý phiếu lương.',
    fileSize: 'Video Link',
    fileType: 'VIDEO LINK',
    downloadUrl: 'https://youtube.com',
    updatedAt: '2026-07-20'
  }
];

export default function ResourcesPage() {
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [activeTab, setActiveTab] = useState<'all' | 'brand' | 'contracts' | 'sop' | 'pitch' | 'training'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'brand' | 'contracts' | 'sop' | 'pitch' | 'training'>('brand');
  const [newFormat, setNewFormat] = useState('GOOGLE DOCS');
  const [newUrl, setNewUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleAddResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    const item: ResourceItem = {
      id: `res-${Math.random().toString(36).substring(7)}`,
      title: newTitle,
      category: newCategory,
      description: newDescription || 'Tài nguyên nội bộ được cập nhật trực tiếp.',
      fileSize: newFormat.includes('LINK') || newFormat.includes('DOCS') || newFormat.includes('SHEET') ? 'Online Link' : '2.5 MB',
      fileType: newFormat,
      downloadUrl: newUrl,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setResources([item, ...resources]);
    setShowAddModal(false);
    setNewTitle('');
    setNewUrl('');
    setNewDescription('');
  };

  const filteredResources = resources.filter(res => {
    const matchesCategory = activeTab === 'all' || res.category === activeTab;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-primary-dark font-bold uppercase tracking-wider mb-1">
            <BookOpen className="h-4 w-4" />
            <span>Trung tâm Tài nguyên PGS Agency</span>
          </div>
          <h1 className="text-2xl font-bold font-space text-foreground">Kho Tài nguyên, Bài viết & Tài liệu mẫu</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Bộ tài liệu quy chuẩn, nhận diện thương hiệu, hợp đồng mẫu, bài viết Google Docs/Sheet, video đào tạo và quy trình SOP.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-black font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Thêm Tài nguyên / Link Tài liệu mới</span>
          </button>
        </div>
      </div>

      {/* Quick Search & Category Tabs */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm tài nguyên, bài viết, Google Sheet, Video Link..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary shadow-xs"
          />
        </div>

        <div className="flex flex-wrap bg-background-cream/60 border border-border p-1 rounded-2xl text-xs font-semibold max-w-fit">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'all' ? 'bg-background shadow-xs text-foreground font-bold' : 'text-muted-foreground'}`}
          >
            Tất cả Tài nguyên ({resources.length})
          </button>
          <button
            onClick={() => setActiveTab('brand')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'brand' ? 'bg-background shadow-xs text-foreground font-bold' : 'text-muted-foreground'}`}
          >
            <Sparkles className="h-3.5 w-3.5 text-primary-dark" />
            <span>Brand Kit & UI</span>
          </button>
          <button
            onClick={() => setActiveTab('contracts')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'contracts' ? 'bg-background shadow-xs text-foreground font-bold' : 'text-muted-foreground'}`}
          >
            <FileText className="h-3.5 w-3.5 text-info" />
            <span>Hợp đồng & Proposal</span>
          </button>
          <button
            onClick={() => setActiveTab('sop')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'sop' ? 'bg-background shadow-xs text-foreground font-bold' : 'text-muted-foreground'}`}
          >
            <Layers className="h-3.5 w-3.5 text-warning" />
            <span>Quy trình SOP</span>
          </button>
          <button
            onClick={() => setActiveTab('pitch')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'pitch' ? 'bg-background shadow-xs text-foreground font-bold' : 'text-muted-foreground'}`}
          >
            <BookOpen className="h-3.5 w-3.5 text-success" />
            <span>Company Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('training')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'training' ? 'bg-background shadow-xs text-foreground font-bold' : 'text-muted-foreground'}`}
          >
            <Video className="h-3.5 w-3.5 text-error" />
            <span>Đào tạo & Video</span>
          </button>
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-background border border-border rounded-2xl p-6 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider bg-background-cream border border-border text-foreground flex items-center gap-1">
                  {res.fileType.includes('VIDEO') && <Film className="h-3 w-3 text-error" />}
                  {res.fileType.includes('SHEET') && <FileSpreadsheet className="h-3 w-3 text-success" />}
                  {res.fileType.includes('DOCS') && <FileText className="h-3 w-3 text-info" />}
                  <span>{res.fileType}</span>
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">{res.fileSize}</span>
              </div>

              <h3 className="text-sm font-bold font-space text-foreground hover:text-primary-dark transition-colors leading-snug">
                {res.title}
              </h3>

              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                {res.description}
              </p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-[10px] text-muted-foreground">Cập nhật: {res.updatedAt}</span>
              <a
                href={res.downloadUrl}
                target="_blank"
                rel="noreferrer"
                download={res.downloadUrl.startsWith('/public') ? true : undefined}
                className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-black font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs"
              >
                {res.downloadUrl.startsWith('http') ? <LinkIcon className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
                <span>{res.downloadUrl.startsWith('http') ? 'Truy cập Link' : 'Tải về'}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ADD RESOURCE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setShowAddModal(false)} />
          
          <div className="relative bg-background border border-border rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-xl z-10 font-sans">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary-dark" />
                <h3 className="text-base font-bold font-space text-foreground">Thêm Tài nguyên / Link Tài liệu mới</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg border border-border hover:bg-background-cream">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddResourceSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Tiêu đề tài nguyên / Bài viết *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quy trình Setup Facebook Ads Campaign 2026 hoặc File Báo cáo Google Sheet..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs bg-background border border-border rounded-xl p-2.5 outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Chuyên mục</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as 'brand' | 'contracts' | 'sop' | 'pitch' | 'training')}
                    className="w-full text-xs bg-background border border-border rounded-xl p-2.5 outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="brand">Brand Kit & UI</option>
                    <option value="contracts">Hợp đồng & Proposal</option>
                    <option value="sop">Quy trình SOP</option>
                    <option value="pitch">Company Profile</option>
                    <option value="training">Đào tạo & Video</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Định dạng tài liệu</label>
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-xl p-2.5 outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="GOOGLE DOCS">Google Docs</option>
                    <option value="GOOGLE SHEET">Google Sheet</option>
                    <option value="VIDEO LINK">Video Youtube / Drive</option>
                    <option value="DOCX / PDF">PDF / DOCX</option>
                    <option value="SLIDE">PPTX / Slide</option>
                    <option value="ZIP">ZIP / Vector Assets</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Đường dẫn Link URL / File Path *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. https://docs.google.com/document/d/... hoặc https://youtube.com/..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full text-xs bg-background border border-border rounded-xl p-2.5 outline-none focus:border-primary font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-foreground uppercase tracking-wider">Mô tả ngắn gọn</label>
                <textarea
                  rows={3}
                  placeholder="Mô tả tóm tắt nội dung tài liệu hoặc bài viết này..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full text-xs bg-background border border-border rounded-xl p-2.5 outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary-dark text-black font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                <span>Lưu & Xuất bản Tài nguyên</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
