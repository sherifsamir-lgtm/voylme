import Image from "next/image";
import Link from "next/link";

import type {
  V3Currency,
  V3Language,
} from "@/components/homepage-clean/content";

type FooterProps = {
  language: V3Language;
  currency: V3Currency;
};

const companyLinks = [
  {
    en: "About Voylme",
    ar: "عن VOYLME",
    href: "/about",
  },
  {
    en: "Contact Us",
    ar: "تواصل معنا",
    href: "/contact",
  },
  {
    en: "Careers",
    ar: "الوظائف",
    href: "/careers",
  },
];

const supportLinks = [
  {
    en: "Help Center",
    ar: "مركز المساعدة",
    href: "/support",
  },
  {
    en: "Manage Booking",
    ar: "إدارة الحجز",
    href: "/manage-booking",
  },
  {
    en: "Cancellation & Refunds",
    ar: "الإلغاء والاسترداد",
    href: "/support/cancellation-refunds",
  },
];

const legalLinks = [
  {
    en: "Privacy",
    ar: "الخصوصية",
    href: "/privacy",
  },
  {
    en: "Terms",
    ar: "الشروط",
    href: "/terms",
  },
  {
    en: "Site Map",
    ar: "خريطة الموقع",
    href: "/sitemap",
  },
];

const paymentMethods = [
  {
    name: "Visa",
    src: "/assets/payments/logo-visa.png",
    width: 54,
    height: 24,
  },
  {
    name: "Mastercard",
    src: "/assets/payments/logo-mastercard.png",
    width: 44,
    height: 28,
  },
  {
    name: "Apple Pay",
    src: "/assets/payments/logo-apple-pay.png",
    width: 48,
    height: 24,
  },
  {
    name: "Google Pay",
    src: "/assets/payments/logo-google-pay.png",
    width: 52,
    height: 24,
  },
];

export default function Footer({
  language,
  currency,
}: FooterProps) {
  const isArabic = language === "ar";

  return (
    <footer
      dir={isArabic ? "rtl" : "ltr"}
      className="border-t border-[#660033]/10 bg-white"
    >
      <div className="mx-auto max-w-7xl px-5 pb-7 pt-12 sm:px-6 lg:px-8 lg:pt-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.9fr_1fr]">
          <div className={isArabic ? "text-right" : "text-left"}>
            <Link
              href="/"
              aria-label={isArabic ? "العودة إلى الرئيسية" : "Back to home"}
              className="inline-flex"
            >
              <Image
                src="/assets/brand/logo-voylme.png"
                alt="VOYLME"
                width={170}
                height={44}
                className="h-auto w-[150px] object-contain sm:w-[170px]"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-600">
              {isArabic
                ? "ابحث وقارن واحصل على أفضل خيارات السفر من شركاء موثوقين، في تجربة بسيطة وسريعة."
                : "Search, compare and get the best travel options from trusted partners through a simple and fast experience."}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex h-9 items-center rounded-full border border-[#660033]/15 bg-[#660033]/[0.03] px-4 text-xs font-extrabold text-[#660033]">
                {isArabic ? "العربية" : "English"}
              </span>

              <span className="inline-flex h-9 items-center rounded-full border border-[#660033]/15 bg-[#660033]/[0.03] px-4 text-xs font-extrabold text-[#660033]">
                {currency}
              </span>
            </div>
          </div>

          <div className={isArabic ? "text-right" : "text-left"}>
            <h3 className="text-sm font-black uppercase tracking-[0.12em] text-[#660033]">
              {isArabic ? "الشركة" : "Company"}
            </h3>

            <ul className="mt-5 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.en}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-gray-600 transition-colors hover:text-[#660033]"
                  >
                    {isArabic ? item.ar : item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={isArabic ? "text-right" : "text-left"}>
            <h3 className="text-sm font-black uppercase tracking-[0.12em] text-[#660033]">
              {isArabic ? "الدعم" : "Support"}
            </h3>

            <ul className="mt-5 space-y-3">
              {supportLinks.map((item) => (
                <li key={item.en}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-gray-600 transition-colors hover:text-[#660033]"
                  >
                    {isArabic ? item.ar : item.en}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="mailto:support@voylme.com"
              className="mt-5 inline-block text-sm font-extrabold text-[#660033] transition-opacity hover:opacity-75"
            >
              support@voylme.com
            </a>
          </div>

          <div className={isArabic ? "text-right" : "text-left"}>
            <h3 className="text-sm font-black uppercase tracking-[0.12em] text-[#660033]">
              {isArabic ? "طرق الدفع" : "Payment Methods"}
            </h3>

            <div className="mt-5 grid max-w-[250px] grid-cols-2 gap-2">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className="flex h-12 items-center justify-center rounded-xl border border-gray-200 bg-white px-3"
                >
                  <Image
                    src={method.src}
                    alt={method.name}
                    width={method.width}
                    height={method.height}
                    className="max-h-7 w-auto object-contain"
                  />
                </div>
              ))}
            </div>

            <p className="mt-4 max-w-[250px] text-xs leading-5 text-gray-500">
              {isArabic
                ? "تتم معالجة المدفوعات من خلال مزودي دفع آمنين."
                : "Payments are processed through secure payment providers."}
            </p>
          </div>
        </div>

        <div className="mt-11 border-t border-[#660033]/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-5 text-center lg:flex-row lg:text-left">
            <p className="text-xs leading-5 text-gray-500">
              {isArabic
                ? "© 2026 VOYLME. جميع الحقوق محفوظة."
                : "© 2026 VOYLME. All rights reserved."}
            </p>

            <nav
              aria-label={isArabic ? "الروابط القانونية" : "Legal links"}
              className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
            >
              {legalLinks.map((item) => (
                <Link
                  key={item.en}
                  href={item.href}
                  className="text-xs font-semibold text-gray-500 transition-colors hover:text-[#660033]"
                >
                  {isArabic ? item.ar : item.en}
                </Link>
              ))}
            </nav>

            <p className="text-xs text-gray-500">
              {isArabic ? "تطوير" : "Developed by"}{" "}
              <span className="font-extrabold text-[#660033]">
                iSocial
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
