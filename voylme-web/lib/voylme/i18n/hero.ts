export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  dir: "ltr" | "rtl";
};

export const HERO_CONTENT:
  Record<string, HeroContent> =
{
  "ENG": {
    "eyebrow": "FLIGHTS · HOTELS · CARS · ACTIVITIES",
    "title": "Find the best\ntravel deal faster.",
    "description": "Search and compare trusted\ntravel partners.",
    "dir": "ltr"
  },
  "ARA": {
    "eyebrow": "رحلات · فنادق · سيارات · أنشطة",
    "title": "احصل على أفضل\nعروض السفر بشكل أسرع.",
    "description": "قارن عروض شركاء السفر\nالموثوقين حول العالم.",
    "dir": "rtl"
  },
  "FRA": {
    "eyebrow": "VOLS · HÔTELS · VOITURES · ACTIVITÉS",
    "title": "Trouvez les meilleures\noffres de voyage plus vite.",
    "description": "Recherchez et comparez des partenaires de voyage fiables dans le monde entier.",
    "dir": "ltr"
  },
  "RUS": {
    "eyebrow": "РЕЙСЫ · ОТЕЛИ · АВТО · РАЗВЛЕЧЕНИЯ",
    "title": "Находите лучшие\nпредложения быстрее.",
    "description": "Ищите и сравнивайте надежных туристических партнеров по всему миру.",
    "dir": "ltr"
  },
  "SPA": {
    "eyebrow": "VUELOS · HOTELES · COCHES · ACTIVIDADES",
    "title": "Encuentra las mejores\nofertas de viaje más rápido.",
    "description": "Busca y compara socios de viaje de confianza en todo el mundo.",
    "dir": "ltr"
  },
  "DEU": {
    "eyebrow": "FLÜGE · HOTELS · AUTOS · AKTIVITÄTEN",
    "title": "Finde die besten\nReiseangebote schneller.",
    "description": "Suche und vergleiche vertrauenswürdige Reisepartner weltweit.",
    "dir": "ltr"
  },
  "NLD": {
    "eyebrow": "VLUCHTEN · HOTELS · AUTO'S · ACTIVITEITEN",
    "title": "Vind sneller de beste\nreisaanbiedingen.",
    "description": "Zoek en vergelijk betrouwbare reispartners wereldwijd.",
    "dir": "ltr"
  },
  "CAT": {
    "eyebrow": "VOLS · HOTELS · COTXES · ACTIVITATS",
    "title": "Troba més ràpidament\nles millors ofertes de viatge.",
    "description": "Cerca i compara socis de viatge de confiança arreu del món.",
    "dir": "ltr"
  },
  "ITA": {
    "eyebrow": "VOLI · HOTEL · AUTO · ATTIVITÀ",
    "title": "Trova più velocemente\nle migliori offerte di viaggio.",
    "description": "Cerca e confronta partner di viaggio affidabili in tutto il mondo.",
    "dir": "ltr"
  },
  "POR": {
    "eyebrow": "VOOS · HOTÉIS · CARROS · ATIVIDADES",
    "title": "Encontre as melhores\nofertas de viagem mais rápido.",
    "description": "Pesquise e compare parceiros de viagem confiáveis em todo o mundo.",
    "dir": "ltr"
  },
  "NOR": {
    "eyebrow": "FLY · HOTELLER · BILER · AKTIVITETER",
    "title": "Finn de beste\nreisetilbudene raskere.",
    "description": "Søk og sammenlign pålitelige reisepartnere over hele verden.",
    "dir": "ltr"
  },
  "FIN": {
    "eyebrow": "LENNOT · HOTELLIT · AUTOT · AKTIVITEETIT",
    "title": "Löydä parhaat\nmatkatarjoukset nopeammin.",
    "description": "Etsi ja vertaa luotettavia matkakumppaneita maailmanlaajuisesti.",
    "dir": "ltr"
  },
  "SWE": {
    "eyebrow": "FLYG · HOTELL · BILAR · AKTIVITETER",
    "title": "Hitta de bästa\nreseerbjudandena snabbare.",
    "description": "Sök och jämför pålitliga resepartners över hela världen.",
    "dir": "ltr"
  },
  "DAN": {
    "eyebrow": "FLY · HOTELLER · BILER · AKTIVITETER",
    "title": "Find de bedste\nrejsetilbud hurtigere.",
    "description": "Søg og sammenlign pålidelige rejsepartnere over hele verden.",
    "dir": "ltr"
  },
  "CES": {
    "eyebrow": "LETY · HOTELY · AUTA · AKTIVITY",
    "title": "Najděte nejlepší\nnabídky cestování rychleji.",
    "description": "Vyhledávejte a porovnávejte důvěryhodné cestovní partnery po celém světě.",
    "dir": "ltr"
  },
  "HUN": {
    "eyebrow": "JÁRATOK · SZÁLLODÁK · AUTÓK · PROGRAMOK",
    "title": "Találja meg gyorsabban\na legjobb utazási ajánlatokat.",
    "description": "Keressen és hasonlítson össze megbízható utazási partnereket világszerte.",
    "dir": "ltr"
  },
  "RON": {
    "eyebrow": "ZBORURI · HOTELURI · MAȘINI · ACTIVITĂȚI",
    "title": "Găsește mai repede\ncele mai bune oferte de călătorie.",
    "description": "Caută și compară parteneri de călătorie de încredere din întreaga lume.",
    "dir": "ltr"
  },
  "JPN": {
    "eyebrow": "航空券 · ホテル · レンタカー · アクティビティ",
    "title": "最高の旅行プランを\nもっと速く見つけよう。",
    "description": "世界中の信頼できる旅行パートナーを検索・比較できます。",
    "dir": "ltr"
  },
  "ZHO_CN": {
    "eyebrow": "航班 · 酒店 · 租车 · 活动",
    "title": "更快找到\n最佳旅行优惠。",
    "description": "搜索并比较全球值得信赖的旅行合作伙伴。",
    "dir": "ltr"
  },
  "ZHO_TW": {
    "eyebrow": "航班 · 飯店 · 租車 · 活動",
    "title": "更快找到\n最佳旅遊優惠。",
    "description": "搜尋並比較全球值得信賴的旅遊合作夥伴。",
    "dir": "ltr"
  },
  "POL": {
    "eyebrow": "LOTY · HOTELE · SAMOCHODY · ATRAKCJE",
    "title": "Znajdź najlepsze\noferty podróży szybciej.",
    "description": "Wyszukuj i porównuj zaufanych partnerów turystycznych na całym świecie.",
    "dir": "ltr"
  },
  "ELL": {
    "eyebrow": "ΠΤΗΣΕΙΣ · ΞΕΝΟΔΟΧΕΙΑ · ΑΥΤΟΚΙΝΗΤΑ · ΔΡΑΣΤΗΡΙΟΤΗΤΕΣ",
    "title": "Βρείτε τις καλύτερες\nπροσφορές γρηγορότερα.",
    "description": "Αναζητήστε και συγκρίνετε αξιόπιστους ταξιδιωτικούς συνεργάτες παγκοσμίως.",
    "dir": "ltr"
  },
  "TUR": {
    "eyebrow": "UÇUŞLAR · OTELLER · ARAÇLAR · AKTİVİTELER",
    "title": "En iyi seyahat\nfırsatlarını daha hızlı bulun.",
    "description": "Dünya çapındaki güvenilir seyahat ortaklarını arayın ve karşılaştırın.",
    "dir": "ltr"
  },
  "BUL": {
    "eyebrow": "ПОЛЕТИ · ХОТЕЛИ · КОЛИ · ДЕЙНОСТИ",
    "title": "Намерете най-добрите\nоферти по-бързо.",
    "description": "Търсете и сравнявайте надеждни туристически партньори по целия свят.",
    "dir": "ltr"
  },
  "KOR": {
    "eyebrow": "항공편 · 호텔 · 렌터카 · 액티비티",
    "title": "최고의 여행 상품을\n더 빠르게 찾아보세요.",
    "description": "전 세계의 신뢰할 수 있는 여행 파트너를 검색하고 비교하세요.",
    "dir": "ltr"
  },
  "LAV": {
    "eyebrow": "LIDOJUMI · VIESNĪCAS · AUTO · AKTIVITĀTES",
    "title": "Atrodiet labākos\nceļojumu piedāvājumus ātrāk.",
    "description": "Meklējiet un salīdziniet uzticamus ceļojumu partnerus visā pasaulē.",
    "dir": "ltr"
  },
  "UKR": {
    "eyebrow": "РЕЙСИ · ГОТЕЛІ · АВТО · РОЗВАГИ",
    "title": "Знаходьте найкращі\nпропозиції швидше.",
    "description": "Шукайте та порівнюйте надійних туристичних партнерів у всьому світі.",
    "dir": "ltr"
  },
  "HIN": {
    "eyebrow": "उड़ानें · होटल · कारें · गतिविधियाँ",
    "title": "सबसे अच्छे यात्रा सौदे\nतेजी से खोजें।",
    "description": "दुनिया भर के विश्वसनीय यात्रा भागीदारों को खोजें और तुलना करें।",
    "dir": "ltr"
  },
  "IND": {
    "eyebrow": "PENERBANGAN · HOTEL · MOBIL · AKTIVITAS",
    "title": "Temukan penawaran\nperjalanan terbaik lebih cepat.",
    "description": "Cari dan bandingkan mitra perjalanan tepercaya di seluruh dunia.",
    "dir": "ltr"
  },
  "MSA": {
    "eyebrow": "PENERBANGAN · HOTEL · KERETA SEWA · AKTIVITI",
    "title": "Cari tawaran perjalanan\nterbaik dengan lebih pantas.",
    "description": "Cari dan bandingkan rakan perjalanan dipercayai di seluruh dunia.",
    "dir": "ltr"
  },
  "THA": {
    "eyebrow": "เที่ยวบิน · โรงแรม · รถเช่า · กิจกรรม",
    "title": "ค้นหาดีลท่องเที่ยวที่ดีที่สุด\nได้รวดเร็วยิ่งขึ้น",
    "description": "ค้นหาและเปรียบเทียบพันธมิตรด้านการท่องเที่ยวที่เชื่อถือได้ทั่วโลก",
    "dir": "ltr"
  },
  "EST": {
    "eyebrow": "LENNUD · HOTELLID · AUTOD · TEGEVUSED",
    "title": "Leia parimad\nreisipakkumised kiiremini.",
    "description": "Otsi ja võrdle usaldusväärseid reisipartnereid kogu maailmas.",
    "dir": "ltr"
  },
  "HRV": {
    "eyebrow": "LETOVI · HOTELI · AUTOMOBILI · AKTIVNOSTI",
    "title": "Pronađite najbolje\nponude putovanja brže.",
    "description": "Pretražite i usporedite pouzdane putničke partnere diljem svijeta.",
    "dir": "ltr"
  },
  "LIT": {
    "eyebrow": "SKRYDŽIAI · VIEŠBUČIAI · AUTOMOBILIAI · VEIKLOS",
    "title": "Raskite geriausius\nkelionių pasiūlymus greičiau.",
    "description": "Ieškokite ir palyginkite patikimus kelionių partnerius visame pasaulyje.",
    "dir": "ltr"
  },
  "SLK": {
    "eyebrow": "LETY · HOTELY · AUTÁ · AKTIVITY",
    "title": "Nájdite najlepšie\nponuky cestovania rýchlejšie.",
    "description": "Vyhľadávajte a porovnávajte dôveryhodných cestovných partnerov po celom svete.",
    "dir": "ltr"
  },
  "SRP": {
    "eyebrow": "LETOVI · HOTELI · AUTOMOBILI · AKTIVNOSTI",
    "title": "Pronađite najbolje\nponude putovanja brže.",
    "description": "Pretražite i uporedite pouzdane putničke partnere širom sveta.",
    "dir": "ltr"
  },
  "SLV": {
    "eyebrow": "LETI · HOTELI · AVTOMOBILI · AKTIVNOSTI",
    "title": "Hitreje poiščite\nnajboljše potovalne ponudbe.",
    "description": "Poiščite in primerjajte zanesljive potovalne partnerje po vsem svetu.",
    "dir": "ltr"
  },
  "VIE": {
    "eyebrow": "CHUYẾN BAY · KHÁCH SẠN · XE · HOẠT ĐỘNG",
    "title": "Tìm ưu đãi du lịch\ntốt nhất nhanh hơn.",
    "description": "Tìm kiếm và so sánh các đối tác du lịch đáng tin cậy trên toàn thế giới.",
    "dir": "ltr"
  },
  "FIL": {
    "eyebrow": "MGA FLIGHT · HOTEL · KOTSE · AKTIBIDAD",
    "title": "Hanapin ang pinakamahusay\nna travel deal nang mas mabilis.",
    "description": "Maghanap at maghambing ng mapagkakatiwalaang travel partners sa buong mundo.",
    "dir": "ltr"
  },
  "ISL": {
    "eyebrow": "FLUG · HÓTEL · BÍLAR · AFÞREYING",
    "title": "Finndu bestu\nferðatilboðin hraðar.",
    "description": "Leitaðu og berðu saman trausta ferðafélaga um allan heim.",
    "dir": "ltr"
  }
};

const HERO_ALIASES: Record<string, string> = {
  ENG_US: "ENG",
  ENG_GB: "ENG",
  ENG: "ENG",
  EN: "ENG",

  ARA: "ARA",
  AR: "ARA",

  FRA: "FRA",
  FR: "FRA",

  SPA_MX: "SPA",
  SPA: "SPA",
  ES: "SPA",

  POR_PT: "POR",
  POR_BR: "POR",
  POR: "POR",
  PT: "POR",

  ZHO: "ZHO_CN",
  ZH: "ZHO_CN",
  ZH_CN: "ZHO_CN",
  ZH_TW: "ZHO_TW",
};

function extractHeroLanguage(
  value: unknown,
): string {
  if (typeof value === "string") {
    const text = value.trim();

    if (
      text.startsWith("{") &&
      text.endsWith("}")
    ) {
      try {
        return extractHeroLanguage(
          JSON.parse(text),
        );
      } catch {
        return text;
      }
    }

    return text;
  }

  if (
    value &&
    typeof value === "object"
  ) {
    const item =
      value as Record<string, unknown>;

    return [
      item.code,
      item.languageCode,
      item.locale,
      item.value,
      item.name,
      item.label,
    ]
      .filter(Boolean)
      .map(String)
      .join(" ");
  }

  return "";
}

export function resolveHeroLanguage(
  value: unknown,
): string {
  const raw = extractHeroLanguage(value)
    .trim()
    .toUpperCase()
    .replace(/-/g, "_");

  if (!raw) return "ENG";

  if (HERO_ALIASES[raw]) {
    return HERO_ALIASES[raw];
  }

  if (HERO_CONTENT[raw]) {
    return raw;
  }

  const base = raw.split("_")[0];

  if (HERO_ALIASES[base]) {
    return HERO_ALIASES[base];
  }

  if (HERO_CONTENT[base]) {
    return base;
  }

  return "ENG";
}

export function getHeroContent(
  value: unknown,
): HeroContent {
  const language =
    resolveHeroLanguage(value);

  return (
    HERO_CONTENT[language] ??
    HERO_CONTENT.ENG
  );
}
