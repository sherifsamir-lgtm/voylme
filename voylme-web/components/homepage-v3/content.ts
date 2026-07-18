export type V3Language = "en" | "ar";
export type V3Currency = "AED" | "USD";

export const V3_COPY = {
  en: {
    locale: "en-US",
    direction: "ltr" as const,

    languageName: "English (United States)",
    languageMenuTitle: "Choose language",
    currencyMenuTitle: "Choose currency",

    notifications: "Notifications",
    notificationWelcomeTitle: "Welcome to Voylme",
    notificationWelcomeText:
      "Your personal travel assistant is ready.",
    notificationDealsTitle: "New travel deals",
    notificationDealsText:
      "Compare the latest offers from trusted travel partners.",
    markAllRead: "Mark all as read",
    clearAll: "Clear all",

    menuWelcome: "Welcome to Voylme",
    menuSubtitle: "Plan your next journey with confidence.",
    menuItems: [
      "My Account",
      "My Trips",
      "Saved",
      "Rewards & Wallet",
      "Travel Credits",
      "Notifications",
      "Support Center",
      "Settings",
      "About Voylme",
      "Privacy Policy",
      "Terms & Conditions",
      "Contact Us",
    ],
    signIn: "Sign In",

    heroEyebrow: "FLIGHTS · HOTELS · CARS · ACTIVITIES",
    heroTitle: "Find the best travel deals faster.",
    heroDescription:
      "Search and compare trusted travel partners worldwide.",

    services: {
      flights: "Flights",
      hotels: "Hotels",
      cars: "Cars",
      activities: "Activities",
      insurance: "Insurance",
      yachts: "Yachts",
    },

    search: {
      roundTrip: "Round Trip",
      oneWay: "One Way",
      from: "From",
      to: "To",
      fromPlaceholder: "City or airport",
      toPlaceholder: "Destination or airport",
      departure: "Departure",
      return: "Return",
      passengers: "Passengers",
      cabin: "Cabin Class",
      searchButton: "Search Flights",
      requiredRoute:
        "Please enter both departure and destination.",
      sameRoute:
        "Departure and destination must be different.",
      invalidReturn:
        "Return date must be after departure date.",
      economy: "Economy",
      premiumEconomy: "Premium Economy",
      business: "Business",
      first: "First Class",
    },

    offersEyebrow: "FEATURED OFFERS",
    offersTitle: "More travel opportunities in one place",
    offers: [
      {
        title: "Airline offers",
        description:
          "Compare selected flight deals from trusted partners.",
      },
      {
        title: "Hotel deals coming soon",
        description:
          "Stay options designed for different budgets.",
      },
      {
        title: "Exclusive promotions",
        description:
          "A dedicated space for airline and partner offers.",
      },
    ],

    footerTagline:
      "Your personal assistant for better travel deals.",
    supportCenter: "Support Center",
    privacySecurity: "Privacy & Security",
    chatTitle: "Voylme Assistant",
    chatMessage:
      "Hi, how can I help you plan your trip?",
    startChat: "Start chat",
  },

  ar: {
    locale: "ar-AE",
    direction: "rtl" as const,

    languageName: "العربية (الإمارات)",
    languageMenuTitle: "اختر اللغة",
    currencyMenuTitle: "اختر العملة",

    notifications: "الإشعارات",
    notificationWelcomeTitle: "مرحبًا بك في Voylme",
    notificationWelcomeText:
      "مساعد السفر الشخصي الخاص بك جاهز.",
    notificationDealsTitle: "عروض سفر جديدة",
    notificationDealsText:
      "قارن أحدث العروض من شركاء السفر الموثوقين.",
    markAllRead: "تحديد الكل كمقروء",
    clearAll: "مسح الكل",

    menuWelcome: "مرحبًا بك في Voylme",
    menuSubtitle: "خطط لرحلتك القادمة بثقة وسهولة.",
    menuItems: [
      "حسابي",
      "رحلاتي",
      "المحفوظات",
      "المكافآت والمحفظة",
      "رصيد السفر",
      "الإشعارات",
      "مركز الدعم",
      "الإعدادات",
      "عن Voylme",
      "سياسة الخصوصية",
      "الشروط والأحكام",
      "تواصل معنا",
    ],
    signIn: "تسجيل الدخول",

    heroEyebrow: "رحلات · فنادق · سيارات · أنشطة",
    heroTitle: "اعثر على أفضل عروض السفر بسهولة.",
    heroDescription:
      "ابحث وقارن بين أفضل شركاء السفر الموثوقين حول العالم.",

    services: {
      flights: "رحلات",
      hotels: "فنادق",
      cars: "سيارات",
      activities: "أنشطة",
      insurance: "تأمين",
      yachts: "يخوت",
    },

    search: {
      roundTrip: "ذهاب وعودة",
      oneWay: "اتجاه واحد",
      from: "من",
      to: "إلى",
      fromPlaceholder: "المدينة أو المطار",
      toPlaceholder: "الوجهة أو المطار",
      departure: "تاريخ المغادرة",
      return: "تاريخ العودة",
      passengers: "المسافرون",
      cabin: "درجة السفر",
      searchButton: "ابحث عن رحلات",
      requiredRoute:
        "يرجى إدخال مطار المغادرة والوصول.",
      sameRoute:
        "يجب أن تختلف وجهة الوصول عن المغادرة.",
      invalidReturn:
        "يجب أن يكون تاريخ العودة بعد تاريخ المغادرة.",
      economy: "الدرجة السياحية",
      premiumEconomy: "السياحية الممتازة",
      business: "درجة رجال الأعمال",
      first: "الدرجة الأولى",
    },

    offersEyebrow: "عروض مختارة",
    offersTitle: "المزيد من فرص السفر في مكان واحد",
    offers: [
      {
        title: "عروض شركات الطيران",
        description:
          "قارن عروض الرحلات المختارة من شركاء موثوقين.",
      },
      {
        title: "عروض الفنادق قريبًا",
        description:
          "خيارات إقامة تناسب مختلف الميزانيات.",
      },
      {
        title: "عروض حصرية",
        description:
          "مساحة مخصصة لعروض شركات الطيران والشركاء.",
      },
    ],

    footerTagline:
      "مساعدك الشخصي للبحث عن أفضل عروض السفر.",
    supportCenter: "مركز الدعم",
    privacySecurity: "الخصوصية والأمان",
    chatTitle: "مساعد Voylme",
    chatMessage:
      "مرحبًا، كيف يمكنني مساعدتك في التخطيط لرحلتك؟",
    startChat: "ابدأ المحادثة",
  },
} as const;

export const V3_LANGUAGES = [
  {
    code: "en" as const,
    name: "English (United States)",
    flag: "/flags/countries/us.svg",
  },
  {
    code: "ar" as const,
    name: "العربية (الإمارات)",
    flag: "/flags/countries/ae.svg",
  },
];

export const V3_CURRENCIES = [
  {
    code: "AED" as const,
    symbol: "د.إ",
    englishName: "UAE Dirham",
    arabicName: "درهم إماراتي",
    flag: "/flags/countries/ae.svg",
  },
  {
    code: "USD" as const,
    symbol: "$",
    englishName: "US Dollar",
    arabicName: "دولار أمريكي",
    flag: "/flags/countries/us.svg",
  },
];
