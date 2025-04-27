
import { Moon } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 animate-fade-in">
      <div className="relative">
        <Moon className="h-12 w-12 text-dream-light-purple animate-pulse-slow" />
        <div className="absolute inset-0 bg-dream-light-purple/10 rounded-full blur-xl animate-pulse-slow"></div>
      </div>
      <p className="text-dream-light-purple text-xl font-medium">Analyzing your dream...</p>
      <p className="text-white/60 text-center max-w-sm">
        Our AI is interpreting symbols and patterns in your dream description
      </p>
    </div>
  );
};
