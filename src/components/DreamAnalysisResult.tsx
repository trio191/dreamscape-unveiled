
import { DreamAnalysis } from "@/services/dreamAnalyzer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Book } from "lucide-react";

interface DreamAnalysisResultProps {
  analysis: DreamAnalysis;
}

export const DreamAnalysisResult = ({ analysis }: DreamAnalysisResultProps) => {
  if (!analysis) return null;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in">
      <Card className="bg-card/70 border-dream-purple/30 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl text-dream-light-purple flex items-center gap-2">
              <Book className="h-6 w-6" />
              Dream Analysis
            </CardTitle>
            <Badge 
              variant="outline" 
              className="bg-dream-purple/20 text-dream-light-purple border-dream-light-purple/20 px-3 py-1"
            >
              {analysis.dreamType}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-6">
          {/* Interpretation */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-dream-light-purple/90">Interpretation</h3>
            <div className="text-white/90 leading-relaxed">
              {analysis.interpretation}
            </div>
          </div>

          {/* Emotions */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-dream-light-purple/90">Emotions Detected</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.emotions.map((emotion, index) => (
                <Badge 
                  key={index} 
                  className="bg-dream-deep-purple/40 hover:bg-dream-deep-purple/60 text-white"
                >
                  {emotion}
                </Badge>
              ))}
            </div>
          </div>

          {/* Symbols */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-dream-light-purple/90">Dream Symbols</h3>
            <Accordion type="single" collapsible className="w-full">
              {analysis.symbols.map((symbol, index) => (
                <AccordionItem key={index} value={`symbol-${index}`} className="border-dream-purple/20">
                  <AccordionTrigger className="text-white hover:text-dream-light-purple">
                    {symbol.symbol}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80">
                    {symbol.meaning}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
