
import { Moon } from "lucide-react";

export const Hero = () => {
  return (
    <div className="text-center space-y-4 py-12 md:py-16 animate-fade-in max-w-3xl mx-auto">
      <div className="relative mx-auto w-16 h-16 mb-6">
        <Moon className="w-16 h-16 text-dream-light-purple animate-float" />
        <div className="absolute inset-0 bg-dream-light-purple/20 rounded-full blur-xl animate-pulse-slow"></div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white">
        Unlock the Meaning of Your <span className="text-dream-light-purple">Dreams</span>
      </h1>
      <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
        Enter your dream description and our AI will analyze the symbols, emotions,
        and patterns to provide personalized insights into your subconscious mind.
      </p>
    </div>
  );
};
