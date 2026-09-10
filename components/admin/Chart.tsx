"use client";

interface BarChartProps {
  data: { label: string; value: number }[];
  height?: number;
  barColor?: string;
}

export function BarChart({ data, height = 200, barColor = "#ef4444" }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <div className="h-full flex items-end gap-2 pt-6 pb-6 px-2">
        {data.map((item, idx) => {
          const heightPercent = (item.value / maxValue) * 100;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition absolute -top-8 bg-slate-800 text-white text-[10px] py-1 px-2 rounded border border-white/10 pointer-events-none whitespace-nowrap z-10">
                {item.label}: {item.value.toLocaleString()}
              </div>

              <div
                className="w-full rounded-t transition-all duration-500 hover:brightness-125"
                style={{
                  height: `${Math.max(heightPercent, 4)}%`,
                  backgroundColor: barColor,
                }}
              />
              <span className="text-[10px] text-gray-400 mt-2 truncate w-full text-center">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  lineColor?: string;
}

export function LineChart({ data, height = 200, lineColor = "#3b82f6" }: LineChartProps) {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.value / maxValue) * 80; // keep padding top
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="w-full relative" style={{ height: `${height}px` }}>
      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Fill Gradient */}
        <defs>
          <linearGradient id="line-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <polygon points={`0,100 ${points} 100,100`} fill="url(#line-grad)" />

        <polyline
          fill="none"
          stroke={lineColor}
          strokeWidth="2.5"
          points={points}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="flex justify-between text-[10px] text-gray-400 mt-2 px-1">
        {data.map((item, idx) => (
          <span key={idx}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  height?: number;
}

export function DonutChart({ data, height = 200 }: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  let cumulativeAngle = 0;
  const slices = data.map((d) => {
    const angle = (d.value / total) * 360;
    const startAngle = cumulativeAngle;
    cumulativeAngle += angle;
    return { ...d, startAngle, angle };
  });

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6" style={{ minHeight: `${height}px` }}>
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          {slices.map((slice, idx) => {
            const dashArray = `${(slice.angle / 360) * 100} 100`;
            const dashOffset = -((slice.startAngle / 360) * 100);

            return (
              <circle
                key={idx}
                cx="18"
                cy="18"
                r="15.91549430918954"
                fill="transparent"
                stroke={slice.color}
                strokeWidth="3.8"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-gray-400">Total</span>
          <span className="text-sm font-bold text-white">{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-gray-300">{item.label}:</span>
            <span className="font-bold text-white">{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
