import { Goal } from '../types/goal';

const STORAGE_KEY = 'doit-goals';

export function saveGoals(goals: Goal[]): void {
  try {
    const serialized = JSON.stringify(goals, (key, value) => {
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    });
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.warn('Failed to save to localStorage, trying sessionStorage', error);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(goals, (key, value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      }));
    } catch (sessionError) {
      console.error('Failed to save goals to any storage', sessionError);
    }
  }
}

export function loadGoals(): Goal[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data, (key, value) => {
        if (key === 'deadline' || key === 'createdAt' || key === 'updatedAt') {
          return value ? new Date(value) : undefined;
        }
        return value;
      });
    }
  } catch (error) {
    console.warn('Failed to load from localStorage, trying sessionStorage', error);
    try {
      const data = sessionStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data, (key, value) => {
          if (key === 'deadline' || key === 'createdAt' || key === 'updatedAt') {
            return value ? new Date(value) : undefined;
          }
          return value;
        });
      }
    } catch (sessionError) {
      console.error('Failed to load goals from any storage', sessionError);
    }
  }
  return [];
}