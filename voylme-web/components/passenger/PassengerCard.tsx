"use client";

import { User } from "lucide-react";

export type PassengerType = "adult" | "child" | "infant";

type PassengerCardProps = {
  index: number;
  type: PassengerType;
  expanded: boolean;
  completed?: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

export default function PassengerCard({
  index,
  type,
  expanded,
  completed = false,
  onToggle,
  children,
}: PassengerCardProps) {
  const title =
    type === "adult"
      ? `Adult ${index + 1}`
      : type === "child"
      ? `Child ${index + 1}`
      : `Infant ${index + 1}`;

  return (
    <section className="overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#660033]/10">
            <User size={20} className="text-[#660033]" />
          </div>

          <div>
            <h2 className="text-[15px] font-bold text-slate-900">
              {title}
            </h2>

            <p className="text-[11px] text-gray-500">
              Enter passport details exactly as shown.
            </p>
          </div>
        </div>

        <div
          className={`rounded-full px-3 py-1 text-[11px] font-bold ${
            completed
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {completed ? "Complete" : "Pending"}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 p-4">
          {children}
        </div>
      )}
    </section>
  );
}
