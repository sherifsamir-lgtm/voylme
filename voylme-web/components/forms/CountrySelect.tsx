"use client";

import { passportCountryOptions } from "@/data/countries";

type CountrySelectProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
};

export default function CountrySelect({
  value,
  onChange,
  className = "",
  placeholder = "Select country",
}: CountrySelectProps) {
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
      <option value="">{placeholder}</option>

      {passportCountryOptions.map((country) => (
        <option key={country.value} value={country.value}>
          {country.label}
        </option>
      ))}
    </select>
  );
}
