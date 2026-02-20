import { BiblePassage, dailyDevotional } from "@/data/bibleData";
import { Volume2, BookOpen, Heart } from "lucide-react";

interface DevotionalSectionProps {
  passage: BiblePassage | null;
}

const DevotionalSection = ({ passage }: DevotionalSectionProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 mt-10 space-y-6 fade-slide-up">
      {/* Listen button */}
      {passage && (
        <div className="text-center">
          <button className="inline-flex items-center gap-2 px-6 py-2.5 font-serif text-gold border-2 border-gold/40 rounded-full hover:bg-gold/10 hover:border-gold transition-all duration-300 hover:shadow-md hover:shadow-gold/20">
            <Volume2 className="w-5 h-5" />
            Listen to this verse
          </button>
        </div>
      )}

      {/* Reflection */}
      {passage?.reflection && (
        <div className="book-page book-shadow rounded-lg p-6 md:p-8 border-2 border-gold/20">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-maroon" />
            <h3 className="font-serif text-xl font-semibold text-brown-dark">Reflection Thought</h3>
          </div>
          <p className="font-serif text-lg italic text-foreground/80 leading-relaxed">
            "{passage.reflection}"
          </p>
        </div>
      )}

      {/* Related verses */}
      {passage?.relatedVerses && (
        <div className="book-page book-shadow rounded-lg p-6 border border-gold/20">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-xl font-semibold text-brown-dark">Related Verses</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {passage.relatedVerses.map((ref) => (
              <span key={ref} className="px-3 py-1 text-sm font-serif border border-gold/30 rounded-full text-brown bg-cream">
                {ref}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Daily devotional (always shown) */}
      <div className="book-page book-shadow rounded-lg p-6 md:p-8 border-2 border-gold/30">
        <h3 className="font-serif text-xl font-semibold text-brown-dark mb-4 text-center">
          ✝ Daily Devotional
        </h3>
        <blockquote className="font-serif text-lg italic text-center text-foreground/80 leading-relaxed mb-2">
          "{dailyDevotional.verse}"
        </blockquote>
        <p className="text-center text-telugu text-foreground/70 mb-2">
          {dailyDevotional.verseTelugu}
        </p>
        <p className="text-center text-sm font-serif text-gold font-semibold">
          — {dailyDevotional.verseRef}
        </p>
        <div className="golden-divider max-w-xs mx-auto" />
        <p className="font-serif text-base text-foreground/70 text-center leading-relaxed">
          {dailyDevotional.thought}
        </p>
      </div>
    </div>
  );
};

export default DevotionalSection;
