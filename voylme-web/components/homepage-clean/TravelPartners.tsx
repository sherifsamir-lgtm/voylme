import {
  homepageContent,
  type V3Language,
} from "@/components/homepage-clean/content";

type TravelPartnersProps = {
  language: V3Language;
};

const partners = [
  "Emirates",
  "Qatar Airways",
  "Etihad",
  "Turkish Airlines",
  "EgyptAir",
  "Booking.com",
  "Agoda",
  "Expedia",
];

export default function TravelPartners({
  language,
}: TravelPartnersProps) {
  const content = homepageContent[language].partners;
  const isArabic = language === "ar";

  return (
    <section
      className="bg-white px-5 py-16 sm:px-8 sm:py-20"
      aria-labelledby="travel-partners-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className={isArabic ? "text-right" : "text-left"}>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#660033]">
            {content.eyebrow}
          </p>

          <h2
            id="travel-partners-title"
            className="mt-3 text-3xl font-black text-[#660033] sm:text-4xl"
          >
            {content.title}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex h-24 items-center justify-center rounded-2xl border border-[#660033]/10 bg-[#faf7f8] text-center text-sm font-extrabold text-[#660033] shadow-sm transition hover:border-[#660033]/25 hover:shadow-md"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
