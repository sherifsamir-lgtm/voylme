"use client";

import styles from "./home-page.module.css";

import AIHelpButton from "../../components/AIHelpButton";
import Footer from "../../components/Footer";
import AppHeader from "../../components/home/AppHeader";
import Hero from "../../components/home/Hero";
import TravelServices from "../../components/home/TravelServices";
import SearchForm from "../../components/search/SearchForm";

export default function SearchPage() {
  return (
    <main className={styles.page}>
      <AppHeader />

      <div className={styles.content}>
        <Hero />

        <div className={styles.services}>
          <TravelServices />
        </div>

        <section
          className={styles.search}
          aria-label="Flight search"
        >
          <SearchForm />
        </section>

        <div className={styles.footer}>
          <Footer />
        </div>
      </div>

      <AIHelpButton />
    </main>
  );
}
