'use client';

import { useState, useEffect } from 'react';
import { Goal } from '../../types/goal';
import { loadGoals } from '../../utils/storage';
import { AddGoalForm } from '../../components/AddGoalForm';
import { GoalCard } from '../../components/GoalCard';

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const loadedGoals = loadGoals();
    setGoals(loadedGoals);
  }, []);

  const handleGoalAdded = (newGoal: Goal) => {
    setGoals(prev => [...prev, newGoal]);
    setShowAddForm(false);
  };

  const handleGoalUpdated = (updatedGoal: Goal) => {
    setGoals(prev => prev.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
  };

  const handleGoalDeleted = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Goals</h1>
        
        <div className="mb-6">
          {!showAddForm && (
            <button 
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
            >
              Add New Goal
            </button>
          )}
        </div>

        {showAddForm && (
          <div className="mb-6">
            <AddGoalForm 
              onGoalAdded={handleGoalAdded}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        <div className="space-y-4">
          {goals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No goals yet. Create your first goal!</p>
            </div>
          ) : (
            goals.map((goal) => (
              <GoalCard 
                key={goal.id} 
                goal={goal} 
                onGoalUpdated={handleGoalUpdated}
                onGoalDeleted={handleGoalDeleted}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
