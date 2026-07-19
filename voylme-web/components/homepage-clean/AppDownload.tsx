import {
  homepageContent,
  type V3Language,
} from "@/components/homepage-clean/content";

type AppDownloadProps = {
  language: V3Language;
};

const features = [
  {
    en: "Compare faster",
    ar: "قارن بشكل أسرع",
  },
  {
    en: "Manage your trips",
    ar: "أدر رحلاتك بسهولة",
  },
  {
    en: "Exclusive mobile deals",
    ar: "عروض حصرية للتطبيق",
  },
];

export default function AppDownload({
  language,
}: AppDownloadProps) {
  const content = homepageContent[language].appDownload;
  const isArabic = language === "ar";

  return (
    <section
      className="overflow-hidden bg-gradient-to-br from-[#660033] via-[#4d0026] to-[#2b0015] px-5 py-16 text-white sm:px-8 sm:py-20"
      aria-labelledby="app-download-title"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className={isArabic ? "text-right" : "text-left"}>
          <span className="inline-flex rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#D4AF37]">
            {isArabic ? "قريبًا" : "Coming Soon"}
          </span>

          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.22em] text-[#D4AF37]">
            {content.eyebrow}
          </p>

          <h2
            id="app-download-title"
            className="mt-3 max-w-2xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl"
          >
            {content.title}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-white/85">
            {content.description}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.en}
                className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-sm font-extrabold backdrop-blur-sm"
              >
                {isArabic ? feature.ar : feature.en}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="cursor-not-allowed rounded-2xl bg-white px-5 py-4 text-left opacity-80"
            >
              <span className="block text-[10px] font-bold uppercase tracking-wide text-[#660033]/65">
                {isArabic ? "قريبًا على" : "Coming soon on"}
              </span>
              <span className="block text-base font-black text-[#660033]">
                App Store
              </span>
            </button>

            <button
              type="button"
              disabled
              aria-disabled="true"
              className="cursor-not-allowed rounded-2xl border border-white/30 bg-white/10 px-5 py-4 text-left opacity-80"
            >
              <span className="block text-[10px] font-bold uppercase tracking-wide text-white/65">
                {isArabic ? "قريبًا على" : "Coming soon on"}
              </span>
              <span className="block text-base font-black text-white">
                Google Play
              </span>
            </button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[430px]">
          <div
            className="absolute inset-8 rounded-full bg-[#D4AF37]/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto w-[250px] rounded-[42px] border-[8px] border-[#16000b] bg-[#16000b] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.4)] sm:w-[285px]">
            <div className="overflow-hidden rounded-[32px] bg-white">
              <div className="flex items-center justify-between bg-[#660033] px-4 py-4 text-white">
                <span className="text-sm font-black">VOYLME</span>
                <span className="rounded-full bg-white/15 px-2 py-1 text-[10px] font-bold">
                  AED
                </span>
              </div>

              <div className="space-y-4 p-4 text-[#660033]">
                <div className="rounded-2xl bg-[#faf7f8] p-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#660033]/60">
                    {isArabic ? "ابحث عن رحلتك" : "Search your journey"}
                  </p>
                  <p className="mt-2 text-lg font-black">
                    {isArabic ? "إلى أين تريد السفر؟" : "Where do you want to go?"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[#660033]/10 p-3">
                    <p className="text-[10px] text-gray-500">
                      {isArabic ? "من" : "From"}
                    </p>
                    <p className="mt-1 text-sm font-black">DXB</p>
                  </div>

                  <div className="rounded-xl border border-[#660033]/10 p-3">
                    <p className="text-[10px] text-gray-500">
                      {isArabic ? "إلى" : "To"}
                    </p>
                    <p className="mt-1 text-sm font-black">CAI</p>
                  </div>
                </div>

                <button
                  type="button"
                  tabIndex={-1}
                  className="w-full rounded-xl bg-[#660033] py-3 text-sm font-black text-white"
                >
                  {isArabic ? "ابحث" : "Search"}
                </button>

                <div className="rounded-2xl bg-[#660033]/5 p-4">
                  <p className="text-xs font-black">
                    {isArabic ? "عروض حصرية للتطبيق" : "Exclusive app deals"}
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-gray-500">
                    {isArabic
                      ? "احصل على عروض مخصصة وإشعارات لرحلاتك."
                      : "Get personalized offers and trip notifications."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-0 hidden rounded-3xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md sm:block">
            <div className="grid h-20 w-20 grid-cols-5 gap-1 rounded-xl bg-white p-2">
              {Array.from({ length: 25 }).map((_, index) => (
                <span
                  key={index}
                  className={
                    index % 3 === 0 || index % 7 === 0
                      ? "rounded-[2px] bg-[#2b0015]"
                      : "rounded-[2px] bg-white"
                  }
                />
              ))}
            </div>
            <p className="mt-2 text-[10px] font-extrabold text-white/70">
              {isArabic ? "رمز التطبيق قريبًا" : "App QR coming soon"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
