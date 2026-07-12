"use client";

import { Minus, Plus, UsersRound, X } from "lucide-react";

export type PassengerState = {
  adults: number;
  children: number;
  infants: number;
};

type PassengerSelectorProps = {
  value: PassengerState;
  open: boolean;
  error?: string;
  onOpen: () => void;
  onClose: () => void;
  onChange: (value: PassengerState) => void;
};

type PassengerKey = keyof PassengerState;

const passengerRows: Array<{
  key: PassengerKey;
  title: string;
  subtitle: string;
}> = [
  {
    key: "adults",
    title: "Adults",
    subtitle: "12 years and above",
  },
  {
    key: "children",
    title: "Children",
    subtitle: "2–11 years",
  },
  {
    key: "infants",
    title: "Infants",
    subtitle: "Under 2 years",
  },
];

function totalPassengers(value: PassengerState) {
  return value.adults + value.children + value.infants;
}

function passengerDetails(value: PassengerState) {
  const parts = [
    `${value.adults} Adult${value.adults === 1 ? "" : "s"}`,
  ];

  if (value.children > 0) {
    parts.push(
      `${value.children} Child${value.children === 1 ? "" : "ren"}`
    );
  }

  if (value.infants > 0) {
    parts.push(
      `${value.infants} Infant${value.infants === 1 ? "" : "s"}`
    );
  }

  return parts.join(" · ");
}

export default function PassengerSelector({
  value,
  open,
  error,
  onOpen,
  onClose,
  onChange,
}: PassengerSelectorProps) {
  const total = totalPassengers(value);

  function updatePassenger(
    key: PassengerKey,
    action: "increase" | "decrease"
  ) {
    const next = { ...value };

    if (action === "increase") {
      if (total >= 9) return;

      if (key === "infants" && value.infants >= value.adults) {
        return;
      }

      next[key] += 1;
    }

    if (action === "decrease") {
      if (key === "adults") {
        if (value.adults <= 1) return;

        next.adults -= 1;

        if (next.infants > next.adults) {
          next.infants = next.adults;
        }
      } else {
        if (value[key] <= 0) return;
        next[key] -= 1;
      }
    }

    onChange(next);
  }

  return (
    <div className="min-w-0">
      <label className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-gray-500">
        Passengers
      </label>

      <button
        type="button"
        onClick={onOpen}
        className={`flex min-h-[76px] w-full min-w-0 items-center gap-3 rounded-[20px] border bg-white px-3 text-left ${
          error ? "border-red-500" : "border-gray-200"
        }`}
      >
        <UsersRound
          size={22}
          className="shrink-0 text-[#660033]"
        />

        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-extrabold">
            {total} {total === 1 ? "Passenger" : "Passengers"}
          </span>

          <span className="mt-1 block truncate text-xs text-gray-500">
            {passengerDetails(value)}
          </span>
        </span>
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
            aria-label="Close passenger selector"
            onClick={onClose}
            className="absolute inset-0"
          />

          <div className="relative z-10 mx-auto w-full max-w-[430px] rounded-t-[30px] bg-white px-5 pb-7 pt-4 shadow-2xl">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-gray-300" />

            <div className="mt-5 flex items-center justify-between">
              <div>
                <h2 className="text-[22px] font-extrabold">
                  Passengers
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Maximum 9 passengers
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

            <div className="mt-6 divide-y divide-gray-100">
              {passengerRows.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-5"
                >
                  <div>
                    <p className="font-extrabold">{item.title}</p>

                    <p className="mt-1 text-sm text-gray-500">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        updatePassenger(item.key, "decrease")
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-[#660033]"
                    >
                      <Minus size={19} />
                    </button>

                    <span className="w-5 text-center text-lg font-extrabold">
                      {value[item.key]}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updatePassenger(item.key, "increase")
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#660033] text-white"
                    >
                      <Plus size={19} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-2 rounded-[17px] bg-[#fff6fa] px-4 py-3 text-xs leading-5 text-[#660033]">
              The number of infants cannot exceed the number of adults.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 min-h-[60px] w-full rounded-[20px] bg-[#660033] text-base font-extrabold text-white"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
