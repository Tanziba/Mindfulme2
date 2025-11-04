import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { getTasks, createTask, updateTask, deleteTask as deleteTaskAPI } from "../utils/api";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: number;
}

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const { tasks: loadedTasks } = await getTasks();
      setTasks(loadedTasks || []);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }

  const addTask = async () => {
    if (!newTask.trim() || loading) return;

    setLoading(true);
    try {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
        priority,
        createdAt: Date.now(),
      };

      await createTask(task);
      await loadTasks();
      setNewTask("");
      setPriority("medium");
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (id: string) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;
      
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(id, updatedTask);
      await loadTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTaskAPI(id);
      await loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="mb-2">Task Manager</h1>
          <p className="text-muted-foreground">Stay organized and productive, one task at a time</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">{totalCount}</div>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">{completedCount}</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">{totalCount - completedCount}</div>
              <p className="text-sm text-muted-foreground">Remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Task */}
        <Card className="bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTask()}
                placeholder="What do you need to do?"
                className="flex-1 bg-white"
              />
              <Button onClick={addTask} disabled={loading}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <span className="text-sm text-muted-foreground self-center">Priority:</span>
              {(["low", "medium", "high"] as const).map((p) => (
                <Button
                  key={p}
                  size="sm"
                  variant={priority === p ? "default" : "outline"}
                  onClick={() => setPriority(p)}
                  className="capitalize"
                >
                  {p}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <Card className="bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle>Your Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No tasks yet. Add one above to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border transition-all ${
                      task.completed ? "bg-muted/50 opacity-60" : "bg-white hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className={task.completed ? "line-through text-muted-foreground" : ""}>
                          {task.text}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={`${priorityColors[task.priority]} text-xs`}>
                            {task.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(task.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {totalCount > 0 && completedCount === totalCount && (
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
              <h3 className="mb-2">Amazing! All tasks completed! 🎉</h3>
              <p className="opacity-90">You're crushing it today!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
