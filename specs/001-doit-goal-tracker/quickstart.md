# Implementation Quickstart: DoIt Goal Tracking

**Date**: December 30, 2025
**Feature**: specs/001-doit-goal-tracker/spec.md
**Tech Stack**: React + Tailwind + shadcn + date-fns + localStorage

## Project Setup

### 1. Initialize React Project
```bash
npx create-next-app@latest doit-app --typescript --tailwind --eslint --app
cd doit-app
```

### 2. Install Dependencies
```bash
npm install date-fns
npm install @radix-ui/react-dialog @radix-ui/react-checkbox
npm install class-variance-authority clsx tailwind-merge
```

### 3. Install shadcn/ui
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input dialog checkbox
```

### 4. Configure Tailwind Theme
Update `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e3f2fd',   // Light blue background
          500: '#2196f3',  // Blue accent
          600: '#1976d2',  // Darker blue
        },
        secondary: {
          500: '#81c784',  // Light green
          600: '#66bb6a',  // Darker green
        },
        accent: {
          500: '#ff9800',  // Orange for highlights
        },
        destructive: {
          500: '#f44336',  // Red for delete
          600: '#d32f2f',  // Darker red
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

## Core Implementation

### 1. Data Types & Storage Utils
Create `lib/types.ts`:
```typescript
export interface Goal {
  id: string;
  title: string;
  endDate: string;
  completed: boolean;
}
```

Create `lib/storage.ts`:
```typescript
import { Goal } from './types';

const STORAGE_KEY = 'doit-goals';

export const loadGoals = (): Goal[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    // Fallback to sessionStorage
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
};

export const saveGoals = (goals: Goal[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  } catch {
    // Fallback to sessionStorage
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    } catch {
      console.warn('Storage unavailable');
    }
  }
};
```

### 2. Date Utilities
Create `lib/dates.ts`:
```typescript
import { format, differenceInDays, parseISO } from 'date-fns';

export const formatDaysLeft = (endDate: string): string => {
  const end = parseISO(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  const days = differenceInDays(end, today);
  if (days < 0) return `${Math.abs(days)} days overdue`;
  if (days === 0) return 'Due today';
  return `${days} days left`;
};

export const isUrgent = (endDate: string): boolean => {
  const end = parseISO(endDate);
  const today = new Date();
  return differenceInDays(end, today) <= 3;
};
```

### 3. Main App Component
Update `app/page.tsx`:
```typescript
'use client';

import { useState, useEffect } from 'react';
import { Goal } from '@/lib/types';
import { loadGoals, saveGoals } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { GoalList } from '@/components/GoalList';
import { AddGoalDialog } from '@/components/AddGoalDialog';

export default function Home() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setGoals(loadGoals());
  }, []);

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
    };
    const updated = [...goals, newGoal];
    setGoals(updated);
    saveGoals(updated);
  };

  const toggleGoal = (id: string) => {
    const updated = goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updated);
    saveGoals(updated);
  };

  const deleteGoal = (id: string) => {
    const updated = goals.filter(goal => goal.id !== id);
    setGoals(updated);
    saveGoals(updated);
  };

  const currentGoals = goals.filter(g => !g.completed);
  const completedGoals = goals.filter(g => g.completed);

  return (
    <div className="min-h-screen bg-primary-50 p-4">
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">DoIt</h1>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-secondary-500 hover:bg-secondary-600">
          Add New Goal
        </Button>
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <GoalList
          title="Current Goals"
          goals={currentGoals}
          onToggle={toggleGoal}
          onDelete={deleteGoal}
        />
        <GoalList
          title="Completed Goals"
          goals={completedGoals}
          onToggle={toggleGoal}
          onDelete={deleteGoal}
        />
      </div>

      <AddGoalDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddGoal={addGoal}
      />
    </div>
  );
}
```

### 4. GoalList Component
Create `components/GoalList.tsx`:
```typescript
import { Goal } from '@/lib/types';
import { formatDaysLeft, isUrgent } from '@/lib/dates';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface GoalListProps {
  title: string;
  goals: Goal[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const GoalList = ({ title, goals, onToggle, onDelete }: GoalListProps) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="space-y-3">
      {goals.map(goal => (
        <div
          key={goal.id}
          className={`flex items-center p-3 rounded border-l-4 ${
            isUrgent(goal.endDate) && !goal.completed
              ? 'border-l-accent-500 bg-orange-50'
              : 'border-l-primary-500'
          }`}
        >
          <Checkbox
            checked={goal.completed}
            onCheckedChange={() => onToggle(goal.id)}
            className="mr-3"
          />
          <div className="flex-1">
            <p className="font-medium truncate max-w-xs">{goal.title}</p>
            <p className="text-sm text-gray-600">
              {goal.completed ? 'Completed' : formatDaysLeft(goal.endDate)}
            </p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(goal.id)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  </div>
);
```

### 5. AddGoalDialog Component
Create `components/AddGoalDialog.tsx`:
```typescript
import { useState } from 'react';
import { Goal } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface AddGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGoal: (goal: Omit<Goal, 'id' | 'completed'>) => void;
}

export const AddGoalDialog = ({ open, onOpenChange, onAddGoal }: AddGoalDialogProps) => {
  const [title, setTitle] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && endDate) {
      onAddGoal({ title: title.trim(), endDate, completed: false });
      setTitle('');
      setEndDate('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Goal</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

## Deployment

Deploy the built application to any static hosting service (Vercel, Netlify, etc.).

## Notes

- No testing setup as per requirements
- Implements all functional requirements from spec
- Uses responsive design with Tailwind breakpoints
- Includes error handling for storage operations
- Follows accessibility best practices with shadcn components