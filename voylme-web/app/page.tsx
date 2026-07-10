import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import Footer from "@/components/Footer";
import AIHelpButton from "@/components/AIHelpButton";

export default function Home() {
  return (
    <main className="h-[100dvh] w-full overflow-hidden bg-white">
      <div
        className="mx-auto flex flex-col px-4"
        style={{
          width: "119.0476%",
          marginLeft: "-9.5238%",
          transform: "scale(0.84)",
          transformOrigin: "top center",
        }}
      >
        <Header />

        <div className="-mt-3">
          <Hero />
        </div>

        <div className="-mt-2">
          <SearchForm />
        </div>

        <div className="relative shrink-0">
          <Footer />
          <AIHelpButton />
        </div>
      </div>
    </main>
  );
}
