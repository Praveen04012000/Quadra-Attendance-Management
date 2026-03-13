# Quadra People — Attendance Management Design Brief
# ===================================================
# Design System: Already loaded in Pencil (QuadraSystem)
# Place this file in your project folder alongside your .pen file
# Then prompt Pencil: "Read docs/attendance-design-brief.md and design all screens"

---

## Design System Reference

Use the QuadraSystem design system already configured in Pencil for all colors, typography, spacing, radii, shadows, and component styles. Follow the existing tokens and component variants (Button, Card, Badge, Input, Dropdown, Checkbox, Radio, Pagination, Avatar, Tooltip, Breadcrumbs, TabList, Dialog, Toast) defined in the design system.

---

## Global Layout Structure (All Screens)

- Frame Size: 1440 x 900px
- Top Header: 56px height, white bg, bottom border
  - Left: Quadra logo icon (28x28 rounded square, brand gradient) + "QuadraPeople" text
  - Center: Role tabs using the TabList component (Employee | Manager | HR Admin)
  - Right: Notification bell icon + User Avatar component (32px, initials)
- Content Area: Below header, full width, subtle background, 24px padding

---

## Screen 1: Employee Dashboard
**Frame name:** "Screen 1 — Employee Dashboard"
**Persona:** Employee
**Purpose:** Daily check-in/out, view shift status, leave balances, and attendance history

### Layout
- Welcome Row: Left — greeting "Good Morning, [Name]" + date. Right — Clock In button (Primary Button) + "Request Leave" button (Secondary Button)
- Shift Timer Card: Large Card component showing current shift status
  - Circular progress indicator showing hours worked vs total shift
  - Check-in time, expected check-out time
  - Status: Badge component — "Working" (Success) or "Not Checked In" (Warning)
  - "Check Out" Primary Button when checked in
- Stats Row: 4 small Card components in a row
  - Present Days (Success color)
  - Absent Days (Danger color)
  - Late Arrivals (Warning color)
  - Leave Balance (Brand/Info color)
- Bottom Section: Two columns
  - Left (60%): Attendance Calendar — monthly grid view, color-coded days (success=present, danger=absent, warning=late, brand=leave, neutral=weekend/holiday)
  - Right (40%): Leave Balances Card — list showing each leave type (Casual, Sick, Earned, Comp-off) with used/total and progress bar

---

## Screen 2: Employee Leave Request Form
**Frame name:** "Screen 2 — Leave Request Form"
**Persona:** Employee
**Purpose:** Submit leave or permission requests with approval workflow

### Layout
- Breadcrumbs component: Dashboard > Request Leave
- Form Card: Card component (Filled style), max-width 720px centered
  - Section: Request Type — Radio component group (Full Day Leave | Half Day | Permission/Short Leave)
  - Section: Leave Details
    - Dropdown component for Leave Type (Casual Leave, Sick Leave, Earned Leave, Comp-off)
    - Date Range: Two Input components (From — To) with calendar
    - Number of days (auto-calculated, read-only Input)
    - Reason: Textarea component (Outline style, 3 rows)
    - File upload area (dashed border, drag-drop zone)
  - Section: Approval Info — Avatar component + reporting manager name (read-only)
  - Footer: Secondary Button (Cancel) + Primary Button (Submit Request)
- Side Panel (right): Compact leave balances summary Card

---

## Screen 3: Manager Dashboard
**Frame name:** "Screen 3 — Manager Dashboard"
**Persona:** Reporting Manager
**Purpose:** Monitor live team attendance, handle alerts, approve requests

### Layout
- Welcome Row: Left — "Team Attendance" title + date. Right — Secondary Button (Export Report)
- Alert Banner: Toast component (Warning variant) — "3 team members require attention" with action link
- Stats Row: 4 Card components
  - Team Size (total count, neutral)
  - Present Now (count, Success)
  - Late / Exceptions (count, Warning)
  - On Leave (count, Brand/Informative)
- Live Team Grid: Large Card with data table
  - Table Header: Employee Name | Status | Check-In Time | Location | Hours Worked | Actions
  - Status column: Badge components — "On Time" (Success), "Late" (Warning), "Not In" (Danger), "On Leave" (Informative)
  - Location column: "In Office" or "Remote" or "Outside Geo-fence" (Danger foreground with icon)
  - Actions column: Icon Button (three-dot menu)
  - Row hover state
  - Pagination component at bottom
- Right Side Panel (280px):
  - Pending Approvals Card: List of leave requests
    - Each item: Avatar component + name, Badge (leave type), dates, Primary Button (Approve) + Danger outline button (Reject)
    - Badge component showing count "4 Pending"
  - Escalation Alerts Card: List of nudge-escalated employees
    - Each item: Name, description "Nudge 3 sent — No response", timestamp
    - Tertiary Button (Mark Absent) + Icon Button (Call)

---

## Screen 4: Manager — Request Approval Detail
**Frame name:** "Screen 4 — Request Approval Detail"
**Persona:** Reporting Manager
**Purpose:** Review and approve/reject a specific leave or permission request

### Layout
- Breadcrumbs component: Manager Dashboard > Leave Requests > [Employee Name]
- Two-column layout:
  - Left Column (60%): Request Details Card
    - Employee: Avatar component (48px) + Name + Employee ID + Department
    - Request summary: Badge (leave type), date range, number of days, reason text
    - Attached documents section (file thumbnail with download link)
    - Attendance Context Card: Mini 30-day calendar with color-coded dots
    - Leave balance compact table (Type | Used | Remaining)
  - Right Column (40%): Action Card
    - Status: Badge component "Pending Approval" (Warning)
    - Textarea component for manager comments
    - Primary Button full-width "Approve" (Success color)
    - Secondary Button full-width "Reject" (Danger outline)
    - History log: action items with timestamps

---

## Screen 5: HR Admin Dashboard
**Frame name:** "Screen 5 — HR Admin Dashboard"
**Persona:** HR Admin
**Purpose:** Organization-wide attendance monitoring, compliance, configuration

### Layout
- Header Row: Title + Dropdown component for date range (This Week / This Month / Custom) + Secondary Button (Download Report)
- KPI Cards Row: 5 Card components
  - Org Attendance % (large number with trend arrow)
  - Total Present Today (count)
  - Late Marks This Month (Warning color)
  - Pending Regularizations (Informative color)
  - Open Escalations (Danger color)
- Middle Section: Two columns
  - Left (65%): Department Compliance Table Card
    - Columns: Department | Total Employees | Avg Attendance % | Late % | Absent % | Compliance Status
    - Compliance Status: Badge — "Compliant" (Success), "At Risk" (Warning), "Non-Compliant" (Danger)
    - Input component (search) above table
  - Right (35%): Attendance Trends Chart Card
    - Line chart: daily attendance % over selected period
    - Lines: Present (success), Late (warning), Absent (danger)
- Bottom Section: Two columns
  - Left: Regularization Queue Card
    - Table: Employee | Date | Original Status | Requested Status | Reason | Action
    - Primary Button (Approve) + Danger outline button (Reject) per row
  - Right: Configuration Quick Links Card
    - List items: Shift Configuration, Geo-fence Settings, Leave Policy Setup, Nudge Protocol Settings, Holiday Calendar
    - Each item: icon + label + chevron right

---

## Screen 6: HR Admin — Shift and Geo-fence Configuration
**Frame name:** "Screen 6 — Attendance Configuration"
**Persona:** HR Admin
**Purpose:** Configure shifts, geo-fence boundaries, leave policies, and nudge protocols

### Layout
- Breadcrumbs component: HR Dashboard > Configuration
- TabList component (Subtle style): Shifts | Geo-fence | Leave Policy | Nudge Protocol | Holidays
- Tab Content (Shifts tab active):
  - Shift List Table Card:
    - Columns: Shift Name | Start Time | End Time | Grace Period | Applicable To | Status | Actions
    - Sample rows: "General Shift 09:00-18:00", "Morning Shift 06:00-15:00"
    - Status: Badge — Active (Success) / Inactive (Subtle)
    - Actions: Icon Button (edit pencil), Toggle
    - Primary Button "Add New Shift" above table
  - Right Side: Selected Shift Detail Card (edit mode)
    - Input components: Shift Name, Start Time picker, End Time picker, Grace Period (number), Half-day cutoff time
    - Dropdown component: Applicable departments (multi-select)
    - Primary Button (Save) + Secondary Button (Cancel)
- Geo-fence Tab (alternate state):
  - Map placeholder area (neutral bg rectangle with pin icon)
  - Input component for radius (meters) with slider
  - Toggle switch: "Enable geo-fence validation"
  - List of configured locations with coordinates

---

## Workflow Reference

### Positive Flow
Not Checked In > Checked In > Working > Checked Out > Present

### Negative Flow (Nudge Escalation)
Not Checked In > Nudge 1 (10 min) > Nudge 2 (20 min) > Nudge 3 (30 min) > Escalated to Manager > Absent/No-Show

### Leave Request Flow
Employee Submits > Manager Reviews > Approved/Rejected > Balance Updated > Calendar Updated

---

## Pencil Generation Instructions
- Use the QuadraSystem design system already loaded in Pencil for all styling
- Generate each screen as a separate 1440x900 frame on the canvas
- Label each frame clearly with its screen name
- Maintain visual consistency across all 6 screens (same header, same navigation, same component usage)
- Use the existing component variants from the design system: Card (Filled/Outline/Subtle), Button (Primary/Secondary/Tertiary/Icon), Badge (Success/Danger/Warning/Informative/Subtle), Input (Outline/Filled), Dropdown, TabList, Breadcrumbs, Avatar, Pagination, Toast, Radio, Checkbox
- All interactive states should reference the Rest state variants from the design system
