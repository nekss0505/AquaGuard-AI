import React from "react";
import { RiskLevel } from "../types";

interface RiskGaugeProps {
  score: number; // 0 - 100
  level: RiskLevel;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  level,
  size = "md",
  showLabel = true,
}) => {
  const normalizedScore = Math.min(100, Math.max(0, score));

  const getColor = (lvl: RiskLevel) => {
    switch (lvl) {
      case "LOW":
        return { stroke: "#10b981", bg: "rgba(16, 185, 129, 0.15)", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-800 border-emerald-300" };
      case "MODERATE":
        return { stroke: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)", text: "text-amber-700", badge: "bg-amber-100 text-amber-800 border-amber-300" };
      case "HIGH":
        return { stroke: "#f97316", bg: "rgba(249, 115, 22, 0.15)", text: "text-orange-700", badge: "bg-orange-100 text-orange-800 border-orange-300" };
      case "CRITICAL":
        return { stroke: "#ef4444", bg: "rgba(239, 68, 68, 0.15)", text: "text-red-700", badge: "bg-red-100 text-red-800 border-red-300" };
    }
  };

  const color = getColor(level);

  // SVG Gauge calculations (Semi-circle or 240-deg arc)
  const radius = size === "lg" ? 75 : size === "md" ? 56 : 38;
  const strokeWidth = size === "lg" ? 14 : size === "md" ? 10 : 7;
  const viewBoxSize = (radius + strokeWidth) * 2;
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * (circumference * 0.75);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <svg
          width={viewBoxSize}
          height={viewBoxSize}
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className="transform -rotate-135 transition-all duration-700"
        >
          {/* Background Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.25}
            strokeLinecap="round"
          />
          {/* Progress Arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span
            className={`font-extrabold tracking-tight ${
              size === "lg"
                ? "text-4xl"
                : size === "md"
                ? "text-2xl"
                : "text-lg"
            } ${color.text}`}
          >
            {normalizedScore}%
          </span>
          {size !== "sm" && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Risk Score
            </span>
          )}
        </div>
      </div>

      {showLabel && (
        <div className="mt-2 text-center">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${color.badge}`}
          >
            {level === "CRITICAL" && "🔴 "}
            {level === "HIGH" && "🟠 "}
            {level === "MODERATE" && "🟡 "}
            {level === "LOW" && "🟢 "}
            {level} RISK
          </span>
        </div>
      )}
    </div>
  );
};
