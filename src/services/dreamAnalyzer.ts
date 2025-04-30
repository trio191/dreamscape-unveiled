import { toast } from "sonner";

export interface DreamAnalysis {
  interpretation: string;
  dreamType: DreamType;
  symbols: DreamSymbol[];
  emotions: string[];
  religiousInterpretations: ReligiousInterpretation[];
}

export interface ReligiousInterpretation {
  religion: Religion;
  interpretation: string;
  keySymbols: string[];
  iconName: string;
}

export type Religion = "Islamic" | "Hindu" | "Christian";

export interface DreamSymbol {
  symbol: string;
  meaning: string;
}

export type DreamType = 
  | "Fear Dream"
  | "Wish Dream"
  | "Processing Dream"
  | "Nightmare"
  | "Lucid Dream"
  | "Recurring Dream"
  | "Prophetic Dream";

// This is a mock implementation that would be replaced with a real API call
export const analyzeDream = async (dreamText: string): Promise<DreamAnalysis> => {
  if (!dreamText || dreamText.trim().length < 20) {
    toast.error("Please enter a detailed dream description (at least 20 characters)");
    throw new Error("Dream text too short");
  }

  // Simulate API loading delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // In a production app, this would be a real API call to an LLM service
  // For this demo, we'll simulate the response with some logic based on the dream text
  
  const lowerDream = dreamText.toLowerCase();
  
  // Determine dream type based on keywords
  let dreamType: DreamType = "Processing Dream"; // default
  
  if (lowerDream.includes("afraid") || lowerDream.includes("scared") || 
      lowerDream.includes("terror") || lowerDream.includes("fear")) {
    dreamType = "Fear Dream";
  } else if (lowerDream.includes("wish") || lowerDream.includes("hope") || 
             lowerDream.includes("desire") || lowerDream.includes("want")) {
    dreamType = "Wish Dream";
  } else if (lowerDream.includes("chase") || lowerDream.includes("fall") || 
             lowerDream.includes("attack") || lowerDream.includes("die")) {
    dreamType = "Nightmare";
  } else if (lowerDream.includes("control") || lowerDream.includes("aware") || 
             lowerDream.includes("conscious") || lowerDream.includes("realize")) {
    dreamType = "Lucid Dream";
  } else if (lowerDream.includes("again") || lowerDream.includes("repeat") || 
             lowerDream.includes("same") || lowerDream.includes("always")) {
    dreamType = "Recurring Dream";
  } else if (lowerDream.includes("future") || lowerDream.includes("predict") || 
             lowerDream.includes("foresee") || lowerDream.includes("vision")) {
    dreamType = "Prophetic Dream";
  }

  // Generate interpretation based on dream text
  const interpretation = generateInterpretation(dreamText, dreamType);
  
  // Extract potential symbols
  const symbols = extractSymbols(dreamText);
  
  // Extract emotions
  const emotions = extractEmotions(dreamText);
  
  // Generate religious interpretations
  const religiousInterpretations = generateReligiousInterpretations(dreamText, symbols);

  return {
    interpretation,
    dreamType,
    symbols,
    emotions,
    religiousInterpretations
  };
};

// Helper functions for the mock implementation

const generateInterpretation = (dreamText: string, dreamType: DreamType): string => {
  const lowerDream = dreamText.toLowerCase();
  
  let baseInterpretation = "Your dream appears to reflect your current state of mind and recent experiences. ";
  
  if (dreamType === "Fear Dream") {
    baseInterpretation += "This fear-based dream suggests you may be experiencing anxiety or worry in your waking life. Consider what specific fears were represented and how they might relate to current challenges you're facing.";
  } else if (dreamType === "Wish Dream") {
    baseInterpretation += "This dream represents your deepest desires and hopes. The symbols and scenarios point to what you truly want to achieve or experience in your life.";
  } else if (dreamType === "Nightmare") {
    baseInterpretation += "This nightmare may be your mind processing difficult emotions or situations. Pay attention to what specifically frightened you as it could reveal underlying concerns.";
  } else if (dreamType === "Lucid Dream") {
    baseInterpretation += "Being aware within your dream demonstrates a connection between your conscious and subconscious mind. This awareness can be developed further through practice.";
  } else if (dreamType === "Recurring Dream") {
    baseInterpretation += "The repetitive nature of this dream suggests an unresolved issue or emotion that your mind keeps returning to. Consider what message your subconscious is trying to emphasize.";
  } else if (dreamType === "Prophetic Dream") {
    baseInterpretation += "While this dream has elements that feel predictive, remember that dreams often reflect our intuition and pattern recognition rather than literal future events.";
  } else {
    baseInterpretation += "This processing dream is helping your mind sort through recent experiences and emotions. The various elements represent different aspects of your thoughts and feelings.";
  }
  
  // Add personalized touches based on content
  if (lowerDream.includes("water")) {
    baseInterpretation += " The presence of water often symbolizes emotions and the subconscious mind. How the water appeared and behaved can provide insight into your emotional state.";
  }
  if (lowerDream.includes("fly")) {
    baseInterpretation += " Flying in dreams often represents freedom, transcending limitations, or gaining a new perspective on situations in your life.";
  }
  if (lowerDream.includes("lost") || lowerDream.includes("find")) {
    baseInterpretation += " Feelings of being lost or searching for something reflect your journey of self-discovery or a current life question you're trying to answer.";
  }
  
  return baseInterpretation;
};

const extractSymbols = (dreamText: string): DreamSymbol[] => {
  const symbols: DreamSymbol[] = [];
  const lowerDream = dreamText.toLowerCase();
  
  // Common dream symbols and their meanings
  const potentialSymbols = [
    { keyword: "water", symbol: "Water", meaning: "Emotions, subconscious, purification" },
    { keyword: "fall", symbol: "Falling", meaning: "Insecurity, anxiety, loss of control" },
    { keyword: "fly", symbol: "Flying", meaning: "Freedom, transcendence, new perspective" },
    { keyword: "house", symbol: "House", meaning: "Self, identity, personal space" },
    { keyword: "door", symbol: "Door", meaning: "Opportunities, transitions, choices" },
    { keyword: "teeth", symbol: "Teeth", meaning: "Power, confidence, communication" },
    { keyword: "snake", symbol: "Snake", meaning: "Transformation, healing, hidden fears" },
    { keyword: "car", symbol: "Vehicle", meaning: "Direction in life, personal journey" },
    { keyword: "school", symbol: "School", meaning: "Learning, evaluation, social pressure" },
    { keyword: "naked", symbol: "Nakedness", meaning: "Vulnerability, authenticity, fear of exposure" },
    { keyword: "chase", symbol: "Being Chased", meaning: "Avoidance, anxiety, unresolved issues" },
    { keyword: "baby", symbol: "Baby", meaning: "New beginnings, vulnerability, potential" },
    { keyword: "death", symbol: "Death", meaning: "Endings, transformation, change" },
    { keyword: "money", symbol: "Money", meaning: "Self-worth, power, values" },
    { keyword: "mirror", symbol: "Mirror", meaning: "Self-reflection, identity, truth" },
    { keyword: "ocean", symbol: "Ocean", meaning: "Vast emotions, unconscious mind, mother figure" },
    { keyword: "bridge", symbol: "Bridge", meaning: "Transition, connection, overcoming obstacles" },
    { keyword: "forest", symbol: "Forest", meaning: "Unknown, unconscious, mystery" },
    { keyword: "mountain", symbol: "Mountain", meaning: "Challenge, achievement, perspective" },
    { keyword: "bird", symbol: "Bird", meaning: "Freedom, aspiration, spiritual nature" }
  ];
  
  // Add any matching symbols found in the dream text
  potentialSymbols.forEach(({ keyword, symbol, meaning }) => {
    if (lowerDream.includes(keyword)) {
      symbols.push({ symbol, meaning });
    }
  });
  
  // If no symbols were found, add a generic one
  if (symbols.length === 0) {
    symbols.push({
      symbol: "Dream Setting",
      meaning: "Your dream environment represents your mental state and emotional context"
    });
  }
  
  return symbols;
};

const extractEmotions = (dreamText: string): string[] => {
  const emotions: string[] = [];
  const lowerDream = dreamText.toLowerCase();
  
  // Check for common emotions
  const emotionKeywords = [
    { keyword: "happy", emotion: "Joy" },
    { keyword: "sad", emotion: "Sadness" },
    { keyword: "angry", emotion: "Anger" },
    { keyword: "afraid", emotion: "Fear" },
    { keyword: "worry", emotion: "Anxiety" },
    { keyword: "excite", emotion: "Excitement" },
    { keyword: "peaceful", emotion: "Peace" },
    { keyword: "love", emotion: "Love" },
    { keyword: "confus", emotion: "Confusion" },
    { keyword: "frustrat", emotion: "Frustration" },
    { keyword: "shame", emotion: "Shame" },
    { keyword: "embarrass", emotion: "Embarrassment" },
    { keyword: "hope", emotion: "Hope" },
    { keyword: "disappoint", emotion: "Disappointment" },
    { keyword: "content", emotion: "Contentment" }
  ];
  
  emotionKeywords.forEach(({ keyword, emotion }) => {
    if (lowerDream.includes(keyword)) {
      emotions.push(emotion);
    }
  });
  
  // If no emotions were explicitly found, add these common dream emotions
  if (emotions.length === 0) {
    // Add some default emotions based on dream type inference
    if (lowerDream.includes("chase") || lowerDream.includes("fall")) {
      emotions.push("Anxiety", "Tension");
    } else if (lowerDream.includes("lost")) {
      emotions.push("Confusion", "Uncertainty");
    } else if (lowerDream.includes("find") || lowerDream.includes("discover")) {
      emotions.push("Curiosity", "Wonder");
    } else {
      emotions.push("Mixed emotions");
    }
  }
  
  return emotions;
};

// New function to generate religious interpretations
const generateReligiousInterpretations = (dreamText: string, symbols: DreamSymbol[]): ReligiousInterpretation[] => {
  const lowerDream = dreamText.toLowerCase();
  const interpretations: ReligiousInterpretation[] = [];
  
  // Islamic Interpretation (based on Ibn Sirin's approach)
  let islamicInterpretation = "In Islamic dream interpretation tradition, ";
  let islamicSymbols: string[] = [];
  
  if (lowerDream.includes("water")) {
    islamicInterpretation += "water often symbolizes life and purity. Clear water may represent honest earnings or good faith.";
    islamicSymbols.push("Water");
  } else if (lowerDream.includes("snake")) {
    islamicInterpretation += "snakes often represent enemies or deceitful people in your life that you should be cautious of.";
    islamicSymbols.push("Snake");
  } else if (lowerDream.includes("fly")) {
    islamicInterpretation += "flying suggests freedom from worldly concerns and spiritual elevation.";
    islamicSymbols.push("Flying");
  } else {
    islamicInterpretation += "this dream may reflect your inner spiritual state and relationship with Allah. Consider prayer and reflection for further insight.";
    if (symbols.length > 0) {
      islamicSymbols.push(symbols[0].symbol);
    }
  }
  
  // Hindu Interpretation (based on Vedic traditions)
  let hinduInterpretation = "According to Hindu dream interpretation, ";
  let hinduSymbols: string[] = [];
  
  if (lowerDream.includes("elephant")) {
    hinduInterpretation += "elephants symbolize wisdom, strength, and the removal of obstacles, similar to Lord Ganesha's qualities.";
    hinduSymbols.push("Elephant");
  } else if (lowerDream.includes("river") || lowerDream.includes("water")) {
    hinduInterpretation += "flowing water represents the continuous flow of life and karma, possibly indicating a spiritual cleansing.";
    hinduSymbols.push("River");
  } else if (lowerDream.includes("temple") || lowerDream.includes("pray")) {
    hinduInterpretation += "seeing a temple suggests spiritual progress and divine blessings entering your life.";
    hinduSymbols.push("Temple");
  } else {
    hinduInterpretation += "dreams are considered a state of consciousness where the soul temporarily leaves the body. Your dream may contain messages about your karma and spiritual journey.";
    if (symbols.length > 0) {
      hinduSymbols.push(symbols.length > 1 ? symbols[1].symbol : symbols[0].symbol);
    }
  }
  
  // Christian Interpretation
  let christianInterpretation = "From a Christian perspective, ";
  let christianSymbols: string[] = [];
  
  if (lowerDream.includes("light") || lowerDream.includes("sun")) {
    christianInterpretation += "light represents divine truth and God's presence, possibly guiding you through a difficult period.";
    christianSymbols.push("Light");
  } else if (lowerDream.includes("fish") || lowerDream.includes("bread")) {
    christianInterpretation += "fish or bread may symbolize Christ's provision and miraculous abundance in your life.";
    christianSymbols.push("Fish/Bread");
  } else if (lowerDream.includes("cross") || lowerDream.includes("church")) {
    christianInterpretation += "seeing religious symbols suggests a calling to strengthen your faith or return to spiritual practices.";
    christianSymbols.push("Cross");
  } else {
    christianInterpretation += "this dream may contain spiritual messages relating to your walk with God. Consider biblical symbolism and pray for discernment of its meaning.";
    if (symbols.length > 0) {
      christianSymbols.push(symbols.length > 2 ? symbols[2].symbol : symbols[0].symbol);
    }
  }
  
  interpretations.push({
    religion: "Islamic",
    interpretation: islamicInterpretation,
    keySymbols: islamicSymbols,
    iconName: "mosque",
  });
  
  interpretations.push({
    religion: "Hindu",
    interpretation: hinduInterpretation,
    keySymbols: hinduSymbols,
    iconName: "lotus",
  });
  
  interpretations.push({
    religion: "Christian",
    interpretation: christianInterpretation,
    keySymbols: christianSymbols,
    iconName: "cross",
  });
  
  return interpretations;
};
