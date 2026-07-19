"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type LanguageCode = "en" | "ar";
type CurrencyCode = "AED" | "USD";
type OpenPanel = "language" | "currency" | "notifications" | "menu" | null;

type HeaderProps = {
  language?: LanguageCode;
  currency?: CurrencyCode;
  onLanguageChange?: (value: LanguageCode) => void;
  onCurrencyChange?: (value: CurrencyCode) => void;
};

const languages: Array<{
  code: LanguageCode;
  shortLabel: string;
  label: string;
  nativeLabel: string;
}> = [
  {
    code: "en",
    shortLabel: "EN",
    label: "English",
    nativeLabel: "English",
  },
  {
    code: "ar",
    shortLabel: "AR",
    label: "Arabic",
    nativeLabel: "العربية",
  },
];

const currencies: Array<{
  code: CurrencyCode;
  label: string;
  icon: string;
}> = [
  {
    code: "AED",
    label: "UAE Dirham",
    icon: "/assets/icons/header/icon-currency-aed.png",
  },
  {
    code: "USD",
    label: "US Dollar",
    icon: "/assets/icons/header/icon-currency-dollar.png",
  },
];

const menuItems = [
  {
    href: "/account",
    labelEn: "My Account",
    labelAr: "حسابي",
    icon: "/assets/icons/account/icon-account.png",
  },
  {
    href: "/account/trips",
    labelEn: "My Trips",
    labelAr: "رحلاتي",
    icon: "/assets/icons/account/icon-my-trips.png",
  },
  {
    href: "/account/saved",
    labelEn: "Saved",
    labelAr: "المحفوظات",
    icon: "/assets/icons/account/icon-saved.png",
  },
  {
    href: "/account/rewards",
    labelEn: "Rewards & Wallet",
    labelAr: "المكافآت والمحفظة",
    icon: "/assets/icons/account/icon-rewards-wallet.png",
  },
  {
    href: "/support",
    labelEn: "Support Center",
    labelAr: "مركز الدعم",
    icon: "/assets/icons/account/icon-support.png",
  },
  {
    href: "/account/settings",
    labelEn: "Settings",
    labelAr: "الإعدادات",
    icon: "/assets/icons/account/icon-settings.png",
  },
];

export default function Header({
  language: controlledLanguage,
  currency: controlledCurrency,
  onLanguageChange,
  onCurrencyChange,
}: HeaderProps = {}) {
  const [language, setLanguage] = useState<LanguageCode>(
    controlledLanguage ?? "en",
  );
  const [currency, setCurrency] = useState<CurrencyCode>(
    controlledCurrency ?? "AED",
  );
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  const isArabic = language === "ar";

  useEffect(() => {
    if (controlledLanguage) {
      setLanguage(controlledLanguage);
    }
  }, [controlledLanguage]);

  useEffect(() => {
    if (controlledCurrency) {
      setCurrency(controlledCurrency);
    }
  }, [controlledCurrency]);

  useEffect(() => {
    const storedLanguage = localStorage.getItem(
      "voylme-language",
    ) as LanguageCode | null;

    const storedCurrency = localStorage.getItem(
      "voylme-currency",
    ) as CurrencyCode | null;

    const storedUser = localStorage.getItem("voylme-user");

    if (storedLanguage === "en" || storedLanguage === "ar") {
      setLanguage(storedLanguage);
    }

    if (storedCurrency === "AED" || storedCurrency === "USD") {
      setCurrency(storedCurrency);
    }

    setIsSignedIn(Boolean(storedUser));
  }, []);

  useEffect(() => {
    const closePanels = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpenPanel(null);
      }
    };

    document.addEventListener("mousedown", closePanels);

    return () => {
      document.removeEventListener("mousedown", closePanels);
    };
  }, []);

  const togglePanel = (panel: Exclude<OpenPanel, null>) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  const changeLanguage = (code: LanguageCode) => {
    setLanguage(code);
    onLanguageChange?.(code);
    localStorage.setItem("voylme-language", code);

    document.documentElement.lang = code;
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";

    window.dispatchEvent(
      new CustomEvent("voylme-language-change", {
        detail: { language: code },
      }),
    );

    setOpenPanel(null);
  };

  const changeCurrency = (code: CurrencyCode) => {
    setCurrency(code);
    onCurrencyChange?.(code);
    localStorage.setItem("voylme-currency", code);

    window.dispatchEvent(
      new CustomEvent("voylme-currency-change", {
        detail: { currency: code },
      }),
    );

    setOpenPanel(null);
  };

  const handleAuthentication = () => {
    if (isSignedIn) {
      localStorage.removeItem("voylme-user");
      setIsSignedIn(false);
      setOpenPanel(null);
      window.location.href = "/";
      return;
    }

    setOpenPanel(null);
    window.location.href = "/account/login";
  };

  const selectedCurrency =
    currencies.find((item) => item.code === currency) ?? currencies[0];

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-[5000] w-full border-b border-white/10 bg-[#660033] shadow-[0_6px_24px_rgba(47,0,25,0.18)]"
      dir="ltr"
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between gap-2 px-3 sm:h-[80px] sm:px-5 lg:px-8">
        <Link
          href="/"
          aria-label="VOYLME Home"
          className="relative flex min-w-0 shrink items-center"
        >
          <Image
            src="/assets/brand/logo-voylme-white.png"
            alt="VOYLME"
            width={270}
            height={86}
            priority
            className="h-auto w-[146px] object-contain sm:w-[185px] lg:w-[220px]"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="relative">
            <button
              type="button"
              aria-label={isArabic ? "اختيار اللغة" : "Select language"}
              aria-expanded={openPanel === "language"}
              onClick={() => togglePanel("language")}
              className="flex h-10 min-w-[50px] items-center justify-center gap-1 rounded-full border border-white/25 bg-white/10 px-2 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] sm:h-11 sm:min-w-[66px] sm:px-3"
            >
              <Image
                src="/assets/icons/header/icon-language.png"
                alt=""
                width={24}
                height={24}
                className="h-[21px] w-[21px] object-contain sm:h-6 sm:w-6"
              />

              <span className="hidden text-[12px] font-extrabold sm:inline">
                {language === "ar" ? "AR" : "EN"}
              </span>
            </button>

            {openPanel === "language" && (
              <div
                className="absolute right-0 top-[48px] z-[5100] w-[210px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl sm:top-[52px]"
                dir={isArabic ? "rtl" : "ltr"}
              >
                <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                  {isArabic ? "اختر اللغة" : "Select language"}
                </p>

                {languages.map((item) => {
                  const selected = item.code === language;

                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => changeLanguage(item.code)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm transition ${
                        selected
                          ? "bg-[#660033]/10 font-extrabold text-[#660033]"
                          : "font-semibold text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{item.nativeLabel}</span>

                      <span
                        className={`flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-[11px] font-black ${
                          selected
                            ? "bg-[#660033] text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {item.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label={isArabic ? "اختيار العملة" : "Select currency"}
              aria-expanded={openPanel === "currency"}
              onClick={() => togglePanel("currency")}
              className="flex h-10 min-w-[50px] items-center justify-center gap-1 rounded-full border border-white/25 bg-white/10 px-2 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] sm:h-11 sm:min-w-[76px] sm:px-3"
            >
              <Image
                src={selectedCurrency.icon}
                alt=""
                width={24}
                height={24}
                className="h-[22px] w-[22px] object-contain sm:h-6 sm:w-6"
              />

              <span className="hidden text-[12px] font-extrabold sm:inline">
                {currency}
              </span>
            </button>

            {openPanel === "currency" && (
              <div
                className="absolute right-0 top-[48px] z-[5100] w-[230px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl sm:top-[52px]"
                dir={isArabic ? "rtl" : "ltr"}
              >
                <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                  {isArabic ? "اختر العملة" : "Select currency"}
                </p>

                {currencies.map((item) => {
                  const selected = item.code === currency;

                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => changeCurrency(item.code)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                        selected
                          ? "bg-[#660033]/10 text-[#660033]"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50">
                        <Image
                          src={item.icon}
                          alt=""
                          width={27}
                          height={27}
                          className="h-[27px] w-[27px] object-contain"
                        />
                      </span>

                      <span className="min-w-0 flex-1 text-start">
                        <span className="block font-extrabold">
                          {item.code}
                        </span>

                        <span className="block truncate text-[11px] font-medium text-gray-500">
                          {item.label}
                        </span>
                      </span>

                      {selected && (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#D4AF37]" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label={isArabic ? "الإشعارات" : "Notifications"}
              aria-expanded={openPanel === "notifications"}
              onClick={() => togglePanel("notifications")}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] sm:h-11 sm:w-11"
            >
              <Image
                src="/assets/icons/header/icon-notifications.png"
                alt=""
                width={25}
                height={25}
                className="h-[23px] w-[23px] object-contain sm:h-[25px] sm:w-[25px]"
              />

              <span className="absolute right-[5px] top-[5px] h-2.5 w-2.5 rounded-full border-2 border-[#660033] bg-[#D4AF37]" />
            </button>

            {openPanel === "notifications" && (
              <div
                className="absolute right-0 top-[48px] z-[5100] w-[290px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:top-[52px] sm:w-[330px]"
                dir={isArabic ? "rtl" : "ltr"}
              >
                <div className="border-b border-gray-100 px-4 py-4">
                  <h2 className="text-sm font-extrabold text-[#660033]">
                    {isArabic ? "الإشعارات" : "Notifications"}
                  </h2>
                </div>

                <div className="flex min-h-[150px] flex-col items-center justify-center px-5 py-7 text-center">
                  <Image
                    src="/assets/icons/header/icon-notifications.png"
                    alt=""
                    width={42}
                    height={42}
                    className="mb-3 h-10 w-10 object-contain opacity-45"
                  />

                  <p className="text-sm font-extrabold text-gray-700">
                    {isArabic
                      ? "لا توجد إشعارات جديدة"
                      : "No new notifications"}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {isArabic
                      ? "سنخبرك هنا بأحدث العروض وتحديثات رحلاتك."
                      : "Your latest deals and trip updates will appear here."}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label={isArabic ? "القائمة" : "Menu"}
              aria-expanded={openPanel === "menu"}
              onClick={() => togglePanel("menu")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] sm:h-11 sm:w-11"
            >
              <Image
                src="/assets/icons/header/icon-menu.png"
                alt=""
                width={25}
                height={25}
                className="h-[23px] w-[23px] object-contain sm:h-[25px] sm:w-[25px]"
              />
            </button>

            {openPanel === "menu" && (
              <div
                className="absolute right-0 top-[48px] z-[5100] w-[295px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:top-[52px] sm:w-[320px]"
                dir={isArabic ? "rtl" : "ltr"}
              >
                <div className="bg-gradient-to-br from-[#660033] to-[#420021] px-5 py-5 text-white">
                  <p className="text-xs font-semibold text-white/70">
                    {isArabic ? "مرحبًا بك في" : "Welcome to"}
                  </p>

                  <p className="mt-1 text-xl font-black tracking-wide">
                    VOYLME
                  </p>
                </div>

                <nav className="p-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenPanel(null)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-gray-700 transition hover:bg-[#660033]/[0.06] hover:text-[#660033]"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50">
                        <Image
                          src={item.icon}
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 object-contain"
                        />
                      </span>

                      <span className="flex-1">
                        {isArabic ? item.labelAr : item.labelEn}
                      </span>
                    </Link>
                  ))}
                </nav>

                <div className="border-t border-gray-100 p-3">
                  <button
                    type="button"
                    onClick={handleAuthentication}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#660033] px-4 text-sm font-extrabold text-white transition hover:bg-[#520029]"
                  >
                    <Image
                      src={
                        isSignedIn
                          ? "/assets/icons/account/icon-logout.png"
                          : "/assets/icons/account/icon-login.png"
                      }
                      alt=""
                      width={22}
                      height={22}
                      className="h-[22px] w-[22px] object-contain"
                    />

                    <span>
                      {isSignedIn
                        ? isArabic
                          ? "تسجيل الخروج"
                          : "Sign Out"
                        : isArabic
                          ? "تسجيل الدخول"
                          : "Sign In"}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
