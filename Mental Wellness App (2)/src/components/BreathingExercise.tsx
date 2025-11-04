import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [count, setCount] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  const phases = {
    inhale: { duration: 4, next: "hold", text: "Breathe In", color: "from-blue-400 to-blue-600" },
    hold: { duration: 4, next: "exhale", text: "Hold", color: "from-purple-400 to-purple-600" },
    exhale: { duration: 4, next: "inhale", text: "Breathe Out", color: "from-pink-400 to-pink-600" },
  };

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          const currentPhase = phases[phase];
          const nextPhase = currentPhase.next as "inhale" | "hold" | "exhale";
          setPhase(nextPhase);
          
          if (nextPhase === "inhale") {
            setCyclesCompleted((c) => c + 1);
          }
          
          return phases[nextPhase].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const handleReset = () => {
    setIsActive(false);
    setPhase("inhale");
    setCount(4);
    setCyclesCompleted(0);
  };

  const scale = isActive && phase === "inhale" ? "scale-150" : phase === "exhale" ? "scale-75" : "scale-100";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="mb-2">Breathing Exercise</h1>
          <p className="text-muted-foreground">Follow the circle and breathe deeply</p>
        </div>

        <Card className="bg-white/90 backdrop-blur">
          <CardContent className="p-12">
            {/* Breathing Circle */}
            <div className="flex flex-col items-center justify-center mb-8">
              <div
                className={`w-64 h-64 rounded-full bg-gradient-to-br ${phases[phase].color} 
                  transition-all duration-1000 ease-in-out flex items-center justify-center text-white
                  ${scale} shadow-2xl`}
              >
                <div className="text-center">
                  <div className="text-6xl mb-2">{count}</div>
                  <div className="text-xl">{phases[phase].text}</div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center mb-6">
              <p className="text-muted-foreground">
                {isActive 
                  ? "Focus on your breath and let go of tension" 
                  : "Click start to begin the breathing exercise"}
              </p>
              {cyclesCompleted > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Completed cycles: {cyclesCompleted}
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setIsActive(!isActive)}
                size="lg"
                className="w-32"
              >
                {isActive ? (
                  <>
                    <Pause className="mr-2 h-5 w-5" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" /> Start
                  </>
                )}
              </Button>
              <Button
                onClick={handleReset}
                size="lg"
                variant="outline"
                className="w-32"
              >
                <RotateCcw className="mr-2 h-5 w-5" /> Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
          <CardContent className="p-6">
            <h3 className="mb-2">Benefits of Deep Breathing</h3>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Reduces stress and anxiety</li>
              <li>• Lowers heart rate and blood pressure</li>
              <li>• Improves focus and mental clarity</li>
              <li>• Helps you feel more grounded and present</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
