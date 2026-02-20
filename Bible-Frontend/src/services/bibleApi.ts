import { BiblePassage } from "@/data/bibleData";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

interface ApiVerseResponse {
  verse: number;
  textEnglish: string | null;
  textTelugu: string | null;
}

interface ApiSearchResponse {
  bookEnglish: string;
  bookTelugu: string | null;
  chapter: number;
  verses: ApiVerseResponse[];
}

export const searchBibleApi = async (query: string): Promise<BiblePassage | null> => {
  try {
    const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      console.error("Search failed:", response.statusText);
      return null;
    }

    const data: ApiSearchResponse = await response.json();

    const passage: BiblePassage = {
      reference: `${data.bookEnglish} ${data.chapter}`,
      bookEnglish: data.bookEnglish,
      bookTelugu: data.bookTelugu || data.bookEnglish,
      chapter: data.chapter,
      verses: data.verses.map((v) => ({
        book: data.bookEnglish,
        chapter: data.chapter,
        verse: v.verse,
        textEnglish: v.textEnglish || "",
        textTelugu: v.textTelugu || "",
      })),
    };

    return passage;
  } catch (error) {
    console.error("Error connecting to Bible API:", error);
    return null;
  }
};
