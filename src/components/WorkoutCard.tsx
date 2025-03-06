import React from 'react';
import Card from './ui/card';
import Badge from './ui/badge';

interface WorkoutCardProps {
  title: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  exercises: number;
  image: string;
  onClick?: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  title,
  duration,
  difficulty,
  category,
  exercises,
  image,
  onClick
}) => {
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-amber-100 text-amber-800',
    advanced: 'bg-red-100 text-red-800'
  };

  return (
    <Card className="group hover:translate-y-[-4px] transition-all duration-300">
      <div 
        className="h-40 bg-cover bg-center" 
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="w-full h-full flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent">
          <Badge variant={difficulty === 'beginner' ? 'success' : 'default'}
            className={`${difficultyColor[difficulty]}`}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{title}</h3>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>{duration} min</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
            <span>{exercises} exercises</span>
          </div>
        </div>
        
        <button 
          onClick={onClick} 
          className="w-full py-2 text-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          Start Workout
        </button>
      </div>
    </Card>
  );
};

export default WorkoutCard;
