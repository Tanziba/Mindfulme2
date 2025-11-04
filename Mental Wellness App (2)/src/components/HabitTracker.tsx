import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, Trash2, Check } from "lucide-react";
import { Badge } from "./ui/badge";
import { getHabits, createHabit, updateHabit, deleteHabit as deleteHabitAPI } from "../utils/api";

interface Habit {
  id: string;
  name: string;
  completedDates: string[];
  createdAt: number;
}

export function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHabits();
  }, []);

  async function loadHabits() {
    try {
      const { habits: loadedHabits } = await getHabits();
      setHabits(loadedHabits || []);
    } catch (error) {
      console.error('Error loading habits:', error);
    }
  }

  const addHabit = async () => {
    if (!newHabit.trim() || loading) return;

    setLoading(true);
    try {
      const habit: Habit = {
        id: Date.now().toString(),
        name: newHabit,
        completedDates: [],
        createdAt: Date.now(),
      };

      await createHabit(habit);
      await loadHabits();
      setNewHabit("");
    } catch (error) {
      console.error('Error adding habit:', error);
      alert('Failed to add habit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHabit = async (id: string) => {
    try {
      await deleteHabitAPI(id);
      await loadHabits();
    } catch (error) {
      console.error('Error deleting habit:', error);
      alert('Failed to delete habit. Please try again.');
    }
  };

  const toggleHabitToday = async (id: string) => {
    try {
      const habit = habits.find(h => h.id === id);
      if (!habit) return;
      
      const today = new Date().toDateString();
      const isCompleted = habit.completedDates.includes(today);
      const updatedHabit = {
        ...habit,
        completedDates: isCompleted
          ? habit.completedDates.filter(date => date !== today)
          : [...habit.completedDates, today]
      };
      
      await updateHabit(id, updatedHabit);
      await loadHabits();
    } catch (error) {
      console.error('Error toggling habit:', error);
      alert('Failed to update habit. Please try again.');
    }
  };

  const isCompletedToday = (habit: Habit) => {
    const today = new Date().toDateString();
    return habit.completedDates.includes(today);
  };

  const getStreak = (habit: Habit) => {
    const sortedDates = [...habit.completedDates]
      .map(d => new Date(d))
      .sort((a, b) => b.getTime() - a.getTime());

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedDates.length; i++) {
      const date = new Date(sortedDates[i]);
      date.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - streak);
      expectedDate.setHours(0, 0, 0, 0);

      if (date.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const last7Days = getLast7Days();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="mb-2">Habit Tracker</h1>
          <p className="text-muted-foreground">Build better habits, one day at a time</p>
        </div>

        {/* Add Habit */}
        <Card className="bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle>Add New Habit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addHabit()}
                placeholder="e.g., Drink 8 glasses of water, Exercise, Meditate..."
                className="flex-1 bg-white"
              />
              <Button onClick={addHabit} disabled={loading}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Habits List */}
        {habits.length === 0 ? (
          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="py-12 text-center text-muted-foreground">
              <p>No habits yet. Add one above to start building better routines!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {habits.map((habit) => {
              const streak = getStreak(habit);
              const completed = isCompletedToday(habit);

              return (
                <Card key={habit.id} className="bg-white/90 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Habit Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="mb-2">{habit.name}</h3>
                          <div className="flex gap-2">
                            {streak > 0 && (
                              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                                🔥 {streak} day streak
                              </Badge>
                            )}
                            <Badge variant="secondary">
                              {habit.completedDates.length} total completions
                            </Badge>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteHabit(habit.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Last 7 Days */}
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Last 7 days</p>
                        <div className="grid grid-cols-7 gap-2">
                          {last7Days.map((date, index) => {
                            const dateStr = date.toDateString();
                            const isCompleted = habit.completedDates.includes(dateStr);
                            const isToday = dateStr === new Date().toDateString();

                            return (
                              <div key={index} className="text-center">
                                <div className="text-xs text-muted-foreground mb-1">
                                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                </div>
                                <div
                                  className={`aspect-square rounded-lg flex items-center justify-center transition-all ${
                                    isCompleted
                                      ? "bg-green-500 text-white"
                                      : isToday
                                      ? "bg-blue-100 border-2 border-blue-500"
                                      : "bg-gray-100"
                                  }`}
                                >
                                  {isCompleted && <Check className="h-4 w-4" />}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {date.getDate()}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Mark Complete Button */}
                      <Button
                        onClick={() => toggleHabitToday(habit.id)}
                        className={`w-full ${completed ? "bg-green-600 hover:bg-green-700" : ""}`}
                        variant={completed ? "default" : "outline"}
                      >
                        {completed ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Completed Today!
                          </>
                        ) : (
                          "Mark as Done Today"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Motivation */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <CardContent className="p-6 text-center">
            <h3 className="mb-2">Keep Going! 💪</h3>
            <p className="opacity-90">
              Consistency is key. Every day you complete a habit, you're building a better version of yourself.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
