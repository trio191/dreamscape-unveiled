
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzeDream, DreamAnalysis } from "@/services/dreamAnalyzer";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DreamInputProps {
  onAnalysisComplete: (analysis: DreamAnalysis) => void;
  setIsLoading: (loading: boolean) => void;
}

const dreamTypes = [
  "Nightmare",
  "Wishful Dream",
  "Anxiety Dream",
  "Processing Dream",
  "Lucid Dream",
  "Recurring Dream",
  "Prophetic Dream"
];

export const DreamInput = ({ onAnalysisComplete, setIsLoading }: DreamInputProps) => {
  const [dreamText, setDreamText] = useState("");
  const [dreamType, setDreamType] = useState("");
  const [userName, setUserName] = useState("");
  const [step, setStep] = useState(1); // 1: Dream text, 2: User name, 3: Share permission

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!dreamText || dreamText.trim().length < 20) {
        toast.error("Please enter a detailed dream description (at least 20 characters)");
        return;
      }
      setStep(2);
      return;
    }
    
    if (step === 2) {
      if (!userName || userName.trim() === "") {
        toast.error("Please enter your name");
        return;
      }
      setStep(3);
      return;
    }
    
    // Step 3: Process the dream analysis
    try {
      setIsLoading(true);
      const analysis = await analyzeDream(dreamText);
      
      // Override dream type if user selected one
      if (dreamType) {
        analysis.dreamType = dreamType as any;
      }
      
      onAnalysisComplete(analysis);
      toast.success("Dream analyzed successfully!");
      
      // For sharing functionality, we would need to connect to a backend
      // This is just a placeholder for now
      // if (sharePublicly) {
      //   // Save to public dreams
      // } else {
      //   // Save to user's private dreams (would require login)
      // }
    } catch (error) {
      console.error("Error analyzing dream:", error);
      toast.error("Failed to analyze dream. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
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
            
            <div className="space-y-3">
              <Label htmlFor="dream-type" className="block text-md font-medium text-dream-light-purple">
                Dream type (optional)
              </Label>
              <Select value={dreamType} onValueChange={setDreamType}>
                <SelectTrigger className="bg-muted/70 text-white border-dream-purple/30">
                  <SelectValue placeholder="Select dream type (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {dreamTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-dream-purple hover:bg-dream-light-purple text-white font-medium py-6"
            >
              Continue
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <div className="space-y-3">
              <label 
                htmlFor="name-input" 
                className="block text-xl font-medium text-dream-light-purple"
              >
                What's your name?
              </label>
              <input
                id="name-input"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-muted/70 text-white border border-dream-purple/30 rounded px-4 py-2 focus:border-dream-light-purple outline-none"
              />
            </div>
            <div className="flex gap-4">
              <Button 
                type="button" 
                onClick={goBack}
                variant="outline"
                className="flex-1 border-dream-purple/30 text-white hover:bg-dream-purple/20"
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-dream-purple hover:bg-dream-light-purple text-white font-medium"
              >
                Continue
              </Button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="space-y-4">
              <h3 className="block text-xl font-medium text-dream-light-purple">
                Would you like to share your dream publicly?
              </h3>
              <p className="text-white/70">
                Sharing your dream publicly allows others to learn from your experience.
                Your dream interpretation will be visible on our public dreams page.
              </p>
              <div className="flex gap-4">
                <Button 
                  type="button" 
                  onClick={goBack}
                  variant="outline"
                  className="flex-1 border-dream-purple/30 text-white hover:bg-dream-purple/20"
                >
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={handleSubmit}
                  variant="outline"
                  className="flex-1 border-dream-light-purple text-dream-light-purple hover:bg-dream-light-purple/20"
                >
                  Keep Private
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-dream-purple hover:bg-dream-light-purple text-white font-medium"
                >
                  Share Publicly
                </Button>
              </div>
              <p className="text-white/60 text-sm text-center mt-2">
                Note: To save private dreams, you'll need to create an account.
              </p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      {renderStep()}
    </form>
  );
};
