"use client";

import { CalendarDays } from "lucide-react";

type DateSelectorProps = {
  id: string;
  label: string;
  value: string;
  min?: string;
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

function formatDate(value: string) {
  if (!value) return "Select date";

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

export default function DateSelector({
  id,
  label,
  value,
  min,
  error,
  disabled = false,
  onChange,
}: DateSelectorProps) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-gray-500"
      >
        {label}
      </label>

      <label
        htmlFor={id}
        className={`relative flex min-h-[78px] w-full min-w-0 items-center gap-3 overflow-hidden rounded-[20px] border bg-white px-3 transition ${
          disabled
            ? "cursor-not-allowed border-gray-200 bg-gray-100 opacity-60"
            : error
              ? "cursor-pointer border-red-500"
              : "cursor-pointer border-gray-200"
        }`}
      >
        <CalendarDays
          size={21}
          className="shrink-0 text-[#660033]"
        />

        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-extrabold">
            {formatDate(value)}
          </span>
        </span>

        <input
          id={id}
          type="date"
          value={value}
          min={min}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />
      </label>

      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
