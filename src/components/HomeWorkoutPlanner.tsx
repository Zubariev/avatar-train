
import React, { useState } from 'react';
import WorkoutPlannerHeader from './WorkoutPlannerHeader';
import WorkoutCard from './WorkoutCard';
import StatCard from './StatCard';
import Card from './ui/card';
import Badge from './ui/badge';
import ProgressBar from './ui/ProgressBar';

const HomeWorkoutPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recommended' | 'recent' | 'all'>('recommended');
  
  // Mock data
  const userStats = {
    name: 'Alex',
    currentStreak: 10,
    nextWorkout: 'Tomorrow at 8:00 AM',
    completedWorkouts: 24,
    totalWorkouts: 30,
    totalMinutes: 720,
    monthlyGoalMinutes: 1200,
    caloriesBurned: 8650,
    calorieGoal: 10000,
    weeklyActivity: [
      { day: 'Mon', minutes: 45 },
      { day: 'Tue', minutes: 30 },
      { day: 'Wed', minutes: 60 },
      { day: 'Thu', minutes: 45 },
      { day: 'Fri', minutes: 30 },
      { day: 'Sat', minutes: 0 },
      { day: 'Sun', minutes: 0 }
    ],
    progress: {
      strength: 65,
      cardio: 78,
      flexibility: 45
    }
  };

  const workouts = [
    {
      id: 1,
      title: 'Full Body HIIT',
      duration: 45,
      difficulty: 'intermediate' as const,
      category: 'Cardio',
      exercises: 12,
      image: 'https://public.readdy.ai/ai/img_res/d20317b5ad579ba79a124428b6b82c9a.jpg'
    },
    {
      id: 2,
      title: 'Morning Yoga Flow',
      duration: 30,
      difficulty: 'beginner' as const,
      category: 'Flexibility',
      exercises: 8,
      image: 'https://public.readdy.ai/ai/img_res/2c8af2a82b31b7e936b4af07411ea642.jpg'
    },
    {
      id: 3,
      title: 'Strength Training',
      duration: 50,
      difficulty: 'advanced' as const,
      category: 'Strength',
      exercises: 10,
      image: 'https://public.readdy.ai/ai/img_res/9654d29103e406dd8a2d10537c6b4cd8.jpg'
    }
  ];

  const achievementsList = [
    { id: 'first-workout', name: 'First Step', description: 'Complete your first workout', earned: true },
    { id: 'week-streak', name: 'Week Warrior', description: 'Complete workouts for 7 days straight', earned: true },
    { id: 'calorie-champion', name: 'Calorie Champion', description: 'Burn over 1000 calories in a week', earned: true },
    { id: 'strength-master', name: 'Strength Master', description: 'Complete 10 strength training sessions', earned: false, progress: 8, total: 10 }
  ];

  const handleStartWorkout = (workoutId: number) => {
    console.log(`Starting workout ${workoutId}`);
    // Implement workout start logic
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <WorkoutPlannerHeader 
          userName={userStats.name}
          currentStreak={userStats.currentStreak}
          nextWorkout={userStats.nextWorkout}
        />
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Completed Workouts"
            value={userStats.completedWorkouts}
            max={userStats.totalWorkouts}
            color="indigo"
            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M18 8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4h1"/><circle cx="17" cy="17" r="3"/><path d="M17 14v6"/></svg>}
          />
          <StatCard
            title="Time Spent"
            value={Math.round(userStats.totalMinutes / 60)}
            max={Math.round(userStats.monthlyGoalMinutes / 60)}
            color="purple"
            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
          />
          <StatCard
            title="Calories Burned"
            value={Math.round(userStats.caloriesBurned / 1000)}
            max={Math.round(userStats.calorieGoal / 1000)}
            color="amber"
            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M8 2h8l4 10-4 10H8L4 12Z"/><path d="M12 7v10"/><path d="M8 12h8"/></svg>}
          />
        </div>
        
        {/* Weekly Activity */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
              <div className="flex items-end justify-between h-48">
                {userStats.weeklyActivity.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative w-12">
                      <div
                        className="absolute bottom-0 w-8 bg-indigo-200 rounded-t-lg transition-all duration-300"
                        style={{height: `${(day.minutes / 60) * 100}%`}}
                      ></div>
                      <div
                        className="absolute bottom-0 w-8 bg-indigo-600 rounded-t-lg transition-all duration-300"
                        style={{height: `${(day.minutes / 60) * 100}%`, opacity: 0.7}}
                      ></div>
                    </div>
                    <span className="mt-2 text-sm text-gray-600">{day.day}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Fitness Progress</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-indigo-600"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                      </div>
                      <span className="font-medium text-gray-700">Strength</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-indigo-600">{userStats.progress.strength}</span>
                      <span className="text-gray-400">/ 100</span>
                    </div>
                  </div>
                  <ProgressBar value={userStats.progress.strength} max={100} color="indigo" showValue={false} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-600"><path d="M12 2v2M9 13v-3M15 13v-3M6 8.2A4 4 0 0 1 10 6h4a4 4 0 0 1 4 2.2c.6 2.3.3 3.6-.3 4.8M3 10h18M7.5 15.5a4 4 0 1 0 9 0z"/></svg>
                      </div>
                      <span className="font-medium text-gray-700">Cardio</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-purple-600">{userStats.progress.cardio}</span>
                      <span className="text-gray-400">/ 100</span>
                    </div>
                  </div>
                  <ProgressBar value={userStats.progress.cardio} max={100} color="purple" showValue={false} />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-green-600"><path d="M8 2c0 3.314-1.343 6-3 6"/><path d="M16 2c0 3.314 1.343 6 3 6"/><path d="M12 14c3.866 0 7-1.79 7-4V4.5C19 3.12 15.866 2 12 2S5 3.12 5 4.5V10c0 2.21 3.134 4 7 4Z"/><path d="M5 10v5c0 2.21 3.134 4 7 4 3.866 0 7-1.79 7-4v-5"/></svg>
                      </div>
                      <span className="font-medium text-gray-700">Flexibility</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">{userStats.progress.flexibility}</span>
                      <span className="text-gray-400">/ 100</span>
                    </div>
                  </div>
                  <ProgressBar value={userStats.progress.flexibility} max={100} color="green" showValue={false} />
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Workouts Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Workouts</h2>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['recommended', 'recent', 'all'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === tab
                      ? 'bg-white shadow-sm text-indigo-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                title={workout.title}
                duration={workout.duration}
                difficulty={workout.difficulty}
                category={workout.category}
                exercises={workout.exercises}
                image={workout.image}
                onClick={() => handleStartWorkout(workout.id)}
              />
            ))}
          </div>
        </div>
        
        {/* Achievements Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievementsList.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`p-4 ${
                  achievement.earned 
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 shadow-sm' 
                    : 'bg-gray-50/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center relative ${
                    achievement.earned 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse' 
                      : 'bg-gray-200'
                  }`}>
                    {achievement.earned && (
                      <div className="absolute -inset-1 bg-indigo-400/30 rounded-full animate-ping"></div>
                    )}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-6 h-6 ${achievement.earned ? 'text-white' : 'text-gray-400'}`}>
                      <path d="M18.765 5.78 6.821 17.723l-3.986-3.986-1.414 1.414 5.4 5.4L20.179 7.195l-1.414-1.414Z"/></svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${achievement.earned ? 'text-indigo-700' : 'text-gray-600'}`}>
                        {achievement.name}
                        {achievement.earned && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-green-500 ml-2 inline">
                            <path d="M18.765 5.78 6.821 17.723l-3.986-3.986-1.414 1.414 5.4 5.4L20.179 7.195l-1.414-1.414Z"/></svg>
                        )}
                      </p>
                      {achievement.earned && (
                        <Badge variant="success" className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                          Earned
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm mt-1 ${achievement.earned ? 'text-gray-600' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                    {!achievement.earned && achievement.progress !== undefined && (
                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium text-gray-700">
                            {achievement.progress} / {achievement.total}
                          </span>
                          <Badge variant="outline" className="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full text-xs font-medium">
                            {Math.round((achievement.progress / achievement.total) * 100)}%
                          </Badge>
                        </div>
                        <ProgressBar 
                          value={achievement.progress} 
                          max={achievement.total} 
                          color="indigo" 
                          size="sm" 
                          showValue={false}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeWorkoutPlanner;
