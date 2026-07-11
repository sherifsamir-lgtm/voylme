"use client";

import { phoneCountryOptions } from "@/data/countries";

type PhoneCodeSelectProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function PhoneCodeSelect({
  value,
  onChange,
  className = "",
}: PhoneCodeSelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={[
        "h-[52px] w-full rounded-[16px] border border-gray-200 bg-white px-3",
        "text-[13px] outline-none transition",
        "focus:border-[#660033] focus:ring-2 focus:ring-[#660033]/10",
        className,
      ].join(" ")}
    >
      {phoneCountryOptions.map((country) => (
        <option key={country.value} value={country.value}>
          {country.label}
        </option>
      ))}
    </select>
  );
}
