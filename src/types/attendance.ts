// ============================================
// Quadra People — Attendance Management Types
// ============================================

// Shared Enums
export type UserRole = "employee" | "manager" | "hr_admin";
export type AttendanceStatus = "on_time" | "late" | "not_in" | "on_leave";
export type LeaveType = "casual" | "sick" | "earned" | "comp_off";
export type RequestType = "full_day" | "half_day" | "permission";
export type ApprovalStatus = "pending" | "approved" | "rejected";
export type ComplianceStatus = "compliant" | "at_risk" | "non_compliant";
export type ShiftStatus = "active" | "inactive";
export type LocationType = "in_office" | "remote" | "outside_geofence";

// Shared Interfaces
export interface User {
  id: string;
  name: string;
  initials: string;
  email: string;
  department: string;
  employeeId: string;
  role: UserRole;
  reportingManager?: string;
}

export interface StatCard {
  label: string;
  value: string | number;
  color: "success" | "danger" | "warning" | "brand" | "neutral";
  trend?: { direction: "up" | "down"; value: string };
  icon?: string;
}

// Screen 1: Employee Dashboard
export interface ShiftTimer {
  checkInTime: string;
  expectedCheckOut: string;
  hoursWorked: string;
  totalHours: string;
  progressPercent: number;
  status: "working" | "not_checked_in" | "checked_out";
}

export interface LeaveBalance {
  type: string;
  used: number;
  total: number;
}

export interface CalendarDay {
  date: number;
  status: "present" | "absent" | "late" | "leave" | "weekend" | "holiday" | "future";
}

// Screen 2: Leave Request Form
export interface LeaveRequest {
  requestType: RequestType;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  numberOfDays: number;
  reason: string;
  attachment?: string;
}

// Screen 3: Manager Dashboard
export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  status: AttendanceStatus;
  checkInTime: string;
  location: LocationType;
  hoursWorked: string;
}

export interface PendingApproval {
  id: string;
  employeeName: string;
  initials: string;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  days: number;
}

export interface EscalationAlert {
  id: string;
  employeeName: string;
  description: string;
  timestamp: string;
}

// Screen 4: Request Approval Detail
export interface RequestDetail {
  employee: User;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  attachments: string[];
  status: ApprovalStatus;
  leaveBalances: LeaveBalance[];
  history: { action: string; by: string; timestamp: string }[];
}

// Screen 5: HR Admin Dashboard
export interface DepartmentCompliance {
  department: string;
  totalEmployees: number;
  avgAttendance: number;
  latePercent: number;
  absentPercent: number;
  status: ComplianceStatus;
}

export interface RegularizationRequest {
  id: string;
  employeeName: string;
  date: string;
  originalStatus: string;
  requestedStatus: string;
  reason: string;
}

export interface ConfigLink {
  icon: string;
  label: string;
  href: string;
}

// Screen 6: Attendance Configuration
export interface ShiftConfig {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  gracePeriod: string;
  applicableTo: string;
  status: ShiftStatus;
}

export interface ShiftDetail {
  name: string;
  startTime: string;
  endTime: string;
  gracePeriod: number;
  halfDayCutoff: string;
  applicableDepartments: string;
}
