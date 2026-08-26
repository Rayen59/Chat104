import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  X,
  Undo2,
  Redo2,
  Trash2,
  Send,
  Download,
  Sparkles,
  PenTool,
  ArrowUpRight,
  Highlighter,
  Eraser,
  Image as ImageIcon,
  RotateCcw,
  Palette,
  Play,
  Check,
  Flame,
  Layers,
  Star
} from "lucide-react";
import { User } from "../types";

export interface DoodleStroke {
  points: { x: number; y: number }[];
  color: string;
  size: number;
  brush: "neon" | "classic" | "arrow" | "sparkle" | "highlighter" | "eraser";
}

interface GlowDoodleModalProps {
  currentUser: User;
  initialBackgroundImage?: string;
  onClose: () => void;
  onSendDoodle: (payload: {
    mediaUrl: string;
    caption?: string;
    drawingData?: {
      strokes: DoodleStroke[];
      width: number;
      height: number;
      bgType: "transparent" | "black" | "navy" | "image";
      bgImageUrl?: string;
    };
  }) => void;
}

const NEON_COLORS = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Neon Orange", hex: "#FB923C" }, // As in user's screenshot!
  { name: "Sunset Gold", hex: "#F59E0B" },
  { name: "Electric Cyan", hex: "#00F2FE" },
  { name: "Cyber Blue", hex: "#38BDF8" },
  { name: "Emerald Green", hex: "#22C55E" },
  { name: "Lime Neon", hex: "#A3E635" },
  { name: "Hot Pink", hex: "#EC4899" },
  { name: "Electric Purple", hex: "#A855F7" },
  { name: "Crimson Red", hex: "#EF4444" },
  { name: "Lemon Yellow", hex: "#FACC15" },
];

export const GlowDoodleModal: React.FC<GlowDoodleModalProps> = ({
  currentUser,
  initialBackgroundImage,
  onClose,
  onSendDoodle,
}) => {
  // Brush types: neon (glow), classic (pen), arrow, sparkle, highlighter, eraser
  const [activeBrush, setActiveBrush] = useState<
    "neon" | "classic" | "arrow" | "sparkle" | "highlighter" | "eraser"
  >("neon");

  // Selected Color
  const [selectedColor, setSelectedColor] = useState<string>("#FB923C"); // default bright neon orange as in screenshot
  const [customColor, setCustomColor] = useState<string>("#FB923C");

  // Brush Size
  const [brushSize, setBrushSize] = useState<number>(14);

  // Background style: "black", "navy", "transparent", or "image"
  const [bgType, setBgType] = useState<"black" | "navy" | "transparent" | "image">(
    initialBackgroundImage ? "image" : "black"
  );
  const [bgImageUrl, setBgImageUrl] = useState<string | undefined>(initialBackgroundImage);

  // History for Undo / Redo
  const [strokes, setStrokes] = useState<DoodleStroke[]>([]);
  const [redoStack, setRedoStack] = useState<DoodleStroke[]>([]);

  // Drawing state refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const currentStrokeRef = useRef<DoodleStroke | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Replay state
  const [isReplaying, setIsReplaying] = useState<boolean>(false);
  const replayAnimRef = useRef<number | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  // Helper to draw an arrow head
  const drawArrowHead = (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    color: string,
    size: number
  ) => {
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const headLength = Math.max(16, size * 2.5);

    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = size * 0.8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Draw left and right wing
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - headLength * Math.cos(angle - Math.PI / 6),
      toY - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - headLength * Math.cos(angle + Math.PI / 6),
      toY - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
    ctx.restore();
  };

  // Helper to draw a sparkling 4-point star
  const drawSparkle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    radius: number
  ) => {
    ctx.save();
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = color;
    ctx.shadowBlur = radius * 2;

    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      ctx.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
      ctx.lineTo(
        x + Math.cos(angle + Math.PI / 4) * (radius * 0.25),
        y + Math.sin(angle + Math.PI / 4) * (radius * 0.25)
      );
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  // Render a single stroke onto canvas context
  const renderStroke = useCallback(
    (ctx: CanvasRenderingContext2D, stroke: DoodleStroke) => {
      if (stroke.points.length < 2) {
        if (stroke.points.length === 1) {
          const pt = stroke.points[0];
          ctx.save();
          if (stroke.brush === "eraser") {
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, stroke.size / 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (stroke.brush === "neon") {
            // Neon dot
            ctx.shadowColor = stroke.color;
            ctx.shadowBlur = stroke.size * 2;
            ctx.fillStyle = stroke.color;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, stroke.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 4;
            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, stroke.size * 0.4, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = stroke.color;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, stroke.size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
        return;
      }

      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (stroke.brush === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = stroke.size * 2;
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
      } else if (stroke.brush === "highlighter") {
        ctx.globalAlpha = 0.45;
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size * 2.2;
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
      } else if (stroke.brush === "neon") {
        // ✨ MULTI-LAYER LUMINESCENT NEON GLOW EFFECT (Instagram style)

        // Pass 1: Wide Radiant Outer Glow (translucent soft halo)
        ctx.shadowColor = stroke.color;
        ctx.shadowBlur = stroke.size * 2.8;
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size * 1.6;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();

        // Pass 2: Medium Vibrant Glow
        ctx.shadowBlur = stroke.size * 1.4;
        ctx.lineWidth = stroke.size * 1.0;
        ctx.globalAlpha = 0.95;
        ctx.stroke();

        // Pass 3: Ultra-Bright White/Tinted Core Filament
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#FFFFFF";
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = Math.max(2.5, stroke.size * 0.35);
        ctx.globalAlpha = 1.0;
        ctx.stroke();
      } else if (stroke.brush === "sparkle") {
        // Sparkle line + star bursts
        ctx.shadowColor = stroke.color;
        ctx.shadowBlur = stroke.size * 1.5;
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = Math.max(3, stroke.size * 0.6);
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();

        // Draw glittering stars at intervals
        for (let i = 0; i < stroke.points.length; i += 6) {
          const pt = stroke.points[i];
          drawSparkle(ctx, pt.x, pt.y, stroke.color, stroke.size * 0.85);
        }
      } else if (stroke.brush === "arrow") {
        // Line
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size * 0.8;
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();

        // Arrow head on end
        if (stroke.points.length >= 2) {
          const last = stroke.points[stroke.points.length - 1];
          const prev = stroke.points[Math.max(0, stroke.points.length - 4)];
          drawArrowHead(ctx, prev.x, prev.y, last.x, last.y, stroke.color, stroke.size);
        }
      } else {
        // Classic pen
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size * 0.8;
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
      }

      ctx.restore();
    },
    []
  );

  // Redraw the entire canvas
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    if (bgType === "black") {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (bgType === "navy") {
      ctx.fillStyle = "#090d1e";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (bgType === "image" && bgImageUrl) {
      // Draw background image
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = bgImageUrl;
      if (img.complete) {
        // Draw centered and cover
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShiftX,
          centerShiftY,
          img.width * ratio,
          img.height * ratio
        );
        // Darken slightly for neon pop
        ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    // Render each stroke
    strokes.forEach((s) => renderStroke(ctx, s));

    // Render current active stroke in progress
    if (currentStrokeRef.current) {
      renderStroke(ctx, currentStrokeRef.current);
    }
  }, [strokes, bgType, bgImageUrl, renderStroke]);

  // Handle canvas resize on mount & window resize
  useEffect(() => {
    const updateCanvasSize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      const width = Math.min(800, Math.floor(rect.width));
      const height = Math.min(1000, Math.floor(rect.height));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        redrawCanvas();
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [redrawCanvas]);

  // Re-render whenever strokes or bg changes
  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Pointer / Mouse / Touch coordinates relative to canvas
  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (isReplaying) return;
    const { x, y } = getCanvasCoords(e);
    isDrawingRef.current = true;

    const newStroke: DoodleStroke = {
      points: [{ x, y }],
      color: selectedColor,
      size: brushSize,
      brush: activeBrush,
    };

    currentStrokeRef.current = newStroke;
    redrawCanvas();
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || !currentStrokeRef.current) return;
    const { x, y } = getCanvasCoords(e);

    const pts = currentStrokeRef.current.points;
    const lastPt = pts[pts.length - 1];

    // Throttle tiny moves
    const dist = Math.hypot(x - lastPt.x, y - lastPt.y);
    if (dist < 2) return;

    currentStrokeRef.current.points.push({ x, y });
    redrawCanvas();
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current || !currentStrokeRef.current) return;
    isDrawingRef.current = false;

    const completed = currentStrokeRef.current;
    currentStrokeRef.current = null;

    if (completed.points.length > 0) {
      setStrokes((prev) => [...prev, completed]);
      setRedoStack([]); // clear redo stack on new action
    }
  };

  // Undo
  const handleUndo = () => {
    if (strokes.length === 0) return;
    const popped = strokes[strokes.length - 1];
    setStrokes((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, popped]);
  };

  // Redo
  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setStrokes((prev) => [...prev, next]);
  };

  // Clear Canvas
  const handleClear = () => {
    if (strokes.length === 0) return;
    setStrokes([]);
    setRedoStack([]);
    showToast("Canvas cleared");
  };

  // Replay live drawing stroke animation
  const handleReplay = () => {
    if (strokes.length === 0 || isReplaying) return;
    setIsReplaying(true);
    showToast("Replaying drawing...");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let strokeIndex = 0;
    let pointIndex = 0;

    const allStrokes = [...strokes];

    // Clear and redraw background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (bgType === "black") {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (bgType === "navy") {
      ctx.fillStyle = "#090d1e";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const tempCompletedStrokes: DoodleStroke[] = [];
    let currentAnimStroke: DoodleStroke = {
      points: [],
      color: allStrokes[0].color,
      size: allStrokes[0].size,
      brush: allStrokes[0].brush,
    };

    const animateStep = () => {
      if (strokeIndex >= allStrokes.length) {
        setIsReplaying(false);
        redrawCanvas();
        return;
      }

      const targetStroke = allStrokes[strokeIndex];
      const pts = targetStroke.points;

      // Add points faster for longer strokes
      const stepCount = Math.max(2, Math.floor(pts.length / 25));
      for (let s = 0; s < stepCount && pointIndex < pts.length; s++) {
        currentAnimStroke.points.push(pts[pointIndex]);
        pointIndex++;
      }

      // Render all previous strokes + active progress
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (bgType === "black") {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (bgType === "navy") {
        ctx.fillStyle = "#090d1e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      tempCompletedStrokes.forEach((st) => renderStroke(ctx, st));
      renderStroke(ctx, currentAnimStroke);

      if (pointIndex >= pts.length) {
        tempCompletedStrokes.push({ ...currentAnimStroke });
        strokeIndex++;
        pointIndex = 0;
        if (strokeIndex < allStrokes.length) {
          currentAnimStroke = {
            points: [],
            color: allStrokes[strokeIndex].color,
            size: allStrokes[strokeIndex].size,
            brush: allStrokes[strokeIndex].brush,
          };
        }
      }

      replayAnimRef.current = requestAnimationFrame(animateStep);
    };

    replayAnimRef.current = requestAnimationFrame(animateStep);
  };

  // Upload custom background photo
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setBgImageUrl(url);
      setBgType("image");
      showToast("Photo loaded as background");
    };
    reader.readAsDataURL(file);
  };

  // Export & Send Luminous Doodle
  const handleSend = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert canvas to high-quality data URL (PNG)
    const mediaUrl = canvas.toDataURL("image/png", 0.95);

    onSendDoodle({
      mediaUrl,
      caption: strokes.length > 0 ? "✨ Luminous Doodle" : undefined,
      drawingData: {
        strokes,
        width: canvas.width,
        height: canvas.height,
        bgType,
        bgImageUrl,
      },
    });

    onClose();
  };

  // Download directly to device
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `luminous_drawing_${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
    showToast("Drawing downloaded! ✓");
  };

  return (
    <div
      id="glow_doodle_studio_modal"
      className="fixed inset-0 z-50 bg-[#000000]/95 backdrop-blur-2xl flex flex-col justify-between select-none touch-none animate-in fade-in duration-200"
    >
      {/* ========================================================= */}
      {/* 1. TOP BRUSHES BAR (Matching Screenshot 2 & 3)            */}
      {/* ========================================================= */}
      <div
        id="doodle_top_brush_bar"
        className="p-3 sm:p-4 px-4 sm:px-6 bg-gradient-to-b from-black via-black/80 to-transparent flex items-center justify-between z-30 shrink-0 gap-2"
      >
        {/* Left: Close & Undo/Redo */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            id="btn_close_doodle"
            type="button"
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
            title="Cancel and exit"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            id="btn_undo_doodle"
            type="button"
            onClick={handleUndo}
            disabled={strokes.length === 0}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white transition-all active:scale-95 cursor-pointer"
            title="Undo stroke (Ctrl+Z)"
          >
            <Undo2 className="w-5 h-5" />
          </button>

          <button
            id="btn_redo_doodle"
            type="button"
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white transition-all active:scale-95 cursor-pointer"
            title="Redo stroke"
          >
            <Redo2 className="w-5 h-5" />
          </button>
        </div>

        {/* Center: BRUSH SELECTOR CAPSULE (Instagram Brush Types) */}
        <div
          id="brush_selector_capsule"
          className="flex items-center gap-1 sm:gap-1.5 bg-[#17212b]/90 border border-white/15 rounded-full p-1 shadow-2xl backdrop-blur-xl"
        >
          {/* 1. Classic Pen */}
          <button
            id="brush_classic"
            type="button"
            onClick={() => setActiveBrush("classic")}
            className={`p-2 sm:px-3 rounded-full flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              activeBrush === "classic"
                ? "bg-white text-black shadow-md scale-105"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
            title="Classic Pen"
          >
            <PenTool className="w-4 h-4" />
            <span className="hidden md:inline">Pen</span>
          </button>

          {/* 2. Arrow Pen */}
          <button
            id="brush_arrow"
            type="button"
            onClick={() => setActiveBrush("arrow")}
            className={`p-2 sm:px-3 rounded-full flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              activeBrush === "arrow"
                ? "bg-white text-black shadow-md scale-105"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
            title="Arrow Pen (auto points)"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span className="hidden md:inline">Arrow</span>
          </button>

          {/* 3. NEON GLOW BRUSH (KEY HIGHLIGHT) */}
          <button
            id="brush_neon_glow"
            type="button"
            onClick={() => setActiveBrush("neon")}
            className={`p-2 sm:px-3.5 rounded-full flex items-center gap-1.5 text-xs font-extrabold transition-all cursor-pointer ${
              activeBrush === "neon"
                ? "bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-400 text-white shadow-[0_0_20px_rgba(251,146,60,0.8)] scale-110 ring-2 ring-white"
                : "text-orange-400 hover:text-orange-300 hover:bg-orange-500/20"
            }`}
            title="Luminescent Neon Glow Pen"
          >
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span className="inline font-mono tracking-wide">NEON</span>
          </button>

          {/* 4. Sparkle / Starlight */}
          <button
            id="brush_sparkle"
            type="button"
            onClick={() => setActiveBrush("sparkle")}
            className={`p-2 sm:px-3 rounded-full flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              activeBrush === "sparkle"
                ? "bg-white text-black shadow-md scale-105"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
            title="Sparkle & Starlight Brush"
          >
            <Star className="w-4 h-4 text-amber-300" />
            <span className="hidden md:inline">Stars</span>
          </button>

          {/* 5. Highlighter */}
          <button
            id="brush_highlighter"
            type="button"
            onClick={() => setActiveBrush("highlighter")}
            className={`p-2 sm:px-3 rounded-full flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              activeBrush === "highlighter"
                ? "bg-white text-black shadow-md scale-105"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
            title="Highlighter / Marker"
          >
            <Highlighter className="w-4 h-4" />
            <span className="hidden md:inline">Marker</span>
          </button>

          {/* 6. Eraser */}
          <button
            id="brush_eraser"
            type="button"
            onClick={() => setActiveBrush("eraser")}
            className={`p-2 sm:px-3 rounded-full flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              activeBrush === "eraser"
                ? "bg-rose-500 text-white shadow-md scale-105"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
            title="Eraser"
          >
            <Eraser className="w-4 h-4" />
            <span className="hidden md:inline">Eraser</span>
          </button>
        </div>

        {/* Right: Actions (Clear, Replay, Photo BG, Download) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Replay Drawing */}
          <button
            id="btn_replay_doodle"
            type="button"
            onClick={handleReplay}
            disabled={strokes.length === 0 || isReplaying}
            className="p-2 sm:px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer disabled:opacity-30"
            title="Replay drawing stroke animation"
          >
            <Play className="w-4 h-4 fill-current" />
            <span className="hidden sm:inline">Replay</span>
          </button>

          {/* Clear Canvas */}
          <button
            id="btn_clear_doodle"
            type="button"
            onClick={handleClear}
            disabled={strokes.length === 0}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-rose-500/30 text-rose-400 disabled:opacity-30 transition-all active:scale-95 cursor-pointer"
            title="Clear all strokes"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {/* Download */}
          <button
            id="btn_download_doodle"
            type="button"
            onClick={handleDownload}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
            title="Save PNG to device"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. CENTRAL DRAWING VIEWPORT & INTERACTIVE CANVAS          */}
      {/* ========================================================= */}
      <div
        id="doodle_canvas_container"
        ref={containerRef}
        className="flex-1 w-full h-full flex items-center justify-center relative overflow-hidden p-2 sm:p-4 touch-none"
      >
        {/* Dynamic Vertical Brush Size Slider (Matching Left Side in Screenshot 2 & 3) */}
        <div
          id="doodle_brush_size_slider"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full py-4 px-2 shadow-2xl"
        >
          {/* Live Brush Size Dot Indicator */}
          <div
            style={{
              width: `${Math.max(8, Math.min(36, brushSize * 1.5))}px`,
              height: `${Math.max(8, Math.min(36, brushSize * 1.5))}px`,
              backgroundColor: activeBrush === "eraser" ? "#ffffff" : selectedColor,
              boxShadow:
                activeBrush === "neon"
                  ? `0 0 16px ${selectedColor}`
                  : undefined,
            }}
            className="rounded-full transition-all duration-100 border border-white/40"
          />

          <span className="text-[10px] font-mono font-bold text-slate-300">
            {brushSize}px
          </span>

          {/* Vertical Range Slider */}
          <div className="h-36 sm:h-48 flex items-center justify-center py-2">
            <input
              type="range"
              min="4"
              max="45"
              step="1"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="h-32 sm:h-44 -rotate-90 w-32 sm:w-44 accent-orange-500 cursor-pointer"
              title="Drag to change brush size"
            />
          </div>
        </div>

        {/* Background Mode Floating Switcher (Right Side) */}
        <div
          id="doodle_bg_switcher"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl"
        >
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            BG
          </span>

          {/* Black BG */}
          <button
            type="button"
            onClick={() => setBgType("black")}
            className={`w-7 h-7 rounded-xl bg-black border transition-all cursor-pointer ${
              bgType === "black"
                ? "border-cyan-400 ring-2 ring-cyan-400/50 scale-110"
                : "border-white/30 hover:border-white"
            }`}
            title="Black Background"
          />

          {/* Deep Navy BG */}
          <button
            type="button"
            onClick={() => setBgType("navy")}
            className={`w-7 h-7 rounded-xl bg-[#090d1e] border transition-all cursor-pointer ${
              bgType === "navy"
                ? "border-cyan-400 ring-2 ring-cyan-400/50 scale-110"
                : "border-white/30 hover:border-white"
            }`}
            title="Midnight Navy Background"
          />

          {/* Transparent BG */}
          <button
            type="button"
            onClick={() => setBgType("transparent")}
            className={`w-7 h-7 rounded-xl bg-slate-800 border transition-all flex items-center justify-center cursor-pointer ${
              bgType === "transparent"
                ? "border-cyan-400 ring-2 ring-cyan-400/50 scale-110"
                : "border-white/30 hover:border-white"
            }`}
            title="Transparent Chat Canvas"
          >
            <Layers className="w-3.5 h-3.5 text-slate-300" />
          </button>

          {/* Photo BG (Draw on Photo as in Screenshot 1!) */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`w-7 h-7 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 border transition-all flex items-center justify-center cursor-pointer ${
              bgType === "image"
                ? "border-cyan-400 ring-2 ring-cyan-400/50 scale-110"
                : "border-white/30 hover:border-white"
            }`}
            title="Draw on photo / image (Upload)"
          >
            <ImageIcon className="w-3.5 h-3.5 text-white" />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>

        {/* The HTML5 Interactive Drawing Canvas */}
        <canvas
          id="glow_doodle_main_canvas"
          ref={canvasRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          onTouchCancel={handlePointerUp}
          className={`max-w-full max-h-[75vh] aspect-[9/14] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] cursor-crosshair touch-none ${
            bgType === "black"
              ? "bg-black"
              : bgType === "navy"
              ? "bg-[#090d1e]"
              : "bg-[#0a0f1f]/80"
          }`}
        />

        {/* Floating Toast alert */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-cyan-600/90 text-white font-bold text-xs shadow-xl backdrop-blur-md border border-cyan-300/40 animate-in fade-in duration-150">
            {toastMessage}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 3. BOTTOM COLOR PALETTE & SEND BAR (Matching Screenshots)  */}
      {/* ========================================================= */}
      <div
        id="doodle_bottom_action_bar"
        className="p-3 sm:p-5 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col sm:flex-row items-center justify-between gap-3 z-30 shrink-0"
      >
        {/* Color Palette Swatches (Swipeable / Scrollable horizontally) */}
        <div
          id="neon_color_swatches"
          className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto max-w-full px-2 py-1 scrollbar-none"
        >
          {NEON_COLORS.map((col) => {
            const isSelected = selectedColor.toUpperCase() === col.hex.toUpperCase();
            return (
              <button
                key={col.hex}
                type="button"
                onClick={() => setSelectedColor(col.hex)}
                style={{ backgroundColor: col.hex }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0 transition-all cursor-pointer relative shadow-lg ${
                  isSelected
                    ? "scale-125 ring-4 ring-white/90 shadow-[0_0_15px_rgba(255,255,255,0.9)] z-10"
                    : "hover:scale-110 opacity-85 hover:opacity-100"
                }`}
                title={col.name}
              >
                {isSelected && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Check
                      className={`w-3.5 h-3.5 stroke-[3] ${
                        col.hex === "#FFFFFF" || col.hex === "#FACC15"
                          ? "text-black"
                          : "text-white"
                      }`}
                    />
                  </span>
                )}
              </button>
            );
          })}

          {/* Custom Color Picker Swatch */}
          <label
            htmlFor="custom_color_picker_input"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0 bg-gradient-to-tr from-pink-500 via-amber-400 to-cyan-400 p-[2px] cursor-pointer hover:scale-110 transition-transform shadow-md flex items-center justify-center"
            title="Custom Neon Color Picker"
          >
            <div className="w-full h-full rounded-full bg-black/40 flex items-center justify-center">
              <Palette className="w-3.5 h-3.5 text-white" />
            </div>
            <input
              id="custom_color_picker_input"
              type="color"
              value={customColor}
              onChange={(e) => {
                setCustomColor(e.target.value);
                setSelectedColor(e.target.value);
              }}
              className="opacity-0 absolute w-0 h-0 pointer-events-none"
            />
          </label>
        </div>

        {/* Right: SEND BUTTON (Instagram style gradient send button) */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            id="btn_send_glow_doodle"
            type="button"
            onClick={handleSend}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 hover:from-orange-400 hover:to-purple-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(236,72,153,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer ring-2 ring-white/30"
          >
            <Send className="w-4 h-4" />
            <span>Send Glow Doodle</span>
          </button>
        </div>
      </div>
    </div>
  );
};
