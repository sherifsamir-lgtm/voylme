export default function SearchForm() {
  const inputClass =
    "w-full rounded-xl border border-[#660033]/70 bg-white px-4 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#660033]";

  return (
    <section className="mt-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-lg">
      <div className="grid gap-2">
        <input className={inputClass} placeholder="From" />
        <input className={inputClass} placeholder="Destination" />

        <div className="grid grid-cols-2 gap-2">
          <input className={inputClass} placeholder="Departure" />
          <input className={inputClass} placeholder="Return" />
        </div>

        <input className={inputClass} placeholder="Passengers, cabin class" />

        <button className="rounded-xl bg-[#660033] py-3 text-sm font-bold text-white shadow-md active:scale-[0.98]">
          Search
        </button>
      </div>
    </section>
  );
}
