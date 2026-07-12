"use client";

import { Check, ChevronDown, Plane, X } from "lucide-react";

export type CabinClass =
  | "Economy"
  | "Premium Economy"
  | "Business"
  | "First";

type CabinClassSelectorProps = {
  value: CabinClass;
  open: boolean;
  error?: string;
  onOpen: () => void;
  onClose: () => void;
  onChange: (value: CabinClass) => void;
};

const cabinClasses: Array<{
  value: CabinClass;
  title: string;
  subtitle: string;
}> = [
  {
    value: "Economy",
    title: "Economy",
    subtitle: "Best value for everyday travel",
  },
  {
    value: "Premium Economy",
    title: "Premium Economy",
    subtitle: "More comfort and extra space",
  },
  {
    value: "Business",
    title: "Business",
    subtitle: "Premium service and lounge access",
  },
  {
    value: "First",
    title: "First",
    subtitle: "Highest level of comfort and privacy",
  },
];

export default function CabinClassSelector({
  value,
  open,
  error,
  onOpen,
  onClose,
  onChange,
}: CabinClassSelectorProps) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-gray-500">
        Cabin Class
      </label>

      <button
        type="button"
        onClick={onOpen}
        className={`flex min-h-[76px] w-full min-w-0 items-center gap-3 rounded-[20px] border bg-white px-3 text-left ${
          error ? "border-red-500" : "border-gray-200"
        }`}
      >
        <Plane
          size={22}
          className="shrink-0 text-[#660033]"
        />

        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-extrabold">
            {value}
          </span>

          <span className="mt-1 block truncate text-xs text-gray-500">
            Select travel class
          </span>
        </span>

        <ChevronDown
          size={18}
          className="shrink-0 text-gray-400"
        />
      </button>

      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-end bg-black/45">
          <button
            type="button"
            aria-label="Close cabin class selector"
            onClick={onClose}
            className="absolute inset-0"
          />

          <div className="relative z-10 mx-auto w-full max-w-[430px] rounded-t-[30px] bg-white px-5 pb-7 pt-4 shadow-2xl">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-gray-300" />

            <div className="mt-5 flex items-center justify-between">
              <div>
                <h2 className="text-[22px] font-extrabold">
                  Cabin Class
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Select your preferred travel class
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {cabinClasses.map((item) => {
                const selected = item.value === value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      onChange(item.value);
                      onClose();
                    }}
                    className={`flex min-h-[82px] w-full items-center justify-between gap-4 rounded-[20px] border px-4 text-left ${
                      selected
                        ? "border-[#660033] bg-[#fff6fa]"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-extrabold ${
                          selected
                            ? "text-[#660033]"
                            : "text-gray-900"
                        }`}
                      >
                        {item.title}
                      </span>

                      <span className="mt-1 block text-sm leading-5 text-gray-500">
                        {item.subtitle}
                      </span>
                    </span>

                    {selected && (
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#660033] text-white">
                        <Check size={18} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
