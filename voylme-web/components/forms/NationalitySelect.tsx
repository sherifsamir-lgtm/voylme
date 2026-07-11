"use client";

import { nationalityOptions } from "@/data/countries";

type NationalitySelectProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function NationalitySelect({
  value,
  onChange,
  className = "",
}: NationalitySelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={[
        "h-[52px] w-full appearance-none rounded-[16px] border border-gray-200 bg-white px-4",
        "text-[14px] outline-none transition",
        "focus:border-[#660033] focus:ring-2 focus:ring-[#660033]/10",
        className,
      ].join(" ")}
    >
      <option value="">Select nationality</option>

      {nationalityOptions.map((nationality) => (
        <option
          key={`${nationality.value}-${nationality.iso2}`}
          value={nationality.value}
        >
          {nationality.label}
        </option>
      ))}
    </select>
  );
}
