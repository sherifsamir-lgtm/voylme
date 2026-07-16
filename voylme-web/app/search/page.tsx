"use client";

import styles from "./home-clean.module.css";

import AIHelpButton from "../../components/AIHelpButton";
import Footer from "../../components/Footer";
import AppHeader from "../../components/home/AppHeader";
import Hero from "../../components/home/Hero";
import TravelServices from "../../components/home/TravelServices";
import SearchForm from "../../components/search/SearchForm";

export default function SearchPage() {
  return (
    <main className={`${styles.home} voylme-final-viewport`}>
      <div className="voylme-final-page">
        <AppHeader />
        <Hero />
        <TravelServices />

        <section
          className="voylme-final-search"
          aria-label="Flight search"
        >
          <SearchForm />
        </section>

        <Footer />
        <AIHelpButton />
      </div>
    </main>
  );
}
