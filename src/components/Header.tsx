
import { Moon } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full relative z-10">
      <div className="container flex justify-between items-center py-6">
        <div className="flex items-center gap-2">
          <Moon className="h-6 w-6 text-dream-light-purple" />
          <h1 className="text-2xl font-semibold text-white">
            <span className="text-dream-light-purple">Dream</span>Analyzer
          </h1>
        </div>
      </div>
    </header>
  );
};
