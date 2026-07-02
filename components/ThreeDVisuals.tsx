'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Globe, 
  Search, 
  Zap, 
  PenTool, 
  MessageSquare, 
  Award, 
  BarChart3, 
  Cpu, 
  Lock, 
  CheckCircle2, 
  FileText, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { OrbitNode } from '@/types';

// Helper to render icon by name dynamically
export const IconRenderer = ({ name, className = "w-6 h-6", color = "currentColor" }: { name: string, className?: string, color?: string }) => {
  switch (name) {
    case 'Globe': return <Globe className={className} style={{ color }} />;
    case 'Search': return <Search className={className} style={{ color }} />;
    case 'Zap': return <Zap className={className} style={{ color }} />;
    case 'PenTool': return <PenTool className={className} style={{ color }} />;
    case 'MessageSquare': return <MessageSquare className={className} style={{ color }} />;
    case 'Award': return <Award className={className} style={{ color }} />;
    case 'BarChart3': return <BarChart3 className={className} style={{ color }} />;
    case 'Cpu': return <Cpu className={className} style={{ color }} />;
    case 'Lock': return <Lock className={className} style={{ color }} />;
    case 'CheckCircle2': return <CheckCircle2 className={className} style={{ color }} />;
    case 'FileText': return <FileText className={className} style={{ color }} />;
    case 'Activity': return <Activity className={className} style={{ color }} />;
    case 'Layers': return <Layers className={className} style={{ color }} />;
    case 'Sparkles': return <Sparkles className={className} style={{ color }} />;
    default: return <Sparkles className={className} style={{ color }} />;
  }
};

// Tilt Component for 3D Cards
export const Card3DTilt: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`transition-all duration-200 ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

// 1. Hero 3D Interactive Visualization
export const Hero3DVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nodes = [
    { label: "Website CRO", icon: "Globe", x: -140, y: -100, color: "var(--color-gold-500)", delay: 0 },
    { label: "SEO EEAT", icon: "Search", x: 140, y: -110, color: "var(--color-gold-400)", delay: 0.1 },
    { label: "Performance Ads", icon: "Zap", x: -180, y: 50, color: "var(--color-gold-500)", delay: 0.2 },
    { label: "High-end Content", icon: "PenTool", x: 180, y: 40, color: "var(--color-gold-600)", delay: 0.3 },
    { label: "Social Omnichannel", icon: "MessageSquare", x: -90, y: 150, color: "var(--color-gold-400)", delay: 0.4 },
    { label: "GA4 Tracking", icon: "BarChart3", x: 90, y: 160, color: "var(--color-gold-500)", delay: 0.5 },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[380px] md:h-[480px] flex items-center justify-center overflow-visible select-none"
    >
      {/* Background Decorative Metallic Waves & Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2d3b2_1px,transparent_1px)] [background-size:24px_24px] opacity-40 rounded-3xl" />
      
      {/* Golden Orbit Path Ring */}
      <div className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] border border-dashed border-gold-200/50 rounded-full animate-[spin_120s_linear_infinite]" />
      <div className="absolute w-[200px] h-[200px] md:w-[260px] md:h-[260px] border border-gold-100/30 rounded-full animate-[spin_80s_linear_infinite_reverse]" />

      {/* Pulsing Light Glow from behind PGS Core logo */}
      <div className="absolute w-48 h-48 bg-gold-200/20 blur-3xl rounded-full" />

      {/* SVG Connecting Lines - Dynamic Drawing */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <g style={{ transform: "translate(50%, 50%)" }}>
          {nodes.map((node, idx) => {
            const nodeX = node.x * (1 + mousePos.x * 0.1);
            const nodeY = node.y * (1 + mousePos.y * 0.1);
            return (
              <g key={idx}>
                {/* Gold Connection Wire */}
                <motion.line
                  x1={0}
                  y1={0}
                  x2={nodeX}
                  y2={nodeY}
                  stroke="url(#goldGradientLine)"
                  strokeWidth={hoveredNode === node.label ? "2" : "1"}
                  strokeDasharray="4,4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: node.delay }}
                  className="opacity-70"
                />
                {/* Flowing energy particles */}
                <motion.circle
                  r="3"
                  fill="var(--color-gold-500)"
                  animate={{
                    cx: [0, nodeX],
                    cy: [0, nodeY],
                    opacity: [1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: node.delay * 2,
                    ease: "easeInOut"
                  }}
                />
              </g>
            );
          })}
        </g>
        
        {/* Defs for Premium Gradients */}
        <defs>
          <linearGradient id="goldGradientLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-gold-200)" />
            <stop offset="50%" stopColor="var(--color-gold-400)" />
            <stop offset="100%" stopColor="var(--color-gold-600)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Core Center Node: PGS Agency logo element */}
      <motion.div
        style={{
          x: useSpring(mousePos.x * 30, { stiffness: 100, damping: 10 }),
          y: useSpring(mousePos.y * 30, { stiffness: 100, damping: 10 }),
          transformStyle: "preserve-3d"
        }}
        className="absolute z-10 w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white border border-gold-300 shadow-[0_15px_35px_rgba(194,139,36,0.15)] flex flex-col items-center justify-center cursor-pointer group"
      >
        <div className="absolute inset-0.5 rounded-xl border border-dashed border-gold-200/50 group-hover:border-gold-400/80 transition-colors" />
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative flex flex-col items-center"
        >
          <span className="font-display text-2xl md:text-3xl font-bold tracking-wider text-charcoal-900 group-hover:text-gold-500 transition-colors">
            PGS
          </span>
          <span className="text-[9px] font-mono tracking-widest text-gold-600 font-bold uppercase mt-1">
            AGENCY
          </span>
        </motion.div>
        
        {/* Floating miniature metadata tag */}
        <div className="absolute -bottom-3 px-2 py-0.5 bg-charcoal-900 text-white text-[8px] font-mono rounded border border-gold-500/30 scale-90 md:scale-100 shadow">
          GROWTH ENGINE
        </div>
      </motion.div>

      {/* Orbiting Satellite Cards */}
      {nodes.map((node, idx) => {
        const offsetMultiplierX = 1.05 + mousePos.x * 0.12;
        const offsetMultiplierY = 1.05 + mousePos.y * 0.12;
        
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: node.delay }}
            style={{
              x: node.x * offsetMultiplierX,
              y: node.y * offsetMultiplierY,
            }}
            className="absolute z-20"
            onMouseEnter={() => setHoveredNode(node.label)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <motion.div
              whileHover={{ 
                scale: 1.1, 
                y: node.y * offsetMultiplierY - 5,
                boxShadow: "0 20px 25px -5px rgba(194,139,36,0.15)"
              }}
              className="px-3 py-2 md:px-4 md:py-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-gold-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex items-center gap-2 cursor-pointer transition-colors hover:border-gold-400"
            >
              <div 
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${node.color}15` }}
              >
                <IconRenderer name={node.icon} className="w-4 h-4" color={node.color} />
              </div>
              <div className="text-left">
                <p className="text-[10px] md:text-xs font-semibold text-charcoal-900 tracking-tight leading-none">
                  {node.label}
                </p>
                <span className="text-[8px] md:text-[9px] font-mono text-gold-600 font-medium tracking-wider">
                  ACTIVE SYNC
                </span>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

// 2. Interactive Service Orbit 3D Component
interface ServiceOrbitProps {
  nodes: OrbitNode[];
  activeNode: OrbitNode;
  setActiveNode: (node: OrbitNode) => void;
}

export const ServiceOrbit3D: React.FC<ServiceOrbitProps> = ({ nodes, activeNode, setActiveNode }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
      {/* Circle Orbit Controls */}
      <div className="lg:col-span-6 flex flex-col items-center justify-center min-h-[340px] md:min-h-[400px] relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e2d3b2_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
        
        {/* Core Central Orbital Path Circle */}
        <div className="w-[260px] h-[260px] md:w-[300px] md:h-[300px] border border-dashed border-gold-300/40 rounded-full flex items-center justify-center relative">
          
          {/* Inner Active Center Display */}
          <motion.div 
            key={activeNode.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[140px] h-[140px] md:w-[170px] md:h-[170px] bg-white rounded-full border border-gold-200 shadow-lg flex flex-col items-center justify-center p-3 text-center z-10"
          >
            <div className="w-10 h-10 rounded-full bg-gold-50 border border-gold-100 flex items-center justify-center mb-1">
              <IconRenderer name={activeNode.icon} className="w-5 h-5 text-gold-500" />
            </div>
            <p className="text-[11px] font-mono uppercase text-gold-600 font-semibold tracking-wider">
              PGS CAPABILITY
            </p>
            <h4 className="text-xs md:text-sm font-bold text-charcoal-900 tracking-tight leading-snug">
              {activeNode.label}
            </h4>
          </motion.div>

          {/* Node Orbit Buttons */}
          {nodes.map((node, index) => {
            const rad = (node.angle * Math.PI) / 180;
            const radius = 135; // px distance from center (approx)
            // calculating percentage-based layouts
            const leftOffset = 50 + 50 * Math.cos(rad) * 0.9;
            const topOffset = 50 + 50 * Math.sin(rad) * 0.9;

            const isActive = activeNode.id === node.id;
            const isHovered = hoveredId === node.id;

            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(node)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  left: `${leftOffset}%`,
                  top: `${topOffset}%`,
                }}
                className={`absolute w-10 h-10 md:w-12 md:h-12 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer z-20 ${
                  isActive 
                    ? 'bg-gold-500 border-2 border-white text-white shadow-[0_0_15px_rgba(194,139,36,0.5)] scale-110' 
                    : 'bg-white border border-gold-200/80 text-charcoal-700 hover:border-gold-400 hover:shadow-md'
                }`}
              >
                <IconRenderer name={node.icon} className={`w-4 h-4 md:w-5 md:h-5 ${isActive ? 'text-white' : 'text-charcoal-600'}`} />
                
                {/* Micro tooltip */}
                <div className={`absolute -bottom-8 bg-charcoal-900 text-white text-[9px] px-2 py-0.5 rounded whitespace-nowrap transition-all pointer-events-none ${
                  isActive || isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  {node.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Showcase Panel with scroll-based animations */}
      <div className="lg:col-span-6">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl border border-gold-200 p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] relative overflow-hidden"
        >
          {/* Subtle Corner Graphic */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-50 rounded-bl-full -z-0 opacity-40" />

          <div className="relative z-10">
            <span className="text-[10px] font-mono text-gold-600 font-bold uppercase tracking-widest bg-gold-50 border border-gold-100 px-2.5 py-1 rounded">
              Hệ sinh thái PGS
            </span>
            
            <h3 className="text-xl md:text-2xl font-display font-semibold text-charcoal-900 mt-4 flex items-center gap-2">
              <IconRenderer name={activeNode.icon} className="w-6 h-6 text-gold-500" />
              {activeNode.label}
            </h3>
            
            <p className="text-sm text-charcoal-600 mt-3 leading-relaxed">
              {activeNode.description}
            </p>

            <div className="mt-6 border-t border-gold-100 pt-5">
              <h5 className="text-xs font-mono font-bold text-gold-700 uppercase tracking-wider mb-3">
                Hoạt động cốt lõi tối ưu tăng trưởng:
              </h5>
              
              <ul className="space-y-3">
                {activeNode.details.map((detail, dIdx) => (
                  <motion.li 
                    key={dIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: dIdx * 0.1 }}
                    className="flex items-start gap-2 text-xs md:text-sm text-charcoal-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {/* Call Action inside Service Panel */}
            <div className="mt-8 flex items-center gap-4">
              <div className="text-[11px] font-mono text-charcoal-400">
                MODULE STATUS: <span className="text-green-600 font-bold">READY TO DEPLOY</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// 3. Process Pipeline Component
interface ProcessPipelineProps {
  steps: import('../types').ProcessStep[];
}

export const ProcessPipeline: React.FC<ProcessPipelineProps> = ({ steps }) => {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  return (
    <div className="space-y-8">
      {/* Desktop Step Stepper Header */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {steps.map((step, idx) => {
          const isActive = idx === activeStepIdx;
          return (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStepIdx(idx)}
              className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                isActive 
                  ? 'bg-white border-gold-500 shadow-md ring-1 ring-gold-500/10' 
                  : 'bg-charcoal-50/50 border-charcoal-200 hover:border-gold-300 hover:bg-white'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`text-xs font-mono font-bold ${isActive ? 'text-gold-500' : 'text-charcoal-400'}`}>
                  STEP {step.stepNumber}
                </span>
                {idx < activeStepIdx && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
                )}
              </div>
              <h4 className="text-xs font-display font-semibold text-charcoal-900 line-clamp-1">
                {step.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Detailed view of the selected step */}
      <motion.div
        key={activeStepIdx}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gold-200 p-6 md:p-8 shadow-[0_10px_25px_rgba(0,0,0,0.02)] grid grid-cols-1 lg:grid-cols-12 gap-8 relative overflow-hidden"
      >
        <div className="absolute top-4 right-4 text-7xl md:text-9xl font-display font-bold text-gold-100/40 select-none pointer-events-none">
          {steps[activeStepIdx].stepNumber}
        </div>

        <div className="lg:col-span-7 space-y-4 relative z-10">
          <div>
            <span className="text-xs font-mono text-gold-600 font-bold uppercase tracking-wider bg-gold-50 border border-gold-100 px-2.5 py-1 rounded">
              {steps[activeStepIdx].subtitle}
            </span>
            <h3 className="text-xl md:text-2xl font-display font-bold text-charcoal-900 mt-3">
              Bước {steps[activeStepIdx].stepNumber}: {steps[activeStepIdx].title}
            </h3>
          </div>
          
          <p className="text-sm md:text-base text-charcoal-600 leading-relaxed">
            {steps[activeStepIdx].description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-3 bg-gold-50/60 rounded-xl border border-gold-100">
              <span className="text-[10px] font-mono text-gold-700 font-bold uppercase block mb-1">
                Kết quả bàn giao (Deliverable)
              </span>
              <p className="text-xs font-medium text-charcoal-800">
                {steps[activeStepIdx].deliverable}
              </p>
            </div>
            <div className="p-3 bg-charcoal-50 rounded-xl border border-charcoal-200">
              <span className="text-[10px] font-mono text-charcoal-500 font-bold uppercase block mb-1">
                Thời lượng trung bình
              </span>
              <p className="text-xs font-semibold text-charcoal-800">
                {steps[activeStepIdx].duration}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-gold-100 pt-6 lg:pt-0 lg:pl-8 space-y-4">
          <h4 className="text-xs font-mono font-bold text-gold-600 uppercase tracking-wider">
            Checklist hoạt động chi tiết:
          </h4>
          <ul className="space-y-3">
            {steps[activeStepIdx].checklist.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-charcoal-700">
                <div className="w-5 h-5 rounded-full bg-gold-50 border border-gold-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-mono font-bold text-gold-600">{idx + 1}</span>
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};
