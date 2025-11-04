import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Sparkles, RefreshCw } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Affirmations() {
  const affirmations = [
    "You are stronger than you think.",
    "This too shall pass.",
    "You deserve love, respect, and kindness.",
    "Your feelings are valid.",
    "You are doing the best you can, and that's enough.",
    "It's okay to take things one day at a time.",
    "You have overcome challenges before, and you will overcome this one too.",
    "You are worthy of happiness and peace.",
    "Taking care of yourself is not selfish, it's necessary.",
    "You are not alone in this.",
    "Progress, not perfection.",
    "You are enough, exactly as you are.",
    "Your mental health matters.",
    "It's okay to ask for help.",
    "You are making a positive difference just by being here.",
    "Every day is a fresh start.",
    "You have permission to rest.",
    "Your story isn't over yet.",
    "You are capable of amazing things.",
    "Be gentle with yourself.",
  ];

  const quotes = [
    { text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Buddha" },
    { text: "What mental health needs is more sunlight, more candor, and more unashamed conversation.", author: "Glenn Close" },
    { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious.", author: "Lori Deschene" },
    { text: "Healing takes time, and asking for help is a courageous step.", author: "Mariska Hargitay" },
    { text: "Your present circumstances don't determine where you can go; they merely determine where you start.", author: "Nido Qubein" },
  ];

  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[Math.floor(Math.random() * affirmations.length)]);
  const [currentQuote, setCurrentQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  const getNewAffirmation = () => {
    let newAffirmation;
    do {
      newAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    } while (newAffirmation === currentAffirmation && affirmations.length > 1);
    setCurrentAffirmation(newAffirmation);
  };

  const getNewQuote = () => {
    let newQuote;
    do {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote === currentQuote && quotes.length > 1);
    setCurrentQuote(newQuote);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="mb-2">Daily Affirmations</h1>
          <p className="text-muted-foreground">Words of encouragement when you need them most</p>
        </div>

        {/* Hero Image */}
        <div className="relative overflow-hidden rounded-2xl">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1623355345770-1ecb81d5a0b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtaW5nJTIwc3Vuc2V0JTIwc2t5fGVufDF8fHx8MTc1OTgzNDY0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Calming sunset"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Main Affirmation */}
        <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
          <CardContent className="p-8 md:p-12 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-6 opacity-80" />
            <h2 className="text-2xl md:text-3xl mb-6 leading-relaxed">
              {currentAffirmation}
            </h2>
            <Button 
              onClick={getNewAffirmation}
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              New Affirmation
            </Button>
          </CardContent>
        </Card>

        {/* Inspirational Quote */}
        <Card className="bg-white/90 backdrop-blur">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="text-6xl mb-6 opacity-20">"</div>
            <p className="text-xl mb-6 italic leading-relaxed">
              {currentQuote.text}
            </p>
            <p className="text-muted-foreground mb-6">— {currentQuote.author}</p>
            <Button 
              onClick={getNewQuote}
              variant="outline"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              New Quote
            </Button>
          </CardContent>
        </Card>

        {/* All Affirmations List */}
        <Card className="bg-white/90 backdrop-blur">
          <CardContent className="p-6">
            <h3 className="mb-4">More Affirmations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {affirmations.map((affirmation, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <p className="text-sm">{affirmation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
