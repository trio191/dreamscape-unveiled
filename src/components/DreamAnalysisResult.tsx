
import { DreamAnalysis, ReligiousInterpretation } from "@/services/dreamAnalyzer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Book, Cross, Bookmark, Church, HelpCircle } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface DreamAnalysisResultProps {
  analysis: DreamAnalysis;
}

export const DreamAnalysisResult = ({ analysis }: DreamAnalysisResultProps) => {
  if (!analysis) return null;

  // Helper function to get the appropriate icon for a religion
  const getReligionIcon = (iconName: string) => {
    switch (iconName) {
      case "mosque":
        return <Church className="h-5 w-5" />;
      case "lotus":
        return <Bookmark className="h-5 w-5" />;
      case "cross":
        return <Cross className="h-5 w-5" />;
      default:
        return <Book className="h-5 w-5" />;
    }
  };

  // Religion color mapping for consistent UI
  const religionColorMap = {
    "Islamic": "bg-dream-deep-purple/40 text-white hover:bg-dream-deep-purple/60",
    "Hindu": "bg-dream-light-purple/40 text-white hover:bg-dream-light-purple/60",
    "Christian": "bg-dream-purple/40 text-white hover:bg-dream-purple/60",
  };

  // Info tooltips for each religion
  const religionInfo = {
    "Islamic": "Islamic dream interpretation is based on traditional sources like the works of Ibn Sirin, a renowned 8th-century scholar.",
    "Hindu": "Hindu dream interpretation draws from Vedic texts and traditional beliefs about consciousness and spirituality.",
    "Christian": "Christian interpretation considers Biblical symbolism and traditional Christian understanding of dreams.",
  };

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

          {/* Religious Interpretations - Tab View for larger screens */}
          <div className="hidden md:block space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-dream-light-purple/90">Religious Perspectives</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-dream-light-purple/60 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-dream-deep-purple/80 border-dream-light-purple/30">
                    <p>Different religious traditions interpret dreams through their own spiritual lenses.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Tabs defaultValue="islamic" className="w-full">
              <TabsList className="bg-dream-deep-purple/30 border border-dream-purple/20">
                {analysis.religiousInterpretations.map((interp) => (
                  <TabsTrigger 
                    key={interp.religion} 
                    value={interp.religion.toLowerCase()}
                    className="data-[state=active]:bg-dream-purple/40 data-[state=active]:text-white"
                  >
                    <div className="flex items-center gap-2">
                      {getReligionIcon(interp.iconName)}
                      <span>{interp.religion}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              {analysis.religiousInterpretations.map((interp) => (
                <TabsContent 
                  key={interp.religion} 
                  value={interp.religion.toLowerCase()}
                  className="mt-4 p-4 border border-dream-purple/20 rounded-md bg-dream-deep-purple/20 animate-fade-in"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-dream-light-purple flex items-center gap-2">
                        {getReligionIcon(interp.iconName)}
                        <span>{interp.religion} Interpretation</span>
                      </h4>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <span>
                            <HelpCircle className="h-4 w-4 text-dream-light-purple/60 cursor-help" />
                          </span>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 bg-dream-deep-purple/80 border-dream-light-purple/30">
                          <p className="text-sm">{religionInfo[interp.religion]}</p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <p className="text-white/90">{interp.interpretation}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {interp.keySymbols.map((symbol, index) => (
                        <Badge 
                          key={`${interp.religion}-${index}`} 
                          className={`${religionColorMap[interp.religion]}`}
                        >
                          {symbol}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Religious Interpretations - Carousel View for Mobile */}
          <div className="md:hidden space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium text-dream-light-purple/90">Religious Perspectives</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-dream-light-purple/60 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-dream-deep-purple/80 border-dream-light-purple/30">
                    <p>Different religious traditions interpret dreams through their own spiritual lenses.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Carousel className="w-full">
              <CarouselContent>
                {analysis.religiousInterpretations.map((interp) => (
                  <CarouselItem key={interp.religion}>
                    <div className="p-4 border border-dream-purple/20 rounded-md bg-dream-deep-purple/20">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-dream-light-purple flex items-center gap-2">
                            {getReligionIcon(interp.iconName)}
                            <span>{interp.religion} Interpretation</span>
                          </h4>
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <span>
                                <HelpCircle className="h-4 w-4 text-dream-light-purple/60 cursor-help" />
                              </span>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-72 bg-dream-deep-purple/80 border-dream-light-purple/30">
                              <p className="text-sm">{religionInfo[interp.religion]}</p>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                        <p className="text-white/90">{interp.interpretation}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {interp.keySymbols.map((symbol, index) => (
                            <Badge 
                              key={`${interp.religion}-${index}`} 
                              className={`${religionColorMap[interp.religion]}`}
                            >
                              {symbol}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-2">
                <CarouselPrevious className="mr-2 static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
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
