"use client";

import AppHeader from "../../components/home/AppHeader";
import Hero from "../../components/home/Hero";
import TravelServices from "../../components/home/TravelServices";
import SearchForm from "../../components/search/SearchForm";
import Footer from "../../components/Footer";
import AIHelpButton from "../../components/AIHelpButton";

export default function SearchPage() {
  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-[#f8f5f7] text-[#171522]">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col">
        <AppHeader />
        <Hero />
        <TravelServices />

        <section className="px-3 pt-2">
          <SearchForm />
        </section>

        <Footer />
        <AIHelpButton />
      </div>
    </main>
  );
}
