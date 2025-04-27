
import { Moon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

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
        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="text-white/80 hover:text-white transition-colors">Home</a>
          <a href="/meanings" className="text-white/80 hover:text-white transition-colors">Dream Meanings</a>
          <a href="/consultant" className="text-white/80 hover:text-white transition-colors">Consult an Expert</a>
        </nav>
        <ThemeToggle className="hidden md:flex" />
      </div>
    </header>
  );
};
