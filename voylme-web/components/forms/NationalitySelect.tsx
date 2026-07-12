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
import {
  countries,
  nationalityOptions,
} from "@/data/countries";

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selected = useMemo(() => {
    const nationality = nationalityOptions.find(
      (item) => item.value === value,
    );

    if (!nationality) return null;

    const country = countries.find(
      (item) => item.iso2 === nationality.iso2,
    );

    return {
      ...nationality,
      flag: country?.flag ?? "",
    };
  }, [value]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return nationalityOptions.slice(0, 80);
    }

    return nationalityOptions
      .filter((item) =>
        [
          item.label,
          item.countryName,
          item.iso2,
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
        className="flex h-[52px] w-full items-center gap-3 rounded-[16px] border border-gray-200 bg-white px-4 text-left outline-none transition focus:border-[#660033] focus:ring-2 focus:ring-[#660033]/10"
      >
        <span className="text-[18px]">
          {selected?.flag || "🌍"}
        </span>

        <span
          className={`min-w-0 flex-1 truncate text-[13px] font-semibold ${
            selected
              ? "text-slate-800"
              : "text-gray-400"
          }`}
        >
          {selected?.label ||
            "Select nationality"}
        </span>

        <ChevronDown
          size={16}
          className="shrink-0 text-gray-400"
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-[300] mt-1 overflow-hidden rounded-[18px] border border-gray-200 bg-white shadow-2xl">
          <div className="border-b border-gray-100 p-2">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#660033]"
              />

              <input
                autoFocus
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Search nationality"
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
            {filtered.length > 0 ? (
              filtered.map((item) => {
                const country = countries.find(
                  (entry) =>
                    entry.iso2 === item.iso2,
                );

                return (
                  <button
                    key={`${item.value}-${item.iso2}`}
                    type="button"
                    onClick={() => {
                      onChange(item.value);
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left active:bg-[#fff0f6]"
                  >
                    <span className="text-[18px]">
                      {country?.flag || "🌍"}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12px] font-bold text-slate-800">
                        {item.label}
                      </span>

                      <span className="block truncate text-[9px] text-gray-500">
                        {item.countryName}
                      </span>
                    </span>

                    {value === item.value && (
                      <Check
                        size={16}
                        className="text-[#660033]"
                      />
                    )}
                  </button>
                );
              })
            ) : (
              <p className="px-3 py-5 text-center text-[11px] text-gray-500">
                No nationality found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
