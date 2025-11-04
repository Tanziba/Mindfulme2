import { useState } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import {
  AuthProvider,
  useAuth,
} from "./components/AuthContext";
import { Auth } from "./components/Auth";
import { Dashboard } from "./components/Dashboard";
import { MoodTracker } from "./components/MoodTracker";
import { BreathingExercise } from "./components/BreathingExercise";
import { Affirmations } from "./components/Affirmations";
import { TaskManager } from "./components/TaskManager";
import { HabitTracker } from "./components/HabitTracker";
import { Resources } from "./components/Resources";
import {
  Home,
  Heart,
  Wind,
  Sparkles,
  CheckSquare,
  Target,
  LifeBuoy,
  LogOut,
} from "lucide-react";
import { Button } from "./components/ui/button";

type Tab =
  | "home"
  | "mood"
  | "breathing"
  | "affirmations"
  | "tasks"
  | "habits"
  | "resources";

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "mood", label: "Mood", icon: Heart },
    { id: "breathing", label: "Breathe", icon: Wind },
    { id: "affirmations", label: "Inspire", icon: Sparkles },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "habits", label: "Habits", icon: Target },
    { id: "resources", label: "Help", icon: LifeBuoy },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <Dashboard
            onNavigate={(tab) => setActiveTab(tab as Tab)}
          />
        );
      case "mood":
        return <MoodTracker />;
      case "breathing":
        return <BreathingExercise />;
      case "affirmations":
        return <Affirmations />;
      case "tasks":
        return <TaskManager />;
      case "habits":
        return <HabitTracker />;
      case "resources":
        return <Resources />;
      default:
        return (
          <Dashboard
            onNavigate={(tab) => setActiveTab(tab as Tab)}
          />
        );
    }
  };

  return (
    <div className="size-full flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg">MindfulMe</h1>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="ml-2 text-muted-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="grid grid-cols-4 gap-1 p-2">
          {tabs.slice(0, 4).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-1 p-2 pt-0">
          {tabs.slice(4).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-32 md:pb-0">
        {renderContent()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}