"use client";

import {
  Check,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selected =
    phoneCountryOptions.find(
      (item) => item.value === value,
    ) || phoneCountryOptions[0];

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return phoneCountryOptions.slice(0, 80);
    }

    return phoneCountryOptions
      .filter((item) =>
        [
          item.name,
          item.value,
          item.dialCode,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized),
      )
      .slice(0, 80);
  }, [query]);

  useEffect(() => {
    function close(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", close);

    return () =>
      document.removeEventListener(
        "mousedown",
        close,
      );
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className}`}
    >
      <button
        type="button"
        onClick={() => {
          setOpen((current) => !current);
          setQuery("");
        }}
        className="flex h-[52px] w-full items-center justify-between gap-1 rounded-[16px] border border-gray-200 bg-white px-3 outline-none transition focus:border-[#660033] focus:ring-2 focus:ring-[#660033]/10"
      >
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="text-[18px]">
            {selected?.flag || "🌍"}
          </span>

          <span className="truncate text-[12px] font-extrabold text-slate-800">
            {selected?.dialCode || "+971"}
          </span>
        </span>

        <ChevronDown
          size={14}
          className="shrink-0 text-gray-400"
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-[350] mt-1 w-[285px] overflow-hidden rounded-[18px] border border-gray-200 bg-white shadow-2xl">
          <div className="border-b border-gray-100 p-2">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#660033]"
              />

              <input
                autoFocus
                inputMode="search"
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Country or phone code"
                className="h-11 w-full rounded-[12px] border border-gray-200 bg-[#faf8f9] pl-9 pr-9 text-[12px] font-semibold outline-none focus:border-[#660033]"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-gray-400"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-[250px] overflow-y-auto p-1.5">
            {filtered.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left active:bg-[#fff0f6]"
              >
                <span className="text-[18px]">
                  {item.flag}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-bold text-slate-800">
                    {item.name}
                  </span>

                  <span className="block text-[10px] font-extrabold text-[#660033]">
                    {item.dialCode}
                  </span>
                </span>

                {value === item.value && (
                  <Check
                    size={16}
                    className="text-[#660033]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
