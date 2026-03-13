import { TrendingUp, TrendingDown } from "lucide-react";
import type { StatCard as StatCardType } from "@/types/attendance";

const colorMap = {
  success: "text-[#107c10]",
  danger: "text-[#c50f1f]",
  warning: "text-[#f59e0b]",
  brand: "text-[#055cac]",
  neutral: "text-[#242424]",
};

const bgMap = {
  success: "bg-[#f0fdf4]",
  danger: "bg-[#fef2f2]",
  warning: "bg-[#fffbeb]",
  brand: "bg-[#ebf3fc]",
  neutral: "bg-white",
};

export function StatCard({ label, value, color, trend }: StatCardType) {
  return (
    <div className="flex-1 bg-white rounded-xl p-4 shadow-[0_2px_4px_rgba(0,0,0,0.05)] flex flex-col gap-2">
      <span className="font-sora text-xs font-medium text-[#616161]">
        {label}
      </span>
      <div className="flex items-end gap-2">
        <span className={`font-sora text-[28px] font-bold ${colorMap[color]}`}>
          {value}
        </span>
        {trend && (
          <span
            className={`flex items-center gap-1 text-xs font-medium ${
              trend.direction === "up" ? "text-[#107c10]" : "text-[#c50f1f]"
            } ${
              trend.direction === "up" ? bgMap.success : bgMap.danger
            } px-1.5 py-0.5 rounded`}
          >
            {trend.direction === "up" ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}
