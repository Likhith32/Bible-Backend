import { Cross } from "lucide-react";

const BibleHeader = () => {
  return (
    <header className="text-center py-8 md:py-12 relative">
      {/* Subtle cross icon */}
      <div className="flex justify-center mb-4">
        <Cross className="w-10 h-10 text-gold opacity-60" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-serif font-bold text-brown-dark tracking-wide">
        Holy Bible
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-lg md:text-xl text-muted-foreground font-serif italic tracking-wider">
        English &amp; Telugu Scripture Reading
      </p>

      {/* Golden divider */}
      <div className="golden-divider max-w-xs mx-auto mt-6" />
    </header>
  );
};

export default BibleHeader;
