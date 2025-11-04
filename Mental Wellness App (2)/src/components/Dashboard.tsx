import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Heart, Smile, Sparkles } from "lucide-react";

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const currentHour = new Date().getHours();
  const greeting = 
    currentHour < 12 ? "Good morning" : 
    currentHour < 18 ? "Good afternoon" : 
    "Good evening";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1606733572375-35620adc4a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG1lZGl0YXRpb24lMjBuYXR1cmV8ZW58MXx8fHwxNzU5NzQ5MzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Peaceful nature"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h1 className="text-4xl mb-2">{greeting} ✨</h1>
              <p className="text-lg opacity-90">You're doing great. Let's make today better together.</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow bg-white/80 backdrop-blur"
            onClick={() => onNavigate('mood')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="mb-2">How are you feeling?</h3>
              <p className="text-sm text-muted-foreground">Check in with yourself</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow bg-white/80 backdrop-blur"
            onClick={() => onNavigate('breathing')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-2">Take a breath</h3>
              <p className="text-sm text-muted-foreground">Calm your mind</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow bg-white/80 backdrop-blur"
            onClick={() => onNavigate('affirmations')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smile className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="mb-2">Get inspired</h3>
              <p className="text-sm text-muted-foreground">Read affirmations</p>
            </CardContent>
          </Card>
        </div>

        {/* Daily Reminder */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <CardContent className="p-6">
            <h3 className="mb-2">Remember</h3>
            <p>It's okay to have bad days. What matters is that you're here, trying to feel better. That's strength.</p>
          </CardContent>
        </Card>

        {/* Productivity Section */}
        <div className="space-y-4">
          <h2>Stay Organized</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-24 bg-white/80 backdrop-blur hover:bg-white"
              onClick={() => onNavigate('tasks')}
            >
              <div className="text-left">
                <div>Manage Tasks</div>
                <p className="text-sm text-muted-foreground">Stay productive</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-24 bg-white/80 backdrop-blur hover:bg-white"
              onClick={() => onNavigate('habits')}
            >
              <div className="text-left">
                <div>Track Habits</div>
                <p className="text-sm text-muted-foreground">Build better routines</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
