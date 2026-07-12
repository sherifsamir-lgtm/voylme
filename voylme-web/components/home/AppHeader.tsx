"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Bookmark,
  ChevronRight,
  CircleHelp,
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

type Language = {
  code: string;
  flag: string;
};

type Currency = {
  code: string;
  flag: string;
};

const languages: Language[] = [
  { code: "EN", flag: "🇬🇧" },
  { code: "AR", flag: "🇦🇪" },
  { code: "FR", flag: "🇫🇷" },
  { code: "DE", flag: "🇩🇪" },
  { code: "ES", flag: "🇪🇸" },
  { code: "IT", flag: "🇮🇹" },
  { code: "TR", flag: "🇹🇷" },
  { code: "RU", flag: "🇷🇺" },
  { code: "ZH", flag: "🇨🇳" },
];

const currencies: Currency[] = [
  { code: "AED", flag: "🇦🇪" },
  { code: "USD", flag: "🇺🇸" },
  { code: "EUR", flag: "🇪🇺" },
  { code: "GBP", flag: "🇬🇧" },
  { code: "SAR", flag: "🇸🇦" },
  { code: "QAR", flag: "🇶🇦" },
  { code: "KWD", flag: "🇰🇼" },
  { code: "BHD", flag: "🇧🇭" },
  { code: "OMR", flag: "🇴🇲" },
  { code: "EGP", flag: "🇪🇬" },
];

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
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [currency, setCurrency] = useState<Currency>(currencies[0]);
  const [user, setUser] = useState<VoylmeUser | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("voylme-user");
      const storedLanguage = localStorage.getItem("voylme-language");
      const storedCurrency = localStorage.getItem("voylme-currency");

      if (storedUser) {
        setUser(JSON.parse(storedUser) as VoylmeUser);
      }

      if (storedLanguage) {
        const match = languages.find(
          (item) => item.code === storedLanguage
        );
        if (match) setLanguage(match);
      }

      if (storedCurrency) {
        const match = currencies.find(
          (item) => item.code === storedCurrency
        );
        if (match) setCurrency(match);
      }
    } catch {
      localStorage.removeItem("voylme-user");
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setLanguageOpen(false);
        setCurrencyOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const displayName = user?.name || "Guest User";
  const membership =
    user?.membership || (user ? "Voylme Explorer" : "Welcome to Voylme");

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div
          ref={headerRef}
          className="relative mx-auto flex h-[70px] w-full max-w-[430px] items-center justify-between gap-2 px-3"
        >
          <div className="min-w-0 flex-1">
            <p className="text-[31px] font-black leading-none tracking-[-0.04em] text-[#660033]">
              Voylme
            </p>

            <p className="mt-1 whitespace-nowrap text-[9px] font-bold tracking-[0.02em] text-gray-500">
              Your Personal Travel Assistant
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLanguageOpen((current) => !current);
                  setCurrencyOpen(false);
                }}
                className="flex h-9 items-center gap-1 rounded-full border border-[#660033]/20 bg-white px-2.5 text-[11px] font-extrabold text-[#660033]"
              >
                <span className="text-[16px] leading-none">
                  {language.flag}
                </span>
                {language.code}
              </button>

              {languageOpen && (
                <div className="absolute right-0 top-11 z-[200] grid w-[178px] grid-cols-3 gap-1.5 rounded-[17px] border border-gray-200 bg-white p-2 shadow-xl">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => {
                        setLanguage(item);
                        setLanguageOpen(false);
                        localStorage.setItem(
                          "voylme-language",
                          item.code
                        );
                      }}
                      className={`flex h-11 flex-col items-center justify-center rounded-[11px] text-[10px] font-black ${
                        item.code === language.code
                          ? "bg-[#660033] text-white"
                          : "bg-[#faf7f9] text-[#660033]"
                      }`}
                    >
                      <span className="text-[17px]">{item.flag}</span>
                      {item.code}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCurrencyOpen((current) => !current);
                  setLanguageOpen(false);
                }}
                className="h-9 rounded-full border border-[#660033]/20 bg-white px-2.5 text-[11px] font-extrabold text-[#660033]"
              >
                {currency.code}
              </button>

              {currencyOpen && (
                <div className="absolute right-0 top-11 z-[200] grid w-[194px] grid-cols-2 gap-1.5 rounded-[17px] border border-gray-200 bg-white p-2 shadow-xl">
                  {currencies.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => {
                        setCurrency(item);
                        setCurrencyOpen(false);
                        localStorage.setItem(
                          "voylme-currency",
                          item.code
                        );
                      }}
                      className={`flex h-10 items-center justify-center gap-1.5 rounded-[11px] text-[10px] font-black ${
                        item.code === currency.code
                          ? "bg-[#660033] text-white"
                          : "bg-[#faf7f9] text-[#660033]"
                      }`}
                    >
                      <span className="text-[15px]">{item.flag}</span>
                      {item.code}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(true);
                setLanguageOpen(false);
                setCurrencyOpen(false);
              }}
              className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#660033]/25 bg-[#fff4f8] text-[#660033]"
            >
              {user?.photo ? (
                <img
                  src={user.photo}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : user ? (
                <span className="text-[11px] font-black">
                  {initials(displayName)}
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
          />

          <aside className="absolute right-0 top-0 flex h-full w-[88%] max-w-[365px] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <p className="text-[15px] font-black text-[#660033]">
                Voylme Account
              </p>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center gap-4 border-b border-gray-100 px-5 py-5">
              <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-[#660033] bg-[#fff3f8] text-[#660033]">
                {user?.photo ? (
                  <img
                    src={user.photo}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : user ? (
                  <span className="text-xl font-black">
                    {initials(displayName)}
                  </span>
                ) : (
                  <UserRound size={31} />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-[20px] font-black text-slate-900">
                  {displayName}
                </p>

                <p className="mt-1 truncate text-[13px] font-bold text-[#8b6400]">
                  {membership}
                </p>

                {user?.email && (
                  <p className="mt-1 truncate text-[11px] text-gray-500">
                    {user.email}
                  </p>
                )}
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-3">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    type="button"
                    className="flex h-[52px] w-full items-center gap-3 rounded-[14px] px-3 text-left active:bg-gray-100"
                  >
                    <Icon size={21} className="text-[#660033]" />

                    <span className="flex-1 text-[15px] font-semibold text-slate-800">
                      {item.label}
                    </span>

                    <ChevronRight
                      size={17}
                      className="text-gray-400"
                    />
                  </button>
                );
              })}

              <button
                type="button"
                className="mt-2 flex h-[52px] w-full items-center gap-3 rounded-[14px] px-3 text-left font-extrabold text-[#660033]"
              >
                {user ? <LogOut size={21} /> : <LogIn size={21} />}
                {user ? "Sign Out" : "Sign In / Create Account"}
              </button>
            </nav>

            <footer className="border-t border-gray-100 px-5 py-4 text-center">
              <p className="text-[10px] font-bold text-gray-400">
                Voylme v0.1.0 Beta
              </p>
            </footer>
          </aside>
        </div>
      )}
    </>
  );
}
