import { useState } from "react";
import BibleHeader from "@/components/BibleHeader";
import SearchBar from "@/components/SearchBar";
import VerseDisplay from "@/components/VerseDisplay";
import DevotionalSection from "@/components/DevotionalSection";
import TextSizeControl from "@/components/TextSizeControl";
import BibleFooter from "@/components/BibleFooter";
import { BiblePassage, searchBible } from "@/data/bibleData";
import { searchBibleApi } from "@/services/bibleApi";
import parchmentBg from "@/assets/parchment-bg.jpg";

const Index = () => {
  const [passage, setPassage] = useState<BiblePassage | null>(null);
  const [fontSize, setFontSize] = useState(20);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setNotFound(false);
    
    try {
      // Try API first
      const apiResult = await searchBibleApi(query);
      if (apiResult) {
        setPassage(apiResult);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("API error:", error);
    }

    // Fallback to local data
    const localResult = searchBible(query);
    if (localResult) {
      setPassage(localResult);
    } else {
      setPassage(null);
      setNotFound(true);
    }
    
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundImage: `url(${parchmentBg})`, backgroundSize: "cover", backgroundAttachment: "fixed" }}
    >
      <main className="flex-1 max-w-7xl mx-auto w-full pb-12">
        <BibleHeader />
        <SearchBar onSearch={handleSearch} />
        <TextSizeControl fontSize={fontSize} onSizeChange={setFontSize} />

        {loading && (
          <div className="text-center mt-10 fade-slide-up">
            <p className="font-serif text-lg text-maroon">
              Loading verses...
            </p>
          </div>
        )}

        {notFound && !loading && (
          <div className="text-center mt-10 fade-slide-up">
            <p className="font-serif text-lg text-maroon">
              Verse not found. Try: John 3:16, Psalm 23, Proverbs 3:5-6
            </p>
          </div>
        )}

        {passage && !loading && <VerseDisplay passage={passage} fontSize={fontSize} />}

        <DevotionalSection passage={passage} />
      </main>

      <BibleFooter />
    </div>
  );
};

export default Index;
