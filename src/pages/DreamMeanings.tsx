
import { useState } from "react";
import { Header } from "@/components/Header";
import { StarryBackground } from "@/components/StarryBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Sample dream meanings data
const dreamMeanings = [
  {
    id: 1,
    symbol: "Falling",
    type: "Nightmare",
    meaning: "Dreams about falling often indicate a lack of control or fear of failure in some aspect of your life. You may feel overwhelmed or that a situation is slipping away from you."
  },
  {
    id: 2,
    symbol: "Flying",
    type: "Wishful Dream",
    meaning: "Flying in dreams typically represents freedom, breaking free from limitations, or gaining a new perspective on situations in your life."
  },
  {
    id: 3,
    symbol: "Being Chased",
    type: "Anxiety Dream",
    meaning: "Being chased in a dream often symbolizes avoidance. You may be running from an issue, person, or emotion in your waking life rather than confronting it."
  },
  {
    id: 4,
    symbol: "Teeth Falling Out",
    type: "Anxiety Dream",
    meaning: "Dreams about losing teeth commonly relate to concerns about appearance, communication issues, or fear of embarrassment in social situations."
  },
  {
    id: 5,
    symbol: "Taking a Test",
    type: "Anxiety Dream",
    meaning: "Test dreams usually occur when you feel you're being evaluated or are unprepared for a challenge in your waking life."
  },
  {
    id: 6,
    symbol: "Meeting a Celebrity",
    type: "Wishful Dream",
    meaning: "Celebrity dreams can represent qualities you admire or wish to embody, or they might reflect your desire for recognition and admiration."
  }
];

// Dream types for filtering
const dreamTypes = [
  "All",
  "Nightmare",
  "Wishful Dream",
  "Anxiety Dream",
  "Processing Dream",
  "Lucid Dream",
  "Recurring Dream",
  "Prophetic Dream"
];

const DreamMeanings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  // Filter dreams based on search term and selected type
  const filteredDreams = dreamMeanings.filter(dream => {
    const matchesSearch = dream.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         dream.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || dream.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col w-full pb-20">
      <StarryBackground />
      <Header />
      
      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-center text-white mb-2">
            Common <span className="text-dream-light-purple">Dream</span> Meanings
          </h1>
          <p className="text-white/70 text-center mb-8 max-w-2xl mx-auto">
            Explore our collection of common dreams and their interpretations. Understanding these symbols can provide valuable insights into your subconscious mind.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-dream-light-purple/70" />
              <Input 
                type="text" 
                placeholder="Search dreams..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted/70 text-white border-dream-purple/30 placeholder:text-muted-foreground focus:border-dream-light-purple"
              />
            </div>
            
            <div className="md:w-1/3">
              <RadioGroup 
                value={selectedType} 
                onValueChange={setSelectedType}
                className="flex flex-wrap gap-2"
              >
                {dreamTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={type} 
                      id={type} 
                      className="text-dream-light-purple"
                    />
                    <label 
                      htmlFor={type} 
                      className="text-sm text-white cursor-pointer"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDreams.length > 0 ? (
              filteredDreams.map((dream) => (
                <Card key={dream.id} className="bg-card/70 border-dream-purple/30 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl text-dream-light-purple">{dream.symbol}</CardTitle>
                      <span className="text-xs bg-dream-purple/20 text-dream-light-purple px-2 py-1 rounded">
                        {dream.type}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-white/90">
                    <p>{dream.meaning}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-10 text-white/60">
                No dreams found matching your criteria. Try adjusting your search.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DreamMeanings;
