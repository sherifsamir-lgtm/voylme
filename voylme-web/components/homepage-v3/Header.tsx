"use client";

import Image from "next/image";
import {
  Bell,
  Bookmark,
  Check,
  CircleHelp,
  LogIn,
  Menu,
  PlaneTakeoff,
  Settings,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  V3_COPY,
  V3_CURRENCIES,
  V3_LANGUAGES,
  type V3Currency,
  type V3Language,
} from "./content";

type Props = {
  language: V3Language;
  currency: V3Currency;
  onLanguageChange: (value: V3Language) => void;
  onCurrencyChange: (value: V3Currency) => void;
};

type OpenPanel =
  | "language"
  | "currency"
  | "notifications"
  | "account"
  | null;

export default function Header({
  language,
  currency,
  onLanguageChange,
  onCurrencyChange,
}: Props) {
  const copy = V3_COPY[language];
  const isArabic = language === "ar";

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [notificationsRead, setNotificationsRead] =
    useState(false);

  useEffect(() => {
    function closeOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenPanel(null);
      }
    }

    document.addEventListener("mousedown", closeOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        closeOutside,
      );
    };
  }, []);

  function togglePanel(panel: Exclude<OpenPanel, null>) {
    setOpenPanel((current) =>
      current === panel ? null : panel,
    );
  }

  const accountItems = [
    {
      label: copy.menuItems[0],
      icon: UserRound,
    },
    {
      label: copy.menuItems[1],
      icon: PlaneTakeoff,
    },
    {
      label: copy.menuItems[2],
      icon: Bookmark,
    },
    {
      label: copy.menuItems[3],
      icon: WalletCards,
    },
    {
      label: copy.menuItems[5],
      icon: Bell,
    },
    {
      label: copy.menuItems[6],
      icon: CircleHelp,
    },
    {
      label: copy.menuItems[7],
      icon: Settings,
    },
  ];

  return (
    <header className="v3-header">
      <div
        ref={wrapperRef}
        className="v3-header-inner"
        dir="ltr"
      >
        <a
          href="/search-v3"
          className="v3-logo-link"
          aria-label="Voylme homepage"
        >
          <Image
            src="/brand/voylme-logo-clean.png"
            alt="Voylme — Your Personal Travel Assistant"
            width={300}
            height={100}
            priority
            className="v3-logo"
          />
        </a>

        <div className="v3-header-actions">
          <div className="v3-popup-wrap">
            <button
              type="button"
              className="v3-round-button v3-language-button"
              aria-label={copy.languageMenuTitle}
              aria-expanded={openPanel === "language"}
              onClick={() => togglePanel("language")}
            >
              <Image
                src={
                  isArabic
                    ? "/flags/countries/ae.svg"
                    : "/flags/countries/us.svg"
                }
                alt=""
                width={44}
                height={44}
                className="v3-header-flag"
              />
            </button>

            {openPanel === "language" && (
              <div
                className="v3-popup v3-options-popup"
                dir={copy.direction}
              >
                <div className="v3-popup-heading">
                  <strong>
                    {copy.languageMenuTitle}
                  </strong>

                  <button
                    type="button"
                    onClick={() => setOpenPanel(null)}
                    aria-label={
                      isArabic ? "إغلاق" : "Close"
                    }
                  >
                    <X size={18} />
                  </button>
                </div>

                {V3_LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    className="v3-option-row"
                    onClick={() => {
                      onLanguageChange(item.code);
                      setOpenPanel(null);
                    }}
                  >
                    <Image
                      src={item.flag}
                      alt=""
                      width={38}
                      height={38}
                    />

                    <span>{item.name}</span>

                    {language === item.code && (
                      <Check size={19} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="v3-popup-wrap">
            <button
              type="button"
              className="v3-round-button v3-currency-button"
              aria-label={copy.currencyMenuTitle}
              aria-expanded={openPanel === "currency"}
              onClick={() => togglePanel("currency")}
            >
              <span>{currency}</span>
            </button>

            {openPanel === "currency" && (
              <div
                className="v3-popup v3-options-popup"
                dir={copy.direction}
              >
                <div className="v3-popup-heading">
                  <strong>
                    {copy.currencyMenuTitle}
                  </strong>

                  <button
                    type="button"
                    onClick={() => setOpenPanel(null)}
                    aria-label={
                      isArabic ? "إغلاق" : "Close"
                    }
                  >
                    <X size={18} />
                  </button>
                </div>

                {V3_CURRENCIES.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    className="v3-option-row"
                    onClick={() => {
                      onCurrencyChange(item.code);
                      setOpenPanel(null);
                    }}
                  >
                    <Image
                      src={item.flag}
                      alt=""
                      width={38}
                      height={38}
                    />

                    <span className="v3-currency-option">
                      <strong>
                        {item.symbol} · {item.code}
                      </strong>

                      <small>
                        {isArabic
                          ? item.arabicName
                          : item.englishName}
                      </small>
                    </span>

                    {currency === item.code && (
                      <Check size={19} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="v3-popup-wrap">
            <button
              type="button"
              className="v3-round-button v3-notification-button"
              aria-label={copy.notifications}
              aria-expanded={
                openPanel === "notifications"
              }
              onClick={() =>
                togglePanel("notifications")
              }
            >
              <Bell size={21} strokeWidth={2.1} />

              {!notificationsRead && (
                <span className="v3-notification-count">
                  2
                </span>
              )}
            </button>

            {openPanel === "notifications" && (
              <div
                className="v3-popup v3-notifications-popup"
                dir={copy.direction}
              >
                <div className="v3-popup-heading">
                  <strong>{copy.notifications}</strong>

                  <button
                    type="button"
                    onClick={() => setOpenPanel(null)}
                    aria-label={
                      isArabic ? "إغلاق" : "Close"
                    }
                  >
                    <X size={18} />
                  </button>
                </div>

                <article>
                  <strong>
                    {copy.notificationWelcomeTitle}
                  </strong>
                  <p>
                    {copy.notificationWelcomeText}
                  </p>
                </article>

                <article>
                  <strong>
                    {copy.notificationDealsTitle}
                  </strong>
                  <p>{copy.notificationDealsText}</p>
                </article>

                <div className="v3-notification-actions">
                  <button
                    type="button"
                    onClick={() =>
                      setNotificationsRead(true)
                    }
                  >
                    {copy.markAllRead}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setNotificationsRead(true)
                    }
                  >
                    {copy.clearAll}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="v3-popup-wrap">
            <button
              type="button"
              className="v3-round-button"
              aria-label={
                isArabic
                  ? "فتح قائمة الحساب"
                  : "Open account menu"
              }
              aria-expanded={openPanel === "account"}
              onClick={() => togglePanel("account")}
            >
              <Menu size={23} strokeWidth={2.1} />
            </button>

            {openPanel === "account" && (
              <div
                className="v3-popup v3-account-popup"
                dir={copy.direction}
              >
                <div className="v3-account-welcome">
                  <strong>{copy.menuWelcome}</strong>
                  <p>{copy.menuSubtitle}</p>
                </div>

                <nav>
                  {accountItems.map(
                    ({ label, icon: Icon }) => (
                      <button
                        key={label}
                        type="button"
                      >
                        <Icon
                          size={19}
                          strokeWidth={2}
                        />
                        <span>{label}</span>
                      </button>
                    ),
                  )}

                  <button
                    type="button"
                    className="v3-sign-in-button"
                  >
                    <LogIn size={19} />
                    <span>{copy.signIn}</span>
                  </button>
                </nav>

                <small className="v3-version">
                  Voylme v1.0.0
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
