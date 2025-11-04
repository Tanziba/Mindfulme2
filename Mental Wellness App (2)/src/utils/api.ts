import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-a1a5736c`;

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('access_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token || publicAnonKey}`,
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(`API error on ${endpoint}:`, data);
    throw new Error(data.error || 'API request failed');
  }

  return data;
}

// Auth
export async function signup(email: string, password: string, name: string) {
  return apiCall('/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });
}

export async function getCurrentUser() {
  return apiCall('/user');
}

// Moods
export async function getMoods() {
  return apiCall('/moods');
}

export async function createMood(mood: any) {
  return apiCall('/moods', {
    method: 'POST',
    body: JSON.stringify(mood),
  });
}

// Tasks
export async function getTasks() {
  return apiCall('/tasks');
}

export async function createTask(task: any) {
  return apiCall('/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  });
}

export async function updateTask(id: string, task: any) {
  return apiCall(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
  });
}

export async function deleteTask(id: string) {
  return apiCall(`/tasks/${id}`, {
    method: 'DELETE',
  });
}

// Habits
export async function getHabits() {
  return apiCall('/habits');
}

export async function createHabit(habit: any) {
  return apiCall('/habits', {
    method: 'POST',
    body: JSON.stringify(habit),
  });
}

export async function updateHabit(id: string, habit: any) {
  return apiCall(`/habits/${id}`, {
    method: 'PUT',
    body: JSON.stringify(habit),
  });
}

export async function deleteHabit(id: string) {
  return apiCall(`/habits/${id}`, {
    method: 'DELETE',
  });
}
