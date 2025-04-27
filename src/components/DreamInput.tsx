
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzeDream, DreamAnalysis } from "@/services/dreamAnalyzer";
import { toast } from "sonner";

interface DreamInputProps {
  onAnalysisComplete: (analysis: DreamAnalysis) => void;
  setIsLoading: (loading: boolean) => void;
}

export const DreamInput = ({ onAnalysisComplete, setIsLoading }: DreamInputProps) => {
  const [dreamText, setDreamText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dreamText || dreamText.trim().length < 20) {
      toast.error("Please enter a detailed dream description (at least 20 characters)");
      return;
    }
    
    try {
      setIsLoading(true);
      const analysis = await analyzeDream(dreamText);
      onAnalysisComplete(analysis);
      toast.success("Dream analyzed successfully!");
    } catch (error) {
      console.error("Error analyzing dream:", error);
      toast.error("Failed to analyze dream. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="space-y-3">
        <label 
          htmlFor="dream-input" 
          className="block text-xl font-medium text-dream-light-purple"
        >
          Describe your dream
        </label>
        <Textarea
          id="dream-input"
          value={dreamText}
          onChange={(e) => setDreamText(e.target.value)}
          placeholder="I was floating above a city I didn't recognize. The buildings were made of crystal and glowed with an inner light..."
          className="min-h-[200px] bg-muted/70 text-white border-dream-purple/30 placeholder:text-muted-foreground focus:border-dream-light-purple"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-dream-purple hover:bg-dream-light-purple text-white font-medium py-6"
      >
        Analyze My Dream
      </Button>
    </form>
  );
};
