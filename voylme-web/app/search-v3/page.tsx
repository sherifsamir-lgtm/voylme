"use client";

import { useEffect, useState } from "react";

import AppDownload from "@/components/homepage-clean/AppDownload";
import Footer from "@/components/homepage-clean/Footer";
import Header from "@/components/homepage-clean/Header";
import Offers from "@/components/homepage-clean/Offers";
import PopularDestinations from "@/components/homepage-clean/PopularDestinations";
import SearchForm from "@/components/homepage-clean/SearchForm";
import Services from "@/components/homepage-clean/Services";
import TravelPartners from "@/components/homepage-clean/TravelPartners";
import WhyVoylme from "@/components/homepage-clean/WhyVoylme";

import type {
  V3Currency,
  V3Language,
} from "@/components/homepage-clean/content";

const LANGUAGE_KEY = "voylme-language";
const CURRENCY_KEY = "voylme-currency";

export default function SearchV3Page() {
  const [language, setLanguage] =
    useState<V3Language>("en");

  const [currency, setCurrency] =
    useState<V3Currency>("USD");

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
  }, []);

  function handleLanguageChange(
    value: V3Language,
  ) {
    setLanguage(value);
    window.localStorage.setItem(
      LANGUAGE_KEY,
      value,
    );

    document.documentElement.lang = value;
    document.documentElement.dir =
      value === "ar" ? "rtl" : "ltr";
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

  return (
    <main
      dir={language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen overflow-x-hidden bg-white text-gray-950"
    >
      <Header
        language={language}
        currency={currency}
        onLanguageChange={handleLanguageChange}
        onCurrencyChange={handleCurrencyChange}
      />

      <Services language={language} />

      <div className="relative z-30 -mt-3 bg-white px-4 pb-4 pt-6 sm:px-8">
        <SearchForm language={language} />
      </div>

      <Offers language={language} />
      <WhyVoylme language={language} />
      <PopularDestinations language={language} />
      <TravelPartners language={language} />
      <AppDownload language={language} />

      <Footer
        language={language}
        currency={currency}
      />
    </main>
  );
}
