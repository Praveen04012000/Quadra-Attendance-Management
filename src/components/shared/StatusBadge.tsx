import type { AttendanceStatus, ApprovalStatus, ComplianceStatus, ShiftStatus, LeaveType } from "@/types/attendance";

type BadgeVariant = "success" | "danger" | "warning" | "brand" | "informative" | "subtle";

interface StatusBadgeProps {
  label: string;
  variant: BadgeVariant;
  size?: "sm" | "md";
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-[#107c10] text-white",
  danger: "bg-[#c50f1f] text-white",
  warning: "bg-[#fef3c7] text-[#be7c00]",
  brand: "bg-[#1d4ed8] text-white",
  informative: "bg-[#ebf3fc] text-[#055cac]",
  subtle: "bg-[#ebebeb] text-[#616161]",
};

const sizeStyles = {
  sm: "text-[10px] px-2 py-0.5",
  md: "text-xs px-2.5 py-1",
};

export function StatusBadge({ label, variant, size = "sm" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg font-sora font-normal whitespace-nowrap ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {label}
    </span>
  );
}

// Helper mappers
export function getAttendanceVariant(status: AttendanceStatus): BadgeVariant {
  const map: Record<AttendanceStatus, BadgeVariant> = {
    on_time: "success",
    late: "warning",
    not_in: "danger",
    on_leave: "informative",
  };
  return map[status];
}

export function getAttendanceLabel(status: AttendanceStatus): string {
  const map: Record<AttendanceStatus, string> = {
    on_time: "On Time",
    late: "Late",
    not_in: "Not In",
    on_leave: "On Leave",
  };
  return map[status];
}

export function getLeaveTypeLabel(type: LeaveType): string {
  const map: Record<LeaveType, string> = {
    casual: "Casual",
    sick: "Sick",
    earned: "Earned",
    comp_off: "Comp-off",
  };
  return map[type];
}

export function getComplianceVariant(status: ComplianceStatus): BadgeVariant {
  const map: Record<ComplianceStatus, BadgeVariant> = {
    compliant: "success",
    at_risk: "warning",
    non_compliant: "danger",
  };
  return map[status];
}

export function getComplianceLabel(status: ComplianceStatus): string {
  const map: Record<ComplianceStatus, string> = {
    compliant: "Compliant",
    at_risk: "At Risk",
    non_compliant: "Non-Compliant",
  };
  return map[status];
}

export function getShiftStatusVariant(status: ShiftStatus): BadgeVariant {
  return status === "active" ? "success" : "subtle";
}
