import { useEffect, useState } from "react";
import { BiblePassage } from "@/data/bibleData";

interface VerseDisplayProps {
  passage: BiblePassage;
  fontSize: number;
}

const VerseDisplay = ({ passage, fontSize }: VerseDisplayProps) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [showControls, setShowControls] = useState(false);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speakVerse = (text: string) => {
    if (!window.speechSynthesis) {
      alert("Speech synthesis not supported.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = rate;
    utterance.pitch = pitch;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="page-flip-enter mt-8 px-4">
      {/* Book reference header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-brown-dark">
          {passage.bookEnglish} — {passage.bookTelugu}
        </h2>
        <p className="text-gold font-serif mt-1">Chapter {passage.chapter}</p>
        <div className="golden-divider max-w-xs mx-auto" />
      </div>

      {/* 🎧 Voice Settings Toggle */}
      <div className="text-center mb-4">
        <button
          onClick={() => setShowControls(!showControls)}
          className="text-sm font-serif text-maroon underline underline-offset-4 hover:text-gold transition-colors duration-200 cursor-pointer"
        >
          🎧 {showControls ? "Hide Voice Settings" : "Voice Settings"}
        </button>
      </div>

      {/* 🔊 Voice Controls Panel */}
      {showControls && (
        <div
          className="mt-2 mb-6 max-w-4xl mx-auto
            bg-gradient-to-br from-maroon/5 to-gold/5
            backdrop-blur-md
            border border-maroon/20
            rounded-2xl
            shadow-xl
            p-6
            animate-fadeSlide"
        >
          <div className="grid md:grid-cols-3 gap-4 text-sm font-serif">
            {/* Voice Selector */}
            <div>
              <label className="block mb-1 font-medium">Voice</label>
              <select
                className="w-full px-3 py-2 rounded-lg
                  bg-white/70 backdrop-blur-sm
                  border border-maroon/30
                  shadow-inner
                  focus:outline-none focus:ring-2 focus:ring-gold/50
                  transition"
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
              >
                <option value="">Default Voice</option>
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            {/* Speed Control */}
            <div>
              <label className="block mb-1 font-medium">
                Speed: {rate.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full accent-maroon cursor-pointer"
              />
            </div>

            {/* Pitch Control */}
            <div>
              <label className="block mb-1 font-medium">
                Pitch: {pitch.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(Number(e.target.value))}
                className="w-full accent-maroon cursor-pointer"
              />
            </div>
          </div>

          {/* Stop Button */}
          <div className="text-center">
            <button
              onClick={stopSpeaking}
              className="mt-4 px-6 py-2 rounded-full
                bg-maroon text-white
                shadow-md hover:shadow-lg
                hover:scale-105
                transition-all duration-300 cursor-pointer"
            >
              ⏹ Stop Reading
            </button>
          </div>
        </div>
      )}

      {/* Open book layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 relative">
        {/* Center spine shadow on desktop */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(18 30% 28% / 0.08), hsl(18 30% 28% / 0.15), hsl(18 30% 28% / 0.08), transparent)",
          }}
        />

        {/* Telugu (Left Page) */}
        <div className="book-page book-shadow rounded-l-lg md:rounded-r-none rounded-r-lg md:border-r-0 p-6 md:p-10 relative cross-watermark">
          <h3 className="text-center font-serif text-lg font-semibold text-maroon mb-4 tracking-wider uppercase">
            {passage.bookTelugu}
          </h3>
          <div
            className="text-telugu leading-relaxed"
            style={{ fontSize: `${fontSize}px`, lineHeight: "1.9" }}
          >
            {passage.verses.map((v, i) => (
              <span key={v.verse}>
                <sup className="verse-number">{v.verse}</sup>
                <span className={i === 0 ? "drop-cap" : ""}>
                  {v.textTelugu}
                </span>{" "}
              </span>
            ))}
          </div>
          <div className="mt-5 text-center">
            <button
              onClick={() => {
                const teluguText = passage.verses
                  .map((v) => v.textTelugu)
                  .join(" ");
                speakVerse(teluguText);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-serif font-medium
                bg-maroon/10 text-maroon border border-maroon/20
                hover:bg-maroon/20 hover:border-maroon/40 transition-all duration-200 cursor-pointer"
            >
              🔊 వినండి
            </button>
          </div>
        </div>

        {/* English (Right Page) */}
        <div className="book-page book-shadow rounded-r-lg md:rounded-l-none rounded-l-lg p-6 md:p-10 relative cross-watermark">
          <h3 className="text-center font-serif text-lg font-semibold text-maroon mb-4 tracking-wider uppercase">
            {passage.bookEnglish} (KJV)
          </h3>
          <div
            className="font-serif leading-relaxed"
            style={{ fontSize: `${fontSize}px`, lineHeight: "1.9" }}
          >
            {passage.verses.map((v, i) => (
              <span key={v.verse}>
                <sup className="verse-number">{v.verse}</sup>
                <span className={i === 0 ? "drop-cap" : ""}>
                  {v.textEnglish}
                </span>{" "}
              </span>
            ))}
          </div>
          <div className="mt-5 text-center">
            <button
              onClick={() => {
                const englishText = passage.verses
                  .map((v) => v.textEnglish)
                  .join(" ");
                speakVerse(englishText);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-serif font-medium
                bg-maroon/10 text-maroon border border-maroon/20
                hover:bg-maroon/20 hover:border-maroon/40 transition-all duration-200 cursor-pointer"
            >
              🔊 Listen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerseDisplay;
