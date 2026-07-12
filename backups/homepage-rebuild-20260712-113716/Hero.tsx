export default function Hero() {
  return (
    <section className="px-4 pt-2">
      <div className="overflow-hidden rounded-[22px] bg-[#660033] shadow-[0_6px_18px_rgba(102,0,51,0.14)]">
        <img
          src="/images/hero-bg.png"
          alt="Compare flights and plan your next journey with Voylme"
          className="block aspect-[16/7] w-full object-contain"
          draggable={false}
        />
      </div>
    </section>
  );
}
