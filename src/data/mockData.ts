import type {
  User,
  ShiftTimer,
  LeaveBalance,
  CalendarDay,
  TeamMember,
  PendingApproval,
  EscalationAlert,
  DepartmentCompliance,
  RegularizationRequest,
  ConfigLink,
  ShiftConfig,
  StatCard,
} from "@/types/attendance";

// Current User
export const currentUser: User = {
  id: "EMP001",
  name: "Rahul Kumar",
  initials: "RK",
  email: "rahul.kumar@quadra.com",
  department: "Engineering",
  employeeId: "EMP001",
  role: "employee",
  reportingManager: "Priya Sharma",
};

// Screen 1: Employee Dashboard
export const shiftTimer: ShiftTimer = {
  checkInTime: "09:00 AM",
  expectedCheckOut: "06:00 PM",
  hoursWorked: "4h 32m",
  totalHours: "9h 00m",
  progressPercent: 50,
  status: "working",
};

export const employeeStats: StatCard[] = [
  { label: "Present Days", value: 22, color: "success" },
  { label: "Absent Days", value: 2, color: "danger" },
  { label: "Late Arrivals", value: 3, color: "warning" },
  { label: "Leave Balance", value: 12, color: "brand" },
];

export const leaveBalances: LeaveBalance[] = [
  { type: "Casual Leave", used: 3, total: 12 },
  { type: "Sick Leave", used: 1, total: 7 },
  { type: "Earned Leave", used: 2, total: 15 },
  { type: "Comp-off", used: 0, total: 3 },
];

export const calendarDays: CalendarDay[] = Array.from({ length: 31 }, (_, i) => {
  const date = i + 1;
  if ([6, 7, 13, 14, 20, 21, 27, 28].includes(date)) return { date, status: "weekend" as const };
  if ([5, 18].includes(date)) return { date, status: "absent" as const };
  if ([3, 11, 24].includes(date)) return { date, status: "late" as const };
  if ([15, 16].includes(date)) return { date, status: "leave" as const };
  if (date > 26) return { date, status: "future" as const };
  return { date, status: "present" as const };
});

// Screen 3: Manager Dashboard
export const managerStats: StatCard[] = [
  { label: "Team Size", value: 24, color: "neutral" },
  { label: "Present Now", value: 18, color: "success" },
  { label: "Late / Exceptions", value: 3, color: "warning" },
  { label: "On Leave", value: 3, color: "brand" },
];

export const teamMembers: TeamMember[] = [
  { id: "1", name: "Ankit Verma", initials: "AV", status: "on_time", checkInTime: "08:55 AM", location: "in_office", hoursWorked: "4h 30m" },
  { id: "2", name: "Sneha Patel", initials: "SP", status: "late", checkInTime: "09:42 AM", location: "remote", hoursWorked: "3h 45m" },
  { id: "3", name: "Vikram Singh", initials: "VS", status: "on_time", checkInTime: "08:50 AM", location: "in_office", hoursWorked: "4h 35m" },
  { id: "4", name: "Meera Joshi", initials: "MJ", status: "not_in", checkInTime: "—", location: "in_office", hoursWorked: "—" },
  { id: "5", name: "Arjun Nair", initials: "AN", status: "on_leave", checkInTime: "—", location: "in_office", hoursWorked: "—" },
];

export const pendingApprovals: PendingApproval[] = [
  { id: "1", employeeName: "Sneha Patel", initials: "SP", leaveType: "casual", fromDate: "Mar 15", toDate: "Mar 16", days: 2 },
  { id: "2", employeeName: "Vikram Singh", initials: "VS", leaveType: "sick", fromDate: "Mar 18", toDate: "Mar 18", days: 1 },
  { id: "3", employeeName: "Meera Joshi", initials: "MJ", leaveType: "earned", fromDate: "Mar 20", toDate: "Mar 22", days: 3 },
];

export const escalationAlerts: EscalationAlert[] = [
  { id: "1", employeeName: "Meera Joshi", description: "Nudge 3 sent — No response", timestamp: "10:30 AM" },
  { id: "2", employeeName: "Ravi Khanna", description: "Nudge 2 sent — No response", timestamp: "10:15 AM" },
];

// Screen 5: HR Admin Dashboard
export const hrStats: StatCard[] = [
  { label: "Org Attendance", value: "94.2%", color: "success", trend: { direction: "up", value: "1.2%" } },
  { label: "Total Present Today", value: 847, color: "neutral" },
  { label: "Late Marks This Month", value: 23, color: "warning" },
  { label: "Pending Regularizations", value: 12, color: "brand" },
  { label: "Open Escalations", value: 5, color: "danger" },
];

export const departmentCompliance: DepartmentCompliance[] = [
  { department: "Engineering", totalEmployees: 120, avgAttendance: 96.5, latePercent: 2.1, absentPercent: 1.4, status: "compliant" },
  { department: "Marketing", totalEmployees: 45, avgAttendance: 93.2, latePercent: 4.5, absentPercent: 2.3, status: "compliant" },
  { department: "Sales", totalEmployees: 80, avgAttendance: 89.1, latePercent: 6.2, absentPercent: 4.7, status: "at_risk" },
  { department: "Operations", totalEmployees: 200, avgAttendance: 91.8, latePercent: 5.0, absentPercent: 3.2, status: "at_risk" },
  { department: "Support", totalEmployees: 60, avgAttendance: 85.3, latePercent: 8.4, absentPercent: 6.3, status: "non_compliant" },
];

export const regularizationQueue: RegularizationRequest[] = [
  { id: "1", employeeName: "Amit Shah", date: "Mar 10", originalStatus: "Absent", requestedStatus: "Work From Home", reason: "Internet outage, worked offline" },
  { id: "2", employeeName: "Pooja Reddy", date: "Mar 08", originalStatus: "Late", requestedStatus: "On Time", reason: "Biometric malfunction" },
  { id: "3", employeeName: "Karan Mehta", date: "Mar 07", originalStatus: "Absent", requestedStatus: "Sick Leave", reason: "Medical emergency, doc attached" },
];

export const configLinks: ConfigLink[] = [
  { icon: "clock", label: "Shift Configuration", href: "/config/shifts" },
  { icon: "map-pin", label: "Geo-fence Settings", href: "/config/geofence" },
  { icon: "file-text", label: "Leave Policy Setup", href: "/config/leave-policy" },
  { icon: "bell", label: "Nudge Protocol Settings", href: "/config/nudge" },
  { icon: "calendar", label: "Holiday Calendar", href: "/config/holidays" },
];

// Screen 6: Shift Configuration
export const shiftConfigs: ShiftConfig[] = [
  { id: "1", name: "General Shift", startTime: "09:00", endTime: "18:00", gracePeriod: "15 min", applicableTo: "All Departments", status: "active" },
  { id: "2", name: "Morning Shift", startTime: "06:00", endTime: "15:00", gracePeriod: "10 min", applicableTo: "Manufacturing, Logistics", status: "active" },
  { id: "3", name: "Night Shift", startTime: "22:00", endTime: "07:00", gracePeriod: "20 min", applicableTo: "Security, Operations", status: "active" },
  { id: "4", name: "Flexible Hours", startTime: "08:00", endTime: "17:00", gracePeriod: "30 min", applicableTo: "Engineering, Design", status: "active" },
  { id: "5", name: "Weekend Shift", startTime: "10:00", endTime: "16:00", gracePeriod: "15 min", applicableTo: "Support", status: "inactive" },
];
