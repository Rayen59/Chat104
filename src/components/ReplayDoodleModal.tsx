import React, { useState, useRef, useEffect } from "react";
import { X, Play, Pause, RotateCcw, Download, Sparkles, FastForward } from "lucide-react";
import { Message } from "../types";

interface ReplayDoodleModalProps {
  message: Message;
  onClose: () => void;
  onSaveToGallery?: (url: string, caption?: string) => void;
}

export const ReplayDoodleModal: React.FC<ReplayDoodleModalProps> = ({
  message,
  onClose,
  onSaveToGallery
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1); // 0.5, 1, 2, 4
  const [progress, setProgress] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const drawingData = message.drawingData;
  const strokes = drawingData?.strokes || [];
  const width = drawingData?.width || 800;
  const height = drawingData?.height || 900;
  const bgType = drawingData?.bgType || "black";
  const bgImageUrl = drawingData?.bgImageUrl;

  // Flatten strokes into points for time-based animation
  const totalPoints = strokes.reduce((acc, s) => acc + s.points.length, 0);

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    if (bgType === "black") {
      ctx.fillStyle = "#02040a";
      ctx.fillRect(0, 0, width, height);
    } else if (bgType === "navy") {
      ctx.fillStyle = "#0a0f24";
      ctx.fillRect(0, 0, width, height);
    } else if (bgType === "transparent") {
      ctx.clearRect(0, 0, width, height);
    } else if (bgType === "image" && bgImageUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = bgImageUrl;
      if (img.complete) {
        ctx.drawImage(img, 0, 0, width, height);
      }
    }
  };

  const drawStrokePart = (
    ctx: CanvasRenderingContext2D,
    stroke: any,
    pointCount: number
  ) => {
    if (pointCount < 1) return;
    const pts = stroke.points.slice(0, pointCount);

    if (pts.length === 1) {
      const pt = pts[0];
      ctx.save();
      if (stroke.brush === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, stroke.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (stroke.brush === "neon") {
        ctx.shadowColor = stroke.color;
        ctx.shadowBlur = stroke.size * 2.8;
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
      return;
    }

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (stroke.brush === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = stroke.size * 2;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.stroke();
    } else if (stroke.brush === "highlighter") {
      ctx.globalAlpha = 0.45;
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size * 2.2;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.stroke();
    } else if (stroke.brush === "neon") {
      // Pass 1: Outer radiant glow
      ctx.shadowColor = stroke.color;
      ctx.shadowBlur = stroke.size * 2.8;
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size * 1.6;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.stroke();

      // Pass 2: Medium vibrant glow
      ctx.shadowBlur = stroke.size * 1.4;
      ctx.lineWidth = stroke.size * 1.0;
      ctx.globalAlpha = 0.95;
      ctx.stroke();

      // Pass 3: Ultra-bright white core
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#FFFFFF";
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = Math.max(2.5, stroke.size * 0.35);
      ctx.globalAlpha = 1.0;
      ctx.stroke();
    } else {
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.stroke();
    }
    ctx.restore();
  };

  const renderAtProgress = (currentPointsDrawn: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    drawBackground(ctx);

    let pointsRemaining = currentPointsDrawn;
    for (const stroke of strokes) {
      if (pointsRemaining <= 0) break;
      const countToDraw = Math.min(stroke.points.length, pointsRemaining);
      drawStrokePart(ctx, stroke, countToDraw);
      pointsRemaining -= stroke.points.length;
    }
  };

  useEffect(() => {
    if (!strokes.length || totalPoints === 0) return;

    let currentPt = 0;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (isPlaying) {
        // Increment points based on delta and speed (e.g., 60 points/sec at 1x)
        const step = Math.max(1, Math.round((delta / 16) * 2 * speed));
        currentPt = Math.min(totalPoints, currentPt + step);
        setProgress(Math.round((currentPt / totalPoints) * 100));
        renderAtProgress(currentPt);

        if (currentPt >= totalPoints) {
          setIsPlaying(false);
          return;
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, speed, totalPoints]);

  const handleRestart = () => {
    setProgress(0);
    setIsPlaying(true);
    renderAtProgress(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#070b19] border border-orange-500/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(251,146,60,0.35)] flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-orange-500/20 bg-gradient-to-r from-orange-950/40 via-black to-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                <span>Stroke Replay</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30">
                  {message.senderName || "Drawing"}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Watch the artwork created stroke-by-stroke</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas Display */}
        <div className="flex-1 min-h-[350px] max-h-[60vh] bg-black relative flex items-center justify-center p-2 overflow-hidden">
          {strokes.length > 0 ? (
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />
          ) : (
            <img
              src={message.mediaUrl}
              alt="Doodle"
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-500"
            />
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls Footer */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-[#040711] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-extrabold shadow-lg transition-transform active:scale-95 cursor-pointer"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={handleRestart}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
              title="Restart from beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Speed Selector */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
              {[0.5, 1, 2, 4].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                    speed === s ? "bg-orange-500 text-black" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {message.mediaUrl && onSaveToGallery && (
              <button
                type="button"
                onClick={() => onSaveToGallery(message.mediaUrl!, message.text || "Luminous Doodle")}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-orange-400" />
                <span>Save to Gallery</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 text-xs font-bold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
