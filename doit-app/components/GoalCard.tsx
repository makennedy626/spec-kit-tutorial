import { Goal } from '../types/goal';
import { formatDate, isDeadlineApproaching, isDeadlinePassed } from '../utils/dates';
import { saveGoals, loadGoals } from '../utils/storage';
import { Button } from './ui/button';

interface GoalCardProps {
  goal: Goal;
  onGoalUpdated: (updatedGoal: Goal) => void;
  onGoalDeleted: (goalId: string) => void;
}

export function GoalCard({ goal, onGoalUpdated, onGoalDeleted }: GoalCardProps) {
  const deadlineApproaching = goal.deadline && isDeadlineApproaching(goal.deadline);
  const deadlinePassed = goal.deadline && isDeadlinePassed(goal.deadline);

  const handleToggleComplete = () => {
    const updatedGoal: Goal = {
      ...goal,
      completed: !goal.completed,
      updatedAt: new Date(),
    };
    
    const goals = loadGoals();
    const updatedGoals = goals.map(g => g.id === goal.id ? updatedGoal : g);
    saveGoals(updatedGoals);
    onGoalUpdated(updatedGoal);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this goal?')) {
      const goals = loadGoals();
      const updatedGoals = goals.filter(g => g.id !== goal.id);
      saveGoals(updatedGoals);
      onGoalDeleted(goal.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900">{goal.title}</h2>
      {goal.description && (
        <p className="text-gray-600 mt-2">{goal.description}</p>
      )}
      
      <div className="mt-4 flex items-center justify-between">
        <span className={`px-2 py-1 rounded text-sm ${
          goal.completed 
            ? 'bg-green-100 text-green-800' 
            : deadlinePassed 
              ? 'bg-red-100 text-red-800'
              : deadlineApproaching
                ? 'bg-orange-100 text-orange-800'
                : 'bg-yellow-100 text-yellow-800'
        }`}>
          {goal.completed ? 'Completed' : deadlinePassed ? 'Overdue' : 'In Progress'}
        </span>
        
        {goal.deadline && (
          <span className={`text-sm ${
            deadlinePassed 
              ? 'text-red-600' 
              : deadlineApproaching 
                ? 'text-orange-600' 
                : 'text-gray-500'
          }`}>
            Deadline: {formatDate(goal.deadline)}
          </span>
        )}
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-gray-400">
          Created: {formatDate(goal.createdAt)}
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleToggleComplete}
            variant={goal.completed ? "outline" : "default"}
            size="sm"
          >
            {goal.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </Button>
          
          <Button 
            onClick={handleDelete}
            variant="destructive"
            size="sm"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
