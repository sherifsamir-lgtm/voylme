export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white py-3">
      <h1 className="text-3xl font-black text-[#660033]">Voylme</h1>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 rounded-full border border-[#660033] px-3 py-2 text-xs font-bold text-[#660033]">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" stroke="#660033" strokeWidth="2" />
            <path d="M3 12h18" stroke="#660033" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 3c3 3 3 15 0 18" stroke="#660033" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 3c-3 3-3 15 0 18" stroke="#660033" strokeWidth="2" strokeLinecap="round" />
          </svg>
          EN
        </button>

        <button className="rounded-full border border-[#660033] px-3 py-2 text-xs font-bold text-[#660033]">
          AED
        </button>
      </div>
    </header>
  );
}
