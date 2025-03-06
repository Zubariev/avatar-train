import React from 'react';
import Badge from './ui/badge';

interface WorkoutPlannerHeaderProps {
  userName: string;
  currentStreak: number;
  nextWorkout: string;
}

const WorkoutPlannerHeader: React.FC<WorkoutPlannerHeaderProps> = ({
  userName,
  currentStreak,
  nextWorkout
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Hi, {userName}!
          </h1>
          <p className="text-gray-600 mt-1">Let's crush your fitness goals today</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center mb-1">
            <span className="text-amber-600 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2v2M9 13v-3M15 13v-3M6 8.2A4 4 0 0 1 10 6h4a4 4 0 0 1 4 2.2c.6 2.3.3 3.6-.3 4.8M3 10h18M7.5 15.5a4 4 0 1 0 9 0z"/></svg>
            </span>
            <span className="font-semibold text-gray-800">{currentStreak}-Day Streak</span>
          </div>
          <Badge variant="success">{nextWorkout}</Badge>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl text-white">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M18 8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4h1"/><circle cx="17" cy="17" r="3"/><path d="M17 14v6"/></svg>
          </div>
          <div>
            <h2 className="text-xl font-bold">Weekly Progress</h2>
            <p className="text-white/80 text-sm">You're making great progress! Keep it up.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlannerHeader;
