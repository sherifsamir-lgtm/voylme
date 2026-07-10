export default function SearchForm() {
  return (
    <section className="mt-3 rounded-3xl border border-gray-200 bg-white p-4 shadow-lg">
      <div className="grid gap-2">
        <input className="rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#660033]" placeholder="From" />
        <input className="rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#660033]" placeholder="Destination" />

        <div className="grid grid-cols-2 gap-2">
          <input className="rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#660033]" placeholder="Departure" />
          <input className="rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#660033]" placeholder="Return" />
        </div>

        <input className="rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#660033]" placeholder="Passengers" />

        <button className="rounded-xl bg-[#660033] py-2.5 text-sm font-bold text-white">
          Search
        </button>
      </div>
    </section>
  );
}
