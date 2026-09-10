import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  subtext?: string;
}

export default function StatCard({ title, value, change, isPositive = true, icon: Icon, subtext }: StatCardProps) {
  return (
    <div className="admin-card p-5 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-wider uppercase text-gray-400">{title}</p>
          <h3 className="text-2xl font-black text-white mt-1">{value}</h3>
        </div>
        <div className="p-3 bg-red-600/10 border border-red-500/20 text-red-400 rounded-xl">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(change || subtext) && (
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
          {change && (
            <div className={`flex items-center gap-1 font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{change}</span>
            </div>
          )}
          {subtext && <span className="text-gray-500 text-[11px]">{subtext}</span>}
        </div>
      )}
    </div>
  );
}
