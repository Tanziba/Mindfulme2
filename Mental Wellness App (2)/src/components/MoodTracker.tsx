import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Smile, Meh, Frown, Heart, Sparkles } from "lucide-react";
import { getMoods, createMood } from "../utils/api";

interface MoodEntry {
  mood: string;
  note: string;
  timestamp: number;
}

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMoods();
  }, []);

  async function loadMoods() {
    try {
      const { moods } = await getMoods();
      setEntries(moods || []);
    } catch (error) {
      console.error('Error loading moods:', error);
    }
  }

  const moods = [
    { name: "Great", icon: Smile, color: "bg-green-100 text-green-600 hover:bg-green-200", emoji: "😊" },
    { name: "Good", icon: Heart, color: "bg-blue-100 text-blue-600 hover:bg-blue-200", emoji: "🙂" },
    { name: "Okay", icon: Meh, color: "bg-yellow-100 text-yellow-600 hover:bg-yellow-200", emoji: "😐" },
    { name: "Not Great", icon: Frown, color: "bg-orange-100 text-orange-600 hover:bg-orange-200", emoji: "😔" },
    { name: "Struggling", icon: Sparkles, color: "bg-purple-100 text-purple-600 hover:bg-purple-200", emoji: "💙" },
  ];

  const handleSubmit = async () => {
    if (!selectedMood || loading) return;

    setLoading(true);
    try {
      const newEntry: MoodEntry = {
        mood: selectedMood,
        note,
        timestamp: Date.now(),
      };

      await createMood(newEntry);
      await loadMoods();
      
      setSubmitted(true);
      setTimeout(() => {
        setSelectedMood("");
        setNote("");
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving mood:', error);
      alert('Failed to save mood. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMoodMessage = (mood: string) => {
    const messages: Record<string, string> = {
      "Great": "That's wonderful! Keep riding this positive wave! 🌟",
      "Good": "Glad to hear you're doing well! Keep it up! 💪",
      "Okay": "Some days are just okay, and that's perfectly fine. 🌈",
      "Not Great": "I'm sorry you're feeling this way. Remember, tough times don't last. 🌻",
      "Struggling": "You're brave for acknowledging this. Please reach out to someone you trust. You're not alone. 💜",
    };
    return messages[mood] || "";
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6 flex items-center justify-center">
        <Card className="max-w-2xl w-full bg-white/90 backdrop-blur">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="mb-4">Thank you for checking in! 💚</h2>
            <p className="text-lg mb-6">{getMoodMessage(selectedMood)}</p>
            <p className="text-muted-foreground">Your feelings are valid and important.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="mb-2">How are you feeling today?</h1>
          <p className="text-muted-foreground">It's important to check in with yourself</p>
        </div>

        <Card className="bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle>Select your mood</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {moods.map((mood) => {
                const Icon = mood.icon;
                return (
                  <button
                    key={mood.name}
                    onClick={() => setSelectedMood(mood.name)}
                    className={`p-6 rounded-xl transition-all ${mood.color} ${
                      selectedMood === mood.name ? "ring-4 ring-primary scale-105" : ""
                    }`}
                  >
                    <div className="text-4xl mb-2">{mood.emoji}</div>
                    <div className="text-sm">{mood.name}</div>
                  </button>
                );
              })}
            </div>

            {selectedMood && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div>
                  <label className="block mb-2">
                    What's on your mind? (optional)
                  </label>
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Write down your thoughts..."
                    className="min-h-32 bg-white"
                  />
                </div>
                <Button onClick={handleSubmit} className="w-full" disabled={loading}>
                  {loading ? 'Saving...' : 'Submit Check-in'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {entries.length > 0 && (
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle>Recent Check-ins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {entries.slice(0, 5).map((entry, index) => {
                  const moodData = moods.find(m => m.name === entry.mood);
                  return (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{moodData?.emoji}</span>
                        <span>{entry.mood}</span>
                        <span className="text-sm text-muted-foreground ml-auto">
                          {new Date(entry.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      {entry.note && (
                        <p className="text-sm text-muted-foreground">{entry.note}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
