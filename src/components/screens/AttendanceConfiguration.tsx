"use client";

import { useState } from "react";
import {
  Pencil,
  X,
  ChevronDown,
  AlarmClock,
} from "lucide-react";
import { Header, Breadcrumbs, StatusBadge, getShiftStatusVariant } from "@/components/shared";
import { shiftConfigs } from "@/data/mockData";
import type { ShiftConfig, ShiftDetail } from "@/types/attendance";

const configTabs = [
  "Shifts",
  "Geo-fence",
  "Leave Policy",
  "Nudge Protocol",
  "Holidays",
] as const;

type ConfigTab = (typeof configTabs)[number];

interface ToggleSwitchProps {
  enabled: boolean;
}

function ToggleSwitch({ enabled }: ToggleSwitchProps) {
  return (
    <div
      className={`w-8 h-[18px] rounded-[9px] relative cursor-pointer transition-colors ${
        enabled
          ? "bg-gradient-to-b from-[#055cac] to-[#23a5e6]"
          : "bg-[#d1d5db]"
      }`}
    >
      <div
        className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-transform ${
          enabled ? "left-4" : "left-0.5"
        }`}
      />
    </div>
  );
}

function ShiftTable({
  shifts,
  selectedId,
  onSelect,
}: {
  shifts: ShiftConfig[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex-1 bg-white rounded-card shadow-card flex flex-col overflow-hidden">
      {/* Table Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="font-sora text-base font-semibold text-[#242424]">
          Shift Configuration
        </h3>
        <button className="bg-gradient-to-b from-[#055cac] to-[#23a5e6] text-white font-sora text-xs font-semibold rounded-pill px-5 py-2.5">
          + Add New Shift
        </button>
      </div>

      {/* Column Headers */}
      <div className="flex items-center px-5 py-2.5 bg-[#f9fafb] border-b border-[#e5e7eb]">
        <span className="w-40 font-sora text-[11px] font-semibold text-[#616161]">
          Shift Name
        </span>
        <span className="w-[90px] font-sora text-[11px] font-semibold text-[#616161]">
          Start Time
        </span>
        <span className="w-[90px] font-sora text-[11px] font-semibold text-[#616161]">
          End Time
        </span>
        <span className="w-[100px] font-sora text-[11px] font-semibold text-[#616161]">
          Grace Period
        </span>
        <span className="flex-1 font-sora text-[11px] font-semibold text-[#616161]">
          Applicable To
        </span>
        <span className="w-20 font-sora text-[11px] font-semibold text-[#616161]">
          Status
        </span>
        <span className="w-[70px] font-sora text-[11px] font-semibold text-[#616161]">
          Actions
        </span>
      </div>

      {/* Data Rows */}
      <div className="flex-1">
        {shifts.map((shift, index) => (
          <div
            key={shift.id}
            onClick={() => onSelect(shift.id)}
            className={`flex items-center px-5 py-3 cursor-pointer transition-colors ${
              selectedId === shift.id
                ? "bg-[#ebf3fc44]"
                : "hover:bg-[#f9fafb]"
            } ${
              index < shifts.length - 1 ? "border-b border-[#e5e7eb]" : ""
            }`}
          >
            <span className="w-40 font-sora text-[13px] font-medium text-[#242424]">
              {shift.name}
            </span>
            <span className="w-[90px] font-sora text-[13px] text-[#424242]">
              {shift.startTime}
            </span>
            <span className="w-[90px] font-sora text-[13px] text-[#424242]">
              {shift.endTime}
            </span>
            <span className="w-[100px] font-sora text-[13px] text-[#424242]">
              {shift.gracePeriod}
            </span>
            <span className="flex-1 font-sora text-[13px] text-[#424242]">
              {shift.applicableTo}
            </span>
            <div className="w-20">
              <StatusBadge
                label={shift.status === "active" ? "Active" : "Inactive"}
                variant={getShiftStatusVariant(shift.status)}
              />
            </div>
            <div className="w-[70px] flex items-center gap-2">
              <Pencil className="w-4 h-4 text-[#616161]" />
              <ToggleSwitch enabled={shift.status === "active"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShiftDetailForm({
  detail,
  onClose,
}: {
  detail: ShiftDetail;
  onClose: () => void;
}) {
  return (
    <div className="w-[360px] bg-white rounded-card shadow-card flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e7eb]">
        <h3 className="font-sora text-[15px] font-semibold text-[#242424]">
          Edit Shift Details
        </h3>
        <button onClick={onClose}>
          <X className="w-[18px] h-[18px] text-[#616161]" />
        </button>
      </div>

      {/* Form Body */}
      <div className="flex-1 flex flex-col gap-4 p-5">
        {/* Shift Name */}
        <label className="flex flex-col gap-1.5">
          <span className="font-sora text-xs font-medium text-[#424242]">
            Shift Name
          </span>
          <div className="flex items-center h-10 px-3 rounded-lg border border-[#d1d5db]">
            <span className="font-sora text-[13px] text-[#242424]">
              {detail.name}
            </span>
          </div>
        </label>

        {/* Start / End Time */}
        <div className="flex gap-3">
          <label className="flex-1 flex flex-col gap-1.5">
            <span className="font-sora text-xs font-medium text-[#424242]">
              Start Time
            </span>
            <div className="flex items-center justify-between h-10 px-3 rounded-lg border border-[#d1d5db]">
              <span className="font-sora text-[13px] text-[#242424]">
                {detail.startTime}
              </span>
              <AlarmClock className="w-4 h-4 text-[#9ca3af]" />
            </div>
          </label>
          <label className="flex-1 flex flex-col gap-1.5">
            <span className="font-sora text-xs font-medium text-[#424242]">
              End Time
            </span>
            <div className="flex items-center justify-between h-10 px-3 rounded-lg border border-[#d1d5db]">
              <span className="font-sora text-[13px] text-[#242424]">
                {detail.endTime}
              </span>
              <AlarmClock className="w-4 h-4 text-[#9ca3af]" />
            </div>
          </label>
        </div>

        {/* Grace Period / Half-day Cutoff */}
        <div className="flex gap-3">
          <label className="flex-1 flex flex-col gap-1.5">
            <span className="font-sora text-xs font-medium text-[#424242]">
              Grace Period (min)
            </span>
            <div className="flex items-center h-10 px-3 rounded-lg border border-[#d1d5db]">
              <span className="font-sora text-[13px] text-[#242424]">
                {detail.gracePeriod}
              </span>
            </div>
          </label>
          <label className="flex-1 flex flex-col gap-1.5">
            <span className="font-sora text-xs font-medium text-[#424242]">
              Half-day Cutoff
            </span>
            <div className="flex items-center justify-between h-10 px-3 rounded-lg border border-[#d1d5db]">
              <span className="font-sora text-[13px] text-[#242424]">
                {detail.halfDayCutoff}
              </span>
              <AlarmClock className="w-4 h-4 text-[#9ca3af]" />
            </div>
          </label>
        </div>

        {/* Applicable Departments */}
        <label className="flex flex-col gap-1.5">
          <span className="font-sora text-xs font-medium text-[#424242]">
            Applicable Departments
          </span>
          <div className="flex items-center justify-between h-10 px-3 rounded-lg border border-[#d1d5db]">
            <span className="font-sora text-[13px] text-[#242424]">
              {detail.applicableDepartments}
            </span>
            <ChevronDown className="w-4 h-4 text-[#9ca3af]" />
          </div>
        </label>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 mt-auto">
          <button
            onClick={onClose}
            className="font-sora text-[13px] text-[#171717] px-7 py-2.5 rounded-pill border-2 border-transparent bg-clip-padding"
            style={{
              borderImage:
                "linear-gradient(to right, #055cac, #23a5e6) 1",
              borderImageSlice: 1,
            }}
          >
            Cancel
          </button>
          <button className="font-sora text-[13px] font-semibold text-white px-7 py-2.5 rounded-pill bg-gradient-to-b from-[#055cac] to-[#23a5e6]">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export function AttendanceConfiguration() {
  const [activeTab, setActiveTab] = useState<ConfigTab>("Shifts");
  const [selectedShiftId, setSelectedShiftId] = useState<string | null>("1");

  const selectedShift = shiftConfigs.find((s) => s.id === selectedShiftId);

  const shiftDetail: ShiftDetail | null = selectedShift
    ? {
        name: selectedShift.name,
        startTime: selectedShift.startTime,
        endTime: selectedShift.endTime,
        gracePeriod: parseInt(selectedShift.gracePeriod),
        halfDayCutoff: "13:00",
        applicableDepartments: selectedShift.applicableTo,
      }
    : null;

  return (
    <div className="flex flex-col w-[1440px] h-[900px] bg-[#f5f5f5]">
      <Header activeRole="hr_admin" />

      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-5 p-6 overflow-hidden">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "HR Dashboard", href: "/attendance/admin" },
            { label: "Configuration" },
          ]}
        />

        {/* Title */}
        <h1 className="font-sora text-[22px] font-semibold text-[#242424]">
          Attendance Configuration
        </h1>

        {/* Sub-Tabs */}
        <div className="flex border-b border-[#e5e7eb]">
          {configTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 font-sora text-[13px] transition-colors ${
                activeTab === tab
                  ? "font-semibold text-[#055cac] border-b-2 border-[#055cac]"
                  : "text-[#616161] hover:text-[#242424]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-5 overflow-hidden">
          <ShiftTable
            shifts={shiftConfigs}
            selectedId={selectedShiftId}
            onSelect={setSelectedShiftId}
          />

          {shiftDetail && (
            <ShiftDetailForm
              detail={shiftDetail}
              onClose={() => setSelectedShiftId(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
