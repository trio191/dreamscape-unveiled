
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a full implementation, we would apply the theme change to the document
    // For now, this is just a UI component
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Sun className="h-4 w-4 text-dream-light-purple opacity-70" />
      <Switch 
        checked={isDarkMode} 
        onCheckedChange={toggleTheme}
        className="bg-dream-deep-purple/50 data-[state=checked]:bg-dream-light-purple/70" 
      />
      <Moon className="h-4 w-4 text-dream-light-purple" />
    </div>
  );
};
