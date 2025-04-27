
import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { DreamInput } from "@/components/DreamInput";
import { DreamAnalysisResult } from "@/components/DreamAnalysisResult";
import { LoadingState } from "@/components/LoadingState";
import { StarryBackground } from "@/components/StarryBackground";
import { DreamAnalysis } from "@/services/dreamAnalyzer";

const Index = () => {
  const [dreamAnalysis, setDreamAnalysis] = useState<DreamAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisComplete = (analysis: DreamAnalysis) => {
    setDreamAnalysis(analysis);
    // Scroll to results with smooth animation
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col w-full pb-20">
      <StarryBackground />
      
      <Header />
      
      <main className="flex-1 container px-4 md:px-6">
        <Hero />
        
        <div className="py-8">
          <DreamInput 
            onAnalysisComplete={handleAnalysisComplete} 
            setIsLoading={setIsLoading} 
          />
        </div>
        
        {isLoading && <LoadingState />}
        
        {!isLoading && dreamAnalysis && (
          <div className="py-8">
            <DreamAnalysisResult analysis={dreamAnalysis} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
