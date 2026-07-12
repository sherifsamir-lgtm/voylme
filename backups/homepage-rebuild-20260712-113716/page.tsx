"use client";

import AIHelpButton from "../../components/AIHelpButton";
import Footer from "../../components/Footer";
import AppHeader from "../../components/home/AppHeader";
import Hero from "../../components/home/Hero";
import TravelServices from "../../components/home/TravelServices";
import SearchForm from "../../components/search/SearchForm";

export default function SearchPage() {
  return (
    <main className="voylme-home-page">
      <div className="voylme-home-shell">
        <AppHeader />

        <Hero />

        <TravelServices />

        <section
          aria-label="Flight search"
          className="voylme-search-section"
        >
          <SearchForm />
        </section>

        <Footer />

        <AIHelpButton />
      </div>
    </main>
  );
}
