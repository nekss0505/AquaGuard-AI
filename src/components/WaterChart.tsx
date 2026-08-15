import React, { useState } from "react";

interface WaterChartProps {
  parameter: "turbidity" | "ph" | "tds" | "temperature";
  timeframe: "24h" | "7d" | "30d";
  currentValue: number;
}

export const WaterChart: React.FC<WaterChartProps> = ({
  parameter,
  timeframe,
  currentValue,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; val: number; label: string } | null>(null);

  // Generate deterministic realistic series data based on parameter and timeframe
  const generateData = () => {
    const pointsCount = timeframe === "24h" ? 24 : timeframe === "7d" ? 14 : 30;
    const data: { label: string; value: number }[] = [];

    const baseVal =
      parameter === "turbidity"
        ? 4.5
        : parameter === "ph"
        ? 7.1
        : parameter === "tds"
        ? 320
        : 28.0;

    const variance =
      parameter === "turbidity"
        ? 3.2
        : parameter === "ph"
        ? 0.4
        : parameter === "tds"
        ? 60
        : 1.5;

    for (let i = pointsCount - 1; i >= 0; i--) {
      let label = "";
      if (timeframe === "24h") {
        label = `${(24 - i).toString().padStart(2, "0")}:00`;
      } else if (timeframe === "7d") {
        label = `Day -${i}`;
      } else {
        label = `Aug ${30 - i}`;
      }

      // Add a spike near the end if turbidity is high
      let val = baseVal + Math.sin(i * 0.8) * variance + (Math.random() * (variance * 0.4) - variance * 0.2);

      if (i <= 2 && parameter === "turbidity" && currentValue > 8) {
        val = currentValue - (i * 1.5);
      }
      if (i === 0) {
        val = currentValue;
      }

      data.push({
        label,
        value: Number(Math.max(0.2, val).toFixed(parameter === "tds" ? 0 : 2)),
      });
    }
    return data;
  };

  const data = generateData();

  const minVal = Math.min(...data.map((d) => d.value)) * 0.85;
  const maxVal = Math.max(...data.map((d) => d.value)) * 1.15;

  const width = 600;
  const height = 200;
  const paddingX = 40;
  const paddingY = 25;

  const plotWidth = width - paddingX * 2;
  const plotHeight = height - paddingY * 2;

  const getX = (index: number) => paddingX + (index / (data.length - 1)) * plotWidth;
  const getY = (val: number) => height - paddingY - ((val - minVal) / (maxVal - minVal || 1)) * plotHeight;

  // Build SVG Path
  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`);
  const pathD = `M ${points.join(" L ")}`;
  const areaD = `M ${getX(0)},${height - paddingY} L ${points.join(" L ")} L ${getX(data.length - 1)},${height - paddingY} Z`;

  const getMeta = () => {
    switch (parameter) {
      case "turbidity":
        return {
          title: "Turbidity (NTU)",
          unit: "NTU",
          safeLimit: 5.0,
          idealLimit: 1.0,
          color: "#f59e0b",
          gradient: "from-amber-500/20 to-amber-500/0",
          guide: "WHO Guideline: < 1.0 NTU (Ideal) | BIS: < 5.0 NTU (Permissible)",
        };
      case "ph":
        return {
          title: "pH Level",
          unit: "",
          safeLimit: 8.5,
          idealLimit: 6.5,
          color: "#06b6d4",
          gradient: "from-cyan-500/20 to-cyan-500/0",
          guide: "WHO / BIS Potable Range: 6.5 – 8.5",
        };
      case "tds":
        return {
          title: "Total Dissolved Solids (TDS)",
          unit: "ppm",
          safeLimit: 500,
          idealLimit: 300,
          color: "#8b5cf6",
          gradient: "from-purple-500/20 to-purple-500/0",
          guide: "WHO / BIS Safe Limit: < 500 ppm",
        };
      case "temperature":
        return {
          title: "Water Temperature (°C)",
          unit: "°C",
          safeLimit: 32,
          idealLimit: 25,
          color: "#10b981",
          gradient: "from-emerald-500/20 to-emerald-500/0",
          guide: "Standard Surface Ambient: 24°C – 30°C",
        };
    }
  };

  const meta = getMeta();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {meta.title}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">{meta.guide}</div>
        </div>
        <div className="text-right">
          <span className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
            {currentValue} {meta.unit}
          </span>
          <span className="block text-[10px] text-slate-400 font-medium">Current Telemetry</span>
        </div>
      </div>

      {/* SVG Plot */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-44 overflow-visible"
        >
          <defs>
            <linearGradient id={`grad-${parameter}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={meta.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={meta.color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="#f1f5f9"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke="#f1f5f9"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="#e2e8f0"
          />

          {/* Safe threshold line if applicable */}
          {parameter === "turbidity" && (
            <>
              <line
                x1={paddingX}
                y1={getY(5.0)}
                x2={width - paddingX}
                y2={getY(5.0)}
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.6"
              />
              <text
                x={width - paddingX - 4}
                y={getY(5.0) - 4}
                textAnchor="end"
                fontSize="9"
                fill="#ef4444"
                fontWeight="bold"
              >
                Permissible Limit (5.0 NTU)
              </text>
            </>
          )}

          {/* Area Fill */}
          <path d={areaD} fill={`url(#grad-${parameter})`} />

          {/* Line Path */}
          <path
            d={pathD}
            fill="none"
            stroke={meta.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={getX(i)}
              cy={getY(d.value)}
              r={i === data.length - 1 ? 5 : 3}
              fill={i === data.length - 1 ? "#ffffff" : meta.color}
              stroke={meta.color}
              strokeWidth={i === data.length - 1 ? 3 : 1.5}
              className="cursor-pointer transition-all hover:r-6"
              onMouseEnter={() =>
                setHoveredPoint({ x: getX(i), y: getY(d.value), val: d.value, label: d.label })
              }
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-10 bg-slate-900 text-white text-[11px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100}%`,
            }}
          >
            <div>{hoveredPoint.val} {meta.unit}</div>
            <div className="text-[9px] font-normal text-slate-300">{hoveredPoint.label}</div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium mt-1 px-2">
        <span>{data[0]?.label}</span>
        <span>Simulated Sensor History</span>
        <span>{data[data.length - 1]?.label}</span>
      </div>
    </div>
  );
};
