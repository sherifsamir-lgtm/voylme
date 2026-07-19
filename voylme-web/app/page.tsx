"use client";

import { useEffect, useState } from "react";

import AppDownload from "@/components/homepage-clean/AppDownload";
import Footer from "@/components/homepage-clean/Footer";
import Header from "@/components/homepage-clean/Header";
import Hero from "@/components/homepage-clean/Hero";
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

export default function HomePage() {
  const [language, setLanguage] = useState<V3Language>("en");
  const [currency, setCurrency] = useState<V3Currency>("USD");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("voylme-language");
    const savedCurrency = window.localStorage.getItem("voylme-currency");

    if (savedLanguage === "en" || savedLanguage === "ar") {
      setLanguage(savedLanguage);
    }

    if (savedCurrency === "AED" || savedCurrency === "USD") {
      setCurrency(savedCurrency);
    }

    setIsReady(true);
  }, []);

  function handleLanguageChange(value: V3Language) {
    setLanguage(value);
    window.localStorage.setItem("voylme-language", value);

    document.documentElement.lang = value;
    document.documentElement.dir = value === "ar" ? "rtl" : "ltr";
  }

  function handleCurrencyChange(value: V3Currency) {
    setCurrency(value);
    window.localStorage.setItem("voylme-currency", value);
  }

  useEffect(() => {
    if (!isReady) {
      return;
    }

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [isReady, language]);

  return (
    <main
      id="voylme-homepage-clean"
      dir={language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen overflow-x-hidden bg-white text-gray-950"
    >
      <Header
        language={language}
        currency={currency}
        onLanguageChange={handleLanguageChange}
        onCurrencyChange={handleCurrencyChange}
      />

      <Hero language={language} />

      <div className="relative z-30 -mt-16 sm:-mt-20 lg:-mt-24">
        <SearchForm language={language} />
      </div>

      <Services language={language} />
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
