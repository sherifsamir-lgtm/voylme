"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Bookmark,
  ChevronRight,
  CircleHelp,
  Globe2,
  LogIn,
  LogOut,
  Menu,
  PlaneTakeoff,
  Settings,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";

type VoylmeUser = {
  name: string;
  email?: string;
  photo?: string;
  membership?: string;
};

const menuItems = [
  { label: "My Account", icon: UserRound },
  { label: "My Trips", icon: PlaneTakeoff },
  { label: "Saved", icon: Bookmark },
  { label: "Rewards & Wallet", icon: WalletCards },
  { label: "Notifications", icon: Bell },
  { label: "Support Center", icon: CircleHelp },
  { label: "Settings", icon: Settings },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<VoylmeUser | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("voylme-user");
      if (stored) setUser(JSON.parse(stored));
    } catch {
      localStorage.removeItem("voylme-user");
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const name = user?.name || "Guest User";
  const membership =
    user?.membership || (user ? "Voylme Explorer" : "Welcome to Voylme");

  return (
    <>
      <header className="z-50 bg-white px-3 py-2 shadow-sm">
        <div className="flex h-[60px] items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[31px] font-black leading-none tracking-[-0.04em] text-[#660033]">
              Voylme
            </p>

            <p className="mt-1 whitespace-nowrap text-[9px] font-bold tracking-[0.03em] text-gray-500">
              Your Personal Travel Assistant
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              className="flex h-9 items-center gap-1 rounded-full border border-[#660033]/20 px-2.5 text-[11px] font-extrabold text-[#660033]"
            >
              <Globe2 size={17} strokeWidth={1.8} />
              EN
            </button>

            <button
              type="button"
              className="h-9 rounded-full border border-[#660033]/20 px-2.5 text-[11px] font-extrabold text-[#660033]"
            >
              AED
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#660033]/25 bg-[#fff4f8] text-[#660033]"
              aria-label="Open menu"
            >
              {user?.photo ? (
                <img
                  src={user.photo}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : user ? (
                <span className="text-[11px] font-black">
                  {initials(name)}
                </span>
              ) : (
                <Menu size={19} />
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[10000]">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/45"
            aria-label="Close menu"
          />

          <aside className="absolute right-0 top-0 flex h-full w-[88%] max-w-[365px] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4">
              <p className="text-[13px] font-black text-[#660033]">
                Voylme Account
              </p>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="flex items-center gap-4 border-y border-gray-100 px-5 py-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#660033] bg-[#fff3f8] text-[#660033]">
                {user?.photo ? (
                  <img
                    src={user.photo}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                ) : user ? (
                  <span className="text-xl font-black">
                    {initials(name)}
                  </span>
                ) : (
                  <UserRound size={29} />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-lg font-black">{name}</p>
                <p className="mt-1 truncate text-xs font-bold text-[#8b6400]">
                  {membership}
                </p>
                {user?.email && (
                  <p className="mt-1 truncate text-[11px] text-gray-500">
                    {user.email}
                  </p>
                )}
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-2">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    type="button"
                    className="flex h-[50px] w-full items-center gap-3 rounded-xl px-3 text-left active:bg-gray-100"
                  >
                    <Icon size={20} className="text-[#660033]" />
                    <span className="flex-1 text-sm font-semibold">
                      {item.label}
                    </span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                );
              })}

              <button
                type="button"
                className="mt-1 flex h-[50px] w-full items-center gap-3 rounded-xl px-3 text-left font-extrabold text-[#660033]"
              >
                {user ? <LogOut size={20} /> : <LogIn size={20} />}
                {user ? "Sign Out" : "Sign In / Create Account"}
              </button>
            </nav>

            <div className="border-t border-gray-100 px-5 py-3 text-center">
              <p className="text-[10px] font-bold text-gray-400">
                Voylme v0.1.0 Beta
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
