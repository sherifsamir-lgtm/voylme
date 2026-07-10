import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <main className="h-[100dvh] overflow-hidden bg-white px-5">
      <header className="flex items-center justify-between border-b border-gray-100 bg-white py-3">
        <h1 className="text-3xl font-black text-[#660033]">Voylme</h1>

        <div className="flex items-center gap-2">
          <button className="rounded-full border border-gray-200 px-3 py-2 text-xs font-bold text-slate-700">EN</button>
          <button className="rounded-full border border-gray-200 px-3 py-2 text-xs font-bold text-slate-700">AED</button>
        </div>
      </header>

      <section className="pt-3">
        <div className="rounded-3xl bg-[#660033] p-4 text-white shadow-md">
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-300">
            Flights · Hotels · Cars · Activities
          </p>

          <h2 className="mt-2 text-2xl font-black leading-tight">
            Find the best travel deal faster.
          </h2>

          <p className="mt-2 text-xs leading-5 text-gray-200">
            Search and compare trusted travel partners.
          </p>
        </div>

        <SearchForm />

        <div className="mt-3 text-center text-[11px] text-slate-500">
          support@voylme.com · © 2026 Voylme
        </div>
      </section>

      <button className="fixed bottom-28 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#660033] text-xl text-white shadow-xl">
        💬
      </button>
    </main>
  );
}
