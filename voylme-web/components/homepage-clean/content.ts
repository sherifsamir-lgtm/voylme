export type Language = "en" | "ar";
export type Currency = "AED" | "USD";

export type V3Language = Language;
export type V3Currency = Currency;

export const supportedLanguages: Array<{
  code: Language;
  label: string;
  nativeLabel: string;
}> = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
  },
  {
    code: "ar",
    label: "Arabic",
    nativeLabel: "العربية",
  },
];

export const supportedCurrencies: Array<{
  code: Currency;
  label: string;
  flag: string;
}> = [
  {
    code: "AED",
    label: "UAE Dirham",
    flag: "🇦🇪",
  },
  {
    code: "USD",
    label: "US Dollar",
    flag: "🇺🇸",
  },
];

export const homepageContent = {
  en: {
    direction: "ltr" as const,

    header: {
      accountTitle: "Voylme Account",
      accountSubtitle: "Manage your travel",
      notifications: "Notifications",
      menu: "Menu",
      myAccount: "My Account",
      myTrips: "My Trips",
      saved: "Saved",
      rewardsWallet: "Rewards & Wallet",
      supportCenter: "Support Center",
      settings: "Settings",
      signIn: "Sign In",
      signOut: "Sign Out",
    },

    hero: {
      eyebrow: "FLIGHTS · HOTELS · CARS · ACTIVITIES",
      title: "Get the best travel deals faster.",
      description: "Search and compare trusted travel partners.",
    },

    search: {
      roundTrip: "Round-trip",
      oneWay: "One-way",
      from: "From",
      to: "To",
      departure: "Departure",
      return: "Return",
      travellers: "Travellers",
      cabin: "Cabin class",
      searchButton: "Search flights",
    },

    services: {
      eyebrow: "TRAVEL SERVICES",
      title: "Everything you need for your journey",
      description:
        "Search and compare trusted travel services in one place.",
      flights: "Flights",
      hotels: "Hotels",
      cars: "Cars",
      activities: "Activities",
      insurance: "Insurance",
      yachts: "Yachts",
    },

    featuredOffers: {
      eyebrow: "FEATURED OFFERS",
      title: "Travel more for less",
    },

    whyVoylme: {
      eyebrow: "WHY VOYLME",
      title: "A smarter way to compare travel",
    },

    destinations: {
      eyebrow: "POPULAR DESTINATIONS",
      title: "Discover your next destination",
    },

    partners: {
      eyebrow: "TRAVEL PARTNERS",
      title: "Compare trusted travel providers",
    },

    app: {
      eyebrow: "VOYLME APP",
      title: "Your journey in your pocket",
    },

    
    appDownload: {
      eyebrow: "Mobile App",
      title: "Take Voylme everywhere.",
      description: "Search, compare and manage your trips anytime from the Voylme mobile app.",
    },

    

    footer: {
      description:
        "Search and compare trusted travel partners with Voylme.",
      copyright: "© 2026 Voylme. All rights reserved.",
    },
  },

  ar: {
    direction: "rtl" as const,

    header: {
      accountTitle: "حساب Voylme",
      accountSubtitle: "إدارة رحلاتك",
      notifications: "الإشعارات",
      menu: "القائمة",
      myAccount: "حسابي",
      myTrips: "رحلاتي",
      saved: "المحفوظات",
      rewardsWallet: "المكافآت والمحفظة",
      supportCenter: "مركز الدعم",
      settings: "الإعدادات",
      signIn: "تسجيل الدخول",
      signOut: "تسجيل الخروج",
    },

    hero: {
      eyebrow: "رحلات · فنادق · سيارات · أنشطة",
      title: "احصل على أفضل عروض السفر بشكل أسرع.",
      description: "ابحث وقارن بين شركاء السفر الموثوقين.",
    },

    search: {
      roundTrip: "ذهاب وعودة",
      oneWay: "ذهاب فقط",
      from: "من",
      to: "إلى",
      departure: "المغادرة",
      return: "العودة",
      travellers: "المسافرون",
      cabin: "درجة السفر",
      searchButton: "ابحث عن رحلات",
    },

    services: {
      eyebrow: "خدمات السفر",
      title: "كل ما تحتاجه لرحلتك",
      description:
        "ابحث وقارن بين خدمات السفر الموثوقة في مكان واحد.",
      flights: "الطيران",
      hotels: "الفنادق",
      cars: "السيارات",
      activities: "الأنشطة",
      insurance: "التأمين",
      yachts: "اليخوت",
    },

    featuredOffers: {
      eyebrow: "العروض المميزة",
      title: "سافر أكثر بتكلفة أقل",
    },

    whyVoylme: {
      eyebrow: "لماذا VOYLME",
      title: "طريقة أذكى لمقارنة السفر",
    },

    destinations: {
      eyebrow: "الوجهات الشائعة",
      title: "اكتشف وجهتك القادمة",
    },

    partners: {
      eyebrow: "شركاء السفر",
      title: "قارن بين مزودي السفر الموثوقين",
    },

    app: {
      eyebrow: "تطبيق VOYLME",
      title: "رحلتك دائمًا معك",
    },

    appDownload: {
      eyebrow: "تطبيق الجوال",
      title: "خذ Voylme معك أينما كنت.",
      description: "ابحث وقارن وأدر رحلاتك في أي وقت من خلال تطبيق Voylme.",
    },

    footer: {
      description:
        "ابحث وقارن بين شركاء السفر الموثوقين مع Voylme.",
      copyright: "© 2026 Voylme. جميع الحقوق محفوظة.",
    },
  },
} as const;
