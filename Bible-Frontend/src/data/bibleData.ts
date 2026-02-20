// Sample Bible data for demonstration
export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  textEnglish: string;
  textTelugu: string;
}

export interface BiblePassage {
  reference: string;
  bookEnglish: string;
  bookTelugu: string;
  chapter: number;
  verses: BibleVerse[];
  reflection?: string;
  relatedVerses?: string[];
}

const sampleData: Record<string, BiblePassage> = {
  "john 3:16": {
    reference: "John 3:16",
    bookEnglish: "John",
    bookTelugu: "యోహాను",
    chapter: 3,
    verses: [
      {
        book: "John",
        chapter: 3,
        verse: 16,
        textEnglish: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
        textTelugu: "దేవుడు లోకమును ఎంతో ప్రేమించెను గనుక ఆయన తన అద్వితీయ కుమారుని ఇచ్చెను; ఆయనయందు విశ్వాసముంచు ప్రతివాడును నశింపక నిత్యజీవము పొందును.",
      },
    ],
    reflection: "God's love is not limited or conditional — it is vast, sacrificial, and eternal. This verse reminds us that salvation is a gift of grace through faith.",
    relatedVerses: ["Romans 5:8", "1 John 4:9", "Ephesians 2:8-9"],
  },
  "psalm 23": {
    reference: "Psalm 23",
    bookEnglish: "Psalms",
    bookTelugu: "కీర్తనల గ్రంథము",
    chapter: 23,
    verses: [
      { book: "Psalms", chapter: 23, verse: 1, textEnglish: "The LORD is my shepherd; I shall not want.", textTelugu: "యెహోవా నా కాపరి, నాకు లేమి కలుగదు." },
      { book: "Psalms", chapter: 23, verse: 2, textEnglish: "He maketh me to lie down in green pastures: he leadeth me beside the still waters.", textTelugu: "ఆయన పచ్చికగల చోట్లలో నన్ను పరుండజేయును, ప్రశాంతమైన జలముల యొద్దకు నన్ను నడిపించును." },
      { book: "Psalms", chapter: 23, verse: 3, textEnglish: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.", textTelugu: "ఆయన నా ప్రాణమును తెప్పరిల్లజేయును, తన నామము నిమిత్తము నీతిమార్గములలో నన్ను నడిపించును." },
      { book: "Psalms", chapter: 23, verse: 4, textEnglish: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.", textTelugu: "గాఢాంధకారపు లోయలో నేను సంచరించినను ఏ అపాయమునకు భయపడను; నీవు నాకు తోడై యుందువు, నీ దుడ్డుకఱ్ఱయు నీ చేతికఱ్ఱయు నన్ను ఆదరించును." },
      { book: "Psalms", chapter: 23, verse: 5, textEnglish: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.", textTelugu: "నా శత్రువుల యెదుట నీవు నాకు భోజనము సిద్ధపరచుదువు, నూనెతో నా తలను అభిషేకించుదువు; నా గిన్నె నిండి పొర్లుచున్నది." },
      { book: "Psalms", chapter: 23, verse: 6, textEnglish: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.", textTelugu: "నా జీవితకాలమంతయు మేలును కృపయు నన్ను వెంబడించును; చాలాకాలము యెహోవా మందిరములో నేను నివసించెదను." },
    ],
    reflection: "The Lord is our protector and provider. In times of trouble and in times of abundance, His presence is our comfort and our peace.",
    relatedVerses: ["Isaiah 40:11", "John 10:11", "Psalm 91:1-2"],
  },
  "matthew 5:3-12": {
    reference: "Matthew 5:3-12",
    bookEnglish: "Matthew",
    bookTelugu: "మత్తయి",
    chapter: 5,
    verses: [
      { book: "Matthew", chapter: 5, verse: 3, textEnglish: "Blessed are the poor in spirit: for theirs is the kingdom of heaven.", textTelugu: "ఆత్మవిషయమై దీనులైనవారు ధన్యులు; పరలోకరాజ్యము వారిది." },
      { book: "Matthew", chapter: 5, verse: 4, textEnglish: "Blessed are they that mourn: for they shall be comforted.", textTelugu: "దుఃఖపడువారు ధన్యులు; వారు ఓదార్చబడుదురు." },
      { book: "Matthew", chapter: 5, verse: 5, textEnglish: "Blessed are the meek: for they shall inherit the earth.", textTelugu: "సాత్వికులు ధన్యులు; వారు భూమిని స్వతంత్రించుకొందురు." },
      { book: "Matthew", chapter: 5, verse: 6, textEnglish: "Blessed are they which do hunger and thirst after righteousness: for they shall be filled.", textTelugu: "నీతికొరకు ఆకలిదప్పులు గలవారు ధన్యులు; వారు తృప్తిపరచబడుదురు." },
    ],
    reflection: "The Beatitudes reveal God's upside-down kingdom where the humble, the mourning, and the meek are truly blessed.",
    relatedVerses: ["Luke 6:20-23", "James 4:10", "Psalm 37:11"],
  },
  "genesis 1:1": {
    reference: "Genesis 1:1",
    bookEnglish: "Genesis",
    bookTelugu: "ఆదికాండము",
    chapter: 1,
    verses: [
      { book: "Genesis", chapter: 1, verse: 1, textEnglish: "In the beginning God created the heaven and the earth.", textTelugu: "ఆదియందు దేవుడు భూమ్యాకాశములను సృజించెను." },
    ],
    reflection: "Everything begins with God. He is the author of creation, the beginning and the end.",
    relatedVerses: ["John 1:1-3", "Hebrews 11:3", "Colossians 1:16"],
  },
  "proverbs 3:5-6": {
    reference: "Proverbs 3:5-6",
    bookEnglish: "Proverbs",
    bookTelugu: "సామెతలు",
    chapter: 3,
    verses: [
      { book: "Proverbs", chapter: 3, verse: 5, textEnglish: "Trust in the LORD with all thine heart; and lean not unto thine own understanding.", textTelugu: "నీ పూర్ణహృదయముతో యెహోవాయందు నమ్మకముంచుము, నీ స్వబుద్ధిని ఆధారము చేసికొనకుము." },
      { book: "Proverbs", chapter: 3, verse: 6, textEnglish: "In all thy ways acknowledge him, and he shall direct thy paths.", textTelugu: "నీ ప్రవర్తన అంతటియందు ఆయన అధికారమునకు ఒప్పుకొనుము, అప్పుడు ఆయన నీ త్రోవలను సరాళము చేయును." },
    ],
    reflection: "True wisdom begins with trusting God above our own limited understanding. When we surrender to His guidance, He makes our paths straight.",
    relatedVerses: ["Psalm 37:5", "Isaiah 55:8-9", "Jeremiah 29:11"],
  },
};

export function searchBible(query: string): BiblePassage | null {
  const normalized = query.trim().toLowerCase();
  
  // Direct match
  if (sampleData[normalized]) return sampleData[normalized];
  
  // Partial match
  for (const key of Object.keys(sampleData)) {
    if (key.includes(normalized) || normalized.includes(key)) {
      return sampleData[key];
    }
  }

  // Telugu book name mapping
  const teluguMap: Record<string, string> = {
    "యోహాను": "john",
    "కీర్తనలు": "psalm",
    "మత్తయి": "matthew",
    "ఆదికాండము": "genesis",
    "సామెతలు": "proverbs",
  };

  for (const [telugu, english] of Object.entries(teluguMap)) {
    if (normalized.includes(telugu)) {
      const replaced = normalized.replace(telugu, english);
      for (const key of Object.keys(sampleData)) {
        if (key.includes(replaced.trim())) return sampleData[key];
      }
    }
  }

  return null;
}

export const dailyDevotional = {
  verse: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
  verseRef: "Matthew 11:28",
  verseTelugu: "ప్రయాసపడి భారము మోసికొనుచున్న సమస్త జనులారా, నా యొద్దకు రండి; నేను మీకు విశ్రాంతి కలుగజేతును.",
  thought: "In the midst of life's burdens, Jesus extends an invitation of rest and peace. His yoke is easy, and His burden is light. Come as you are.",
};

export const popularVerses = [
  "John 3:16",
  "Psalm 23",
  "Proverbs 3:5-6",
  "Genesis 1:1",
  "Matthew 5:3-12",
];
