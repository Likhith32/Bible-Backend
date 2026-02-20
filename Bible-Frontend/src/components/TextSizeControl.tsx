import { Minus, Plus } from "lucide-react";

interface TextSizeControlProps {
  fontSize: number;
  onSizeChange: (size: number) => void;
}

const TextSizeControl = ({ fontSize, onSizeChange }: TextSizeControlProps) => {
  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <span className="text-sm font-serif text-muted-foreground">Adjust Text Size</span>
      <button
        onClick={() => onSizeChange(Math.max(14, fontSize - 2))}
        className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-brown hover:bg-gold/10 transition-colors"
        aria-label="Decrease text size"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="font-serif text-sm text-brown min-w-[3ch] text-center">{fontSize}</span>
      <button
        onClick={() => onSizeChange(Math.min(32, fontSize + 2))}
        className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-brown hover:bg-gold/10 transition-colors"
        aria-label="Increase text size"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TextSizeControl;
