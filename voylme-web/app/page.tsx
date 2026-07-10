import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import Footer from "@/components/Footer";
import AIHelpButton from "@/components/AIHelpButton";

export default function Home() {
  return (
    <main className="h-[100dvh] overflow-hidden bg-white px-5">
      <Header />
      <Hero />
      <SearchForm />
      <Footer />
      <AIHelpButton />
    </main>
  );
}
