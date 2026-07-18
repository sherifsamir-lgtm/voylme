"use client";

import { useEffect, useState } from "react";

import Header from "@/components/homepage-v3/Header";
import Hero from "@/components/homepage-v3/Hero";
import Services from "@/components/homepage-v3/Services";
import {
  type V3Currency,
  type V3Language,
} from "@/components/homepage-v3/content";

const LANGUAGE_KEY = "voylme-language";
const CURRENCY_KEY = "voylme-currency";

export default function SearchV3Page() {
  const [language, setLanguage] =
    useState<V3Language>("en");

  const [currency, setCurrency] =
    useState<V3Currency>("AED");

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedLanguage =
      window.localStorage.getItem(LANGUAGE_KEY);

    const storedCurrency =
      window.localStorage.getItem(CURRENCY_KEY);

    if (
      storedLanguage === "en" ||
      storedLanguage === "ar"
    ) {
      setLanguage(storedLanguage);
    }

    if (
      storedCurrency === "AED" ||
      storedCurrency === "USD"
    ) {
      setCurrency(storedCurrency);
    }

    setReady(true);
  }, []);

  function handleLanguageChange(
    value: V3Language,
  ) {
    setLanguage(value);
    window.localStorage.setItem(
      LANGUAGE_KEY,
      value,
    );
  }

  function handleCurrencyChange(
    value: V3Currency,
  ) {
    setCurrency(value);
    window.localStorage.setItem(
      CURRENCY_KEY,
      value,
    );
  }

  if (!ready) {
    return (
      <main className="v3-loading-screen">
        <div className="v3-loading-mark">
          VOYLME
        </div>
      </main>
    );
  }

  return (
    <main
      className="v3-homepage"
      dir={language === "ar" ? "rtl" : "ltr"}
      lang={language}
    >
      <Header
        language={language}
        currency={currency}
        onLanguageChange={handleLanguageChange}
        onCurrencyChange={handleCurrencyChange}
      />

      <Hero language={language} />
      <Services language={language} />
    </main>
  );
}
