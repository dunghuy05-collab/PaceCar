import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, MapPin, Search, UserRound } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, useToast } from "./UI";
import {
  HANDOVER_POLICY,
  validateHandoverTimes,
} from "../services/rentalPolicy";
const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const isoDate = (offset = 0) => {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return formatLocalDate(date);
};
const locations = [
  "Hà Nội",
  "Hà Đông, Hà Nội",
  "Cầu Giấy, Hà Nội",
  "Mỹ Đình, Hà Nội",
  "Hòa Lạc, Hà Nội",
  "Tây Hồ, Hà Nội",
  "Long Biên, Hà Nội",
  "Hai Bà Trưng, Hà Nội",
  "Thanh Xuân, Hà Nội",
  "Gia Lâm, Hà Nội",
  "Hoàn Kiếm, Hà Nội",
  "Nội Bài, Hà Nội",
];
export default function SearchBar({ compact = false }) {
  const nav = useNavigate(),
    toast = useToast(),
    [params, setParams] = useSearchParams();
  const valuesFromParams = () => ({
    location: params.get("location") || "Hà Nội",
    destination: params.get("destination") || "",
    startDate: params.get("startDate") || isoDate(1),
    startTime: params.get("startTime") || "08:00",
    endDate: params.get("endDate") || isoDate(3),
    endTime: params.get("endTime") || "20:00",
    driverOption: params.get("driverOption") || "self",
  });
  const [form, setForm] = useState(valuesFromParams);
  const relevantParams = useMemo(
    () =>
      [
        "location",
        "destination",
        "startDate",
        "startTime",
        "endDate",
        "endTime",
        "driverOption",
      ]
        .map((key) => params.get(key) || "")
        .join("|"),
    [params],
  );
  useEffect(() => {
    if (!compact) return;
    const next = new URLSearchParams(params);
    let changed = false;
    for (const [key, value] of Object.entries(form)) {
      if (!next.get(key)) {
        next.set(key, value);
        changed = true;
      }
    }
    if (changed) setParams(next, { replace: true });
  }, [compact, setParams]);
  useEffect(() => {
    setForm(valuesFromParams());
    // Unrelated filter parameters do not change this signature, so they cannot
    // overwrite dates a user is currently editing. Back/forward navigation can.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relevantParams]);
  function submit(e) {
    e.preventDefault();
    if (form.startDate < isoDate(0)) {
      toast.error("Ngày nhận xe không thể ở trong quá khứ");
      return;
    }
    const start = new Date(`${form.startDate}T${form.startTime}:00`),
      end = new Date(`${form.endDate}T${form.endTime}:00`);
    if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime())) {
      toast.error("Vui lòng chọn đủ ngày và giờ nhận, trả xe");
      return;
    }
    if (start < new Date()) {
      toast.error("Thời gian nhận xe không thể ở trong quá khứ");
      return;
    }
    if (end <= start) {
      toast.error("Thời gian trả xe phải sau thời gian nhận xe");
      return;
    }
    const handoverError = validateHandoverTimes(form.startTime, form.endTime);
    if (handoverError) {
      toast.error(handoverError);
      return;
    }
    const next = compact ? new URLSearchParams(params) : new URLSearchParams();
    Object.entries(form).forEach(([key, value]) =>
      value ? next.set(key, value) : next.delete(key),
    );
    next.delete("page");
    nav(`/cars?${next}`);
  }
  const box =
    "flex min-w-0 flex-col gap-1.5 rounded-lg border-[0.8px] border-pace-line px-3.5 py-1 transition focus-within:border-pace-blue";
  const cap = "text-[9px] font-bold uppercase leading-[13.5px] text-[#6b6e75]";
  const val =
    "h-[18px] min-w-0 w-full bg-transparent p-0 text-xs font-bold leading-[18px] text-pace-ink outline-none placeholder:text-pace-ink";
  return (
    <form
      onSubmit={submit}
      className={`flex w-full flex-col rounded-[3px] bg-white px-4 py-3.5 font-ui ${compact ? "drop-shadow-[0_14px_17px_rgba(0,0,0,0.14)]" : "drop-shadow-[0_16px_19px_rgba(8,14,73,0.28)]"}`}
    >
      <div
        className="flex h-[29px] gap-1.5"
        role="group"
        aria-label="Hình thức thuê xe"
      >
        {[
          ["self", "Tự lái"],
          ["driver", "Có tài xế"],
        ].map(([value, label]) => (
          <button
            type="button"
            key={value}
            onClick={() => setForm({ ...form, driverOption: value })}
            aria-pressed={form.driverOption === value}
            className={`rounded-[2px] px-3 py-[7px] text-[10px] font-bold uppercase leading-[15px] transition ${form.driverOption === value ? "bg-pace-dark text-white" : "text-pace-muted hover:bg-pace-tab"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1.25fr_1.25fr_auto]">
        <label className="relative min-w-0 sm:col-span-2 lg:col-span-1">
          <span className="label">
            <MapPin className="mr-1 inline" size={16} />
            Khu vực nhận xe
          </span>
          <select
            className={val}
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          >
            {!locations.includes(form.location) && (
              <option value={form.location}>{form.location}</option>
            )}
            {locations.map((location) => (
              <option key={location}>{location}</option>
            ))}
          </select>
          <span className="mt-1 block text-[11px] text-slate-400">
            Điểm hẹn cụ thể hiển thị trong trang xe
          </span>
        </label>
        <label className="relative min-w-0 sm:col-span-2 lg:col-span-1">
          <span className="label">
            <MapPin className="mr-1 inline" size={16} />
            Điểm đến dự kiến
          </span>
          <input
            className={val}
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            placeholder="Ví dụ: Hải Phòng"
          />
        </label>
        <div className={box} role="group" aria-label="Nhận xe">
          <span className={cap}>Nhận xe</span>
          <div className="flex min-w-0 gap-2">
            <input
              aria-label="Ngày nhận xe"
              type="date"
              min={isoDate(0)}
              required
              className={`${val} flex-1`}
              value={form.startDate}
              onChange={(e) => {
                const startDate = e.target.value;
                setForm({
                  ...form,
                  startDate,
                  endDate:
                    startDate && form.endDate < startDate
                      ? startDate
                      : form.endDate,
                });
              }}
            />
            <input
              aria-label="Giờ nhận xe"
              type="time"
              required
              className={`${val} flex-1`}
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            />
          </div>
        </div>
        <div className={box} role="group" aria-label="Trả xe">
          <span className={cap}>Trả xe</span>
          <div className="flex min-w-0 gap-2">
            <input
              aria-label="Ngày trả xe"
              type="date"
              min={form.startDate || isoDate(0)}
              required
              className={`${val} flex-1`}
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
            <input
              aria-label="Giờ trả xe"
              type="time"
              required
              className={`${val} flex-1`}
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex h-10 min-h-[40px] items-center justify-center gap-2 rounded-[2px] border-[0.8px] border-transparent bg-pace-blue px-[18px] text-xs font-bold uppercase leading-[16.5px] tracking-[0.22px] text-white transition hover:border-pace-blue hover:bg-pace-tab hover:text-pace-blue sm:col-span-2"
        >
          <Search size={17} aria-hidden="true" />
          Tìm xe
        </button>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        Bàn giao hỗ trợ {HANDOVER_POLICY.supportedFrom}–
        {HANDOVER_POLICY.supportedUntil}. Khung giờ tiêu chuẩn{" "}
        {HANDOVER_POLICY.standardFrom}–{HANDOVER_POLICY.standardUntil}; ngoài
        khung giờ này có phụ phí và được hiển thị trước khi đặt.
      </p>
      <p className="pt-[11px] text-[9px] leading-[13.5px] text-[#9aa3b4]">
        Khung giờ từ 06:00–22:00. Không phát sinh chi phí phụ khi đặt trực tiếp.
      </p>
    </form>
  );
}
