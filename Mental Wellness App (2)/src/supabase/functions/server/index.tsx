import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', logger(console.log));
app.use('*', cors());

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Helper to verify user
async function verifyUser(request: Request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return { error: 'No access token provided', userId: null };
  }
  
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user) {
    return { error: 'Invalid or expired token', userId: null };
  }
  
  return { error: null, userId: user.id };
}

// Auth routes
app.post('/make-server-a1a5736c/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });
    
    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }
    
    return c.json({ user: data.user });
  } catch (error) {
    console.log('Error during signup:', error);
    return c.json({ error: String(error) }, 500);
  }
});

app.get('/make-server-a1a5736c/user', async (c) => {
  try {
    const { error, userId } = await verifyUser(c.req.raw);
    if (error) {
      return c.json({ error }, 401);
    }
    
    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(userId!);
    if (userError) {
      return c.json({ error: userError.message }, 400);
    }
    
    return c.json({ user });
  } catch (error) {
    console.log('Error fetching user:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Mood entries routes
app.get('/make-server-a1a5736c/moods', async (c) => {
  try {
    const { error, userId } = await verifyUser(c.req.raw);
    if (error) {
      return c.json({ error }, 401);
    }
    
    const moods = await kv.get(`moods:${userId}`) || [];
    return c.json({ moods });
  } catch (error) {
    console.log('Error fetching moods:', error);
    return c.json({ error: String(error) }, 500);
  }
});

app.post('/make-server-a1a5736c/moods', async (c) => {
  try {
    const { error, userId } = await verifyUser(c.req.raw);
    if (error) {
      return c.json({ error }, 401);
    }
    
    const mood = await c.req.json();
    const moods = await kv.get(`moods:${userId}`) || [];
    moods.unshift(mood);
    await kv.set(`moods:${userId}`, moods);
    
    return c.json({ mood });
  } catch (error) {
    console.log('Error saving mood:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Tasks routes
app.get('/make-server-a1a5736c/tasks', async (c) => {
  try {
    const { error, userId } = await verifyUser(c.req.raw);
    if (error) {
      return c.json({ error }, 401);
    }
    
    const tasks = await kv.get(`tasks:${userId}`) || [];
    return c.json({ tasks });
  } catch (error) {
    console.log('Error fetching tasks:', error);
    return c.json({ error: String(error) }, 500);
  }
});

app.post('/make-server-a1a5736c/tasks', async (c) => {
  try {
    const { error, userId } = await verifyUser(c.req.raw);
    if (error) {
      return c.json({ error }, 401);
    }
    
    const task = await c.req.json();
    const tasks = await kv.get(`tasks:${userId}`) || [];
    tasks.push(task);
    await kv.set(`tasks:${userId}`, tasks);
    
    return c.json({ task });
  } catch (error) {
    console.log('Error creating task:', error);
    return c.json({ error: String(error) }, 500);
  }
});

app.put('/make-server-a1a5736c/tasks/:id', async (c) => {
  try {
    const { error, userId } = await verifyUser(c.req.raw);
    if (error) {
      return c.json({ error }, 401);
    }
    
    const taskId = c.req.param('id');
    const updatedTask = await c.req.json();
    const tasks = await kv.get(`tasks:${userId}`) || [];
    const index = tasks.findIndex((t: any) => t.id === taskId);
    
    if (index === -1) {
      return c.json({ error: 'Task not found' }, 404);
    }
    
    tasks[index] = updatedTask;
    await kv.set(`tasks:${userId}`, tasks);
    
    return c.json({ task: updatedTask });
  } catch (error) {
    console.log('Error updating task:', error);
    return c.json({ error: String(error) }, 500);
  }
});

app.delete('/make-server-a1a5736c/tasks/:id', async (c) => {
  try {
    const { error, userId } = await verifyUser(c.req.raw);
    if (error) {
      return c.json({ error }, 401);
    }
    
    const taskId = c.req.param('id');
    const tasks = await kv.get(`tasks:${userId}`) || [];
    const filteredTasks = tasks.filter((t: any) => t.id !== taskId);
    await kv.set(`tasks:${userId}`, filteredTasks);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting task:', error);
    return c.json({ error: String(error) }, 500);
  }
});

// Habits routes
app.get('/make-server-a1a5736c/habits', async (c) => {
  try {
    const { error, userId } = await verifyUser(c.req.raw);
    if (error) {
      return c.json({ error }, 401);
    }
    
    const habits = await kv.get(`habits:${userId}`) || [];
    return c.json({ habits });
  } catch (error) {
    console.log('Error fetching habits:', error);
    return c.json({ error: String(error) }, 500);
  }
});

app.post('/make-server-a1a5736c/habits', async (c) => {
  try {
    const { error, userId } = await verifyUser(c.req.raw);
    if (error) {
      return c.json({ error }, 401);
    }
    
    const habit = await c.req.json();
    const habits = await kv.get(`habits:${userId}`) || [];
    habits.push(habit);
    await kv.set(`habits:${userId}`, habits);
    
    return c.json({ habit });
  } catch (error) {
    console.log('Error creating habit:', error);
    return c.json({ error: String(error) }, 500);
  }
});

app.put('/make-server-a1a5736c/habits/:id', async (c) => {
  try {
    const { error, userId } = await verifyUser(c.req.raw);
    if (error) {
      return c.json({ error }, 401);
    }
    
    const habitId = c.req.param('id');
    const updatedHabit = await c.req.json();
    const habits = await kv.get(`habits:${userId}`) || [];
    const index = habits.findIndex((h: any) => h.id === habitId);
    
    if (index === -1) {
      return c.json({ error: 'Habit not found' }, 404);
    }
    
    habits[index] = updatedHabit;
    await kv.set(`habits:${userId}`, habits);
    
    return c.json({ habit: updatedHabit });
  } catch (error) {
    console.log('Error updating habit:', error);
    return c.json({ error: String(error) }, 500);
  }
});

app.delete('/make-server-a1a5736c/habits/:id', async (c) => {
  try {
    const { error, userId } = await verifyUser(c.req.raw);
    if (error) {
      return c.json({ error }, 401);
    }
    
    const habitId = c.req.param('id');
    const habits = await kv.get(`habits:${userId}`) || [];
    const filteredHabits = habits.filter((h: any) => h.id !== habitId);
    await kv.set(`habits:${userId}`, filteredHabits);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting habit:', error);
    return c.json({ error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
