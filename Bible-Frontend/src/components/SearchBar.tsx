import { Search } from "lucide-react";
import { useState } from "react";
import { popularVerses } from "@/data/bibleData";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Enter Verse (Example: John 3:16 or యోహాను 3:16)'
          className="w-full px-6 py-4 pr-14 text-lg font-serif rounded-full border-2 border-gold/40 bg-cream text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 book-shadow"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold text-primary-foreground flex items-center justify-center hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/30"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      {/* Popular verses */}
      <div className="flex flex-wrap justify-center gap-2 mt-5">
        {popularVerses.map((verse) => (
          <button
            key={verse}
            onClick={() => {
              setQuery(verse);
              onSearch(verse);
            }}
            className="px-3 py-1.5 text-sm font-serif border border-gold/30 rounded-full text-brown hover:bg-gold/10 hover:border-gold/60 transition-all duration-200"
          >
            {verse}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
