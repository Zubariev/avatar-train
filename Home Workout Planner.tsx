// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import * as echarts from 'echarts';
interface UserContextType {
user: {
id: string;
name: string;
email: string;
avatar: string;
isLoggedIn: boolean;
};
setUser: React.Dispatch<React.SetStateAction<{
id: string;
name: string;
email: string;
avatar: string;
isLoggedIn: boolean;
}>>;
userStats: {
totalWorkouts: number;
totalMinutes: number;
totalCalories: number;
strengthProgress: number;
cardioProgress: number;
flexibilityProgress: number;
currentStreak: number;
longestStreak: number;
lastWorkoutDate: string;
weeklyActivity: Array<{ day: string; minutes: number; calories: number }>;
monthlyProgress: Array<{ month: string; value: number }>;
recentAchievements: Array<{ date: string; type: string; value: string }>;
};
setUserStats: React.Dispatch<React.SetStateAction<{
totalWorkouts: number;
totalMinutes: number;
totalCalories: number;
strengthProgress: number;
cardioProgress: number;
flexibilityProgress: number;
currentStreak: number;
longestStreak: number;
lastWorkoutDate: string;
weeklyActivity: Array<{ day: string; minutes: number; calories: number }>;
monthlyProgress: Array<{ month: string; value: number }>;
recentAchievements: Array<{ date: string; type: string; value: string }>;
}>>;
}
const UserContext = createContext<UserContextType | undefined>(undefined);
const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [user, setUser] = useState({
id: '',
name: '',
email: '',
avatar: '',
isLoggedIn: false
});
const [userStats, setUserStats] = useState({
totalWorkouts: 24,
totalMinutes: 720,
totalCalories: 8650,
strengthProgress: 65,
cardioProgress: 78,
flexibilityProgress: 45,
currentStreak: 10,
longestStreak: 14,
lastWorkoutDate: '2025-03-04',
weeklyActivity: [
{ day: 'Mon', minutes: 45, calories: 420 },
{ day: 'Tue', minutes: 30, calories: 280 },
{ day: 'Wed', minutes: 60, calories: 550 },
{ day: 'Thu', minutes: 45, calories: 420 },
{ day: 'Fri', minutes: 30, calories: 280 },
{ day: 'Sat', minutes: 0, calories: 0 },
{ day: 'Sun', minutes: 0, calories: 0 }
],
monthlyProgress: [
{ month: 'Jan', value: 45 },
{ month: 'Feb', value: 58 },
{ month: 'Mar', value: 65 }
],
recentAchievements: [
{ date: '2025-03-04', type: 'Strength', value: 'New PR: 80kg Bench Press' },
{ date: '2025-03-03', type: 'Cardio', value: '5k Run in 25 minutes' },
{ date: '2025-03-02', type: 'Flexibility', value: 'Full Split Achieved' }
]
});
return (
<UserContext.Provider value={{ user, setUser, userStats, setUserStats }}>
{children}
</UserContext.Provider>
);
};
const useUser = () => {
const context = useContext(UserContext);
if (context === undefined) {
throw new Error('useUser must be used within a UserProvider');
}
return context;
};
const App: React.FC = () => {
const [currentStep, setCurrentStep] = useState<number>(0);
const [userStats, setUserStats] = useState({
totalWorkouts: 24,
totalMinutes: 720,
totalCalories: 8650,
strengthProgress: 65,
cardioProgress: 78,
flexibilityProgress: 45,
currentStreak: 10,
longestStreak: 14,
lastWorkoutDate: '2025-03-04',
weeklyActivity: [
{ day: 'Mon', minutes: 45, calories: 420 },
{ day: 'Tue', minutes: 30, calories: 280 },
{ day: 'Wed', minutes: 60, calories: 550 },
{ day: 'Thu', minutes: 45, calories: 420 },
{ day: 'Fri', minutes: 30, calories: 280 },
{ day: 'Sat', minutes: 0, calories: 0 },
{ day: 'Sun', minutes: 0, calories: 0 }
],
monthlyProgress: [
{ month: 'Jan', value: 45 },
{ month: 'Feb', value: 58 },
{ month: 'Mar', value: 65 }
],
recentAchievements: [
{ date: '2025-03-04', type: 'Strength', value: 'New PR: 80kg Bench Press' },
{ date: '2025-03-03', type: 'Cardio', value: '5k Run in 25 minutes' },
{ date: '2025-03-02', type: 'Flexibility', value: 'Full Split Achieved' }
]
});
const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
const [isExerciseActive, setIsExerciseActive] = useState<boolean>(false);
const [exerciseTimer, setExerciseTimer] = useState<number>(0);
const [currentDay, setCurrentDay] = useState<number>(new Date().getDay());
const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
const [audioSettings, setAudioSettings] = useState({
timerReminders: true,
formFeedback: true,
volume: 80,
previewPlaying: false
});
const [cameraEnabled, setCameraEnabled] = useState<boolean>(false);
const [formScore, setFormScore] = useState<number>(0);
const [formFeedback, setFormFeedback] = useState<string[]>([]);
const [showCamera, setShowCamera] = useState<boolean>(false);
const videoRef = useRef<HTMLVideoElement>(null);
const [formAnalysis, setFormAnalysis] = useState<{
score: number;
feedback: string[];
improvements: string[];
recordedSession: string | null;
isRecording: boolean;
formStatus: 'good' | 'warning' | 'error' | null;
guideStep: number;
}>({
score: 0,
feedback: [],
improvements: [],
recordedSession: null,
isRecording: false,
formStatus: null,
guideStep: 0
});
const [user, setUser] = useState<{
id: string;
name: string;
email: string;
avatar: string;
isLoggedIn: boolean;
}>({
id: '',
name: '',
email: '',
avatar: '',
isLoggedIn: false
});
const [workoutHistory, setWorkoutHistory] = useState<{
date: string;
duration: number;
caloriesBurned: number;
exercises: string[];
}[]>([
{
date: '2025-03-04',
duration: 3600,
caloriesBurned: 320,
exercises: ['Push-ups', 'Squats', 'Planks', 'Mountain Climbers']
},
{
date: '2025-03-03',
duration: 2700,
caloriesBurned: 280,
exercises: ['Pull-ups', 'Lunges', 'Russian Twists', 'Burpees']
},
{
date: '2025-03-02',
duration: 3300,
caloriesBurned: 295,
exercises: ['Dumbbell Press', 'Kettlebell Swings', 'Core Work', 'HIIT']
},
{
date: '2025-03-01',
duration: 3000,
caloriesBurned: 310,
exercises: ['Yoga Flow', 'Meditation', 'Stretching']
},
{
date: '2025-02-28',
duration: 3900,
caloriesBurned: 350,
exercises: ['Running', 'Jump Rope', 'Box Jumps']
},
{
date: '2025-02-27',
duration: 2400,
caloriesBurned: 260,
exercises: ['Swimming', 'Water Aerobics']
}
]);
const [achievements, setAchievements] = useState<{
id: string;
name: string;
description: string;
icon: string;
earned: boolean;
date?: string;
progress?: number;
total?: number;
}[]>([
{
id: 'first-workout',
name: 'First Step',
description: 'Complete your first workout',
icon: 'medal',
earned: true,
date: '2025-03-01'
},
{
id: 'week-streak',
name: 'Week Warrior',
description: 'Complete workouts for 7 days straight',
icon: 'fire',
earned: true,
date: '2025-03-04'
},
{
id: 'equipment-master',
name: 'Equipment Master',
description: 'Use all available equipment in workouts',
icon: 'dumbbell',
earned: false,
progress: 5,
total: 7
},
{
id: 'calorie-champion',
name: 'Calorie Champion',
description: 'Burn over 1000 calories in a week',
icon: 'bolt',
earned: true,
date: '2025-03-03'
},
{
id: 'early-bird',
name: 'Early Bird',
description: 'Complete 5 morning workouts',
icon: 'sun',
earned: true,
date: '2025-03-02'
},
{
id: 'strength-master',
name: 'Strength Master',
description: 'Complete 10 strength training sessions',
icon: 'dumbbell',
earned: false,
progress: 8,
total: 10
},
{
id: 'pushup-pro',
name: 'Push-up Pro',
description: 'Complete 50 push-ups in one session',
icon: 'fist-raised',
earned: false,
progress: 35,
total: 50
},
{
id: 'calorie-milestone',
name: 'Calorie Crusher',
description: 'Burn 10,000 total calories',
icon: 'fire-alt',
earned: false,
progress: 8650,
total: 10000
},
{
id: 'perfect-month',
name: 'Perfect Month',
description: 'Complete all scheduled workouts in a month',
icon: 'calendar-check',
earned: false,
progress: 24,
total: 30
}
]);
const [imageDescriptions, setImageDescriptions] = useState<{
front: {
hair: string;
eyes: string;
skinTone: string;
clothing: string;
bodyType: string;
posture: string;
} | null;
side: {
hair: string;
eyes: string;
skinTone: string;
clothing: string;
bodyType: string;
posture: string;
} | null;
back: {
hair: string;
eyes: string;
skinTone: string;
clothing: string;
bodyType: string;
posture: string;
} | null;
}>({
front: null,
side: null,
back: null
});
const [formData, setFormData] = useState({
height: '',
weight: '',
waist: '',
chest: '',
gender: '',
fitnessLevel: '',
goal: '',
equipment: [] as string[],
schedule: {
Mon: { active: true, startTime: '09:00', endTime: '09:50', notifications: true, intensity: 'medium' },
Tue: { active: true, startTime: '09:00', endTime: '09:50', notifications: true, intensity: 'high' },
Wed: { active: true, startTime: '09:00', endTime: '09:50', notifications: true, intensity: 'medium' },
Thu: { active: true, startTime: '09:00', endTime: '09:50', notifications: true, intensity: 'high' },
Fri: { active: true, startTime: '09:00', endTime: '09:50', notifications: true, intensity: 'low' },
Sat: { active: false, startTime: '09:00', endTime: '09:50', notifications: false, intensity: 'low' },
Sun: { active: false, startTime: '09:00', endTime: '09:50', notifications: false, intensity: 'low' }
},
photos: {
front: null,
side: null,
back: null
} as {
front: File | null,
side: File | null,
back: null
}
});
const [showNotification, setShowNotification] = useState(false);
const [isMenuOpen, setIsMenuOpen] = useState(false);
const progressChartRef = useRef<HTMLDivElement>(null);
useEffect(() => {
if (progressChartRef.current && (currentStep === 4 || currentStep === 5)) {
const chart = echarts.init(progressChartRef.current);
// Debounce chart updates
let updateTimeout: NodeJS.Timeout;
const debouncedUpdate = (options: any) => {
if (updateTimeout) {
clearTimeout(updateTimeout);
}
updateTimeout = setTimeout(() => {
chart.setOption(options);
}, 200);
};
if (currentStep === 4) {
// Monthly progress chart
const option = {
animation: false,
tooltip: {
trigger: 'axis',
formatter: '{b}: {c}%'
},
xAxis: {
type: 'category',
data: userStats.monthlyProgress.map(item => item.month),
axisLine: {
lineStyle: {
color: '#E5E7EB'
}
}
},
yAxis: {
type: 'value',
max: 100,
axisLine: {
lineStyle: {
color: '#E5E7EB'
}
},
splitLine: {
lineStyle: {
color: '#F3F4F6'
}
}
},
series: [{
data: userStats.monthlyProgress.map(item => item.value),
type: 'line',
smooth: true,
symbolSize: 8,
lineStyle: {
color: '#6366F1'
},
itemStyle: {
color: '#6366F1'
},
areaStyle: {
color: {
type: 'linear',
x: 0,
y: 0,
x2: 0,
y2: 1,
colorStops: [{
offset: 0,
color: 'rgba(99, 102, 241, 0.2)'
}, {
offset: 1,
color: 'rgba(99, 102, 241, 0)'
}]
}
}
}]
};
debouncedUpdate(option);
} else if (currentStep === 5) {
const calculateFitnessStats = (equipment: string[]) => {
const baseStats = {
Strength: 40,
Endurance: 35,
Flexibility: 30,
Balance: 35,
Speed: 30
};
const equipmentBonus = {
'dumbbells': { Strength: 15, Endurance: 5 },
'mat': { Flexibility: 15, Balance: 10 },
'bands': { Strength: 10, Flexibility: 15 },
'kettlebell': { Strength: 20, Speed: 10 },
'pullup-bar': { Strength: 25, Balance: 15 },
'bench': { Strength: 15, Endurance: 15 },
'foam-roller': { Flexibility: 20, Balance: 10 }
};
const stats = { ...baseStats };
equipment.forEach(item => {
const bonus = equipmentBonus[item as keyof typeof equipmentBonus];
if (bonus) {
Object.entries(bonus).forEach(([stat, value]) => {
stats[stat as keyof typeof stats] += value;
});
}
});
return Object.values(stats);
};
const option = {
animation: false,
radar: {
indicator: [
{ name: 'Strength', max: 100 },
{ name: 'Endurance', max: 100 },
{ name: 'Flexibility', max: 100 },
{ name: 'Balance', max: 100 },
{ name: 'Speed', max: 100 }
]
},
series: [{
type: 'radar',
data: [{
value: calculateFitnessStats(formData.equipment),
name: 'Current Level',
areaStyle: {
color: 'rgba(99, 102, 241, 0.2)'
},
lineStyle: {
color: '#6366f1'
}
}]
}]
};
debouncedUpdate(option);
}
}
return () => {
if (progressChartRef.current) {
echarts.dispose(progressChartRef.current);
}
};
}, [currentStep, formData.equipment, userStats.monthlyProgress]);
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};
const [modelGenerationStatus, setModelGenerationStatus] = useState<{
status: 'idle' | 'processing' | 'completed' | 'error';
progress: number;
message: string;
}>();
const generateHunyuan3DModel = async (imageData: any, textData: any) => {
try {
setModelGenerationStatus({
status: 'processing',
progress: 0,
message: 'Initializing 3D model generation...'
});
// Format the request data
const formData = new FormData();
formData.append('frontImage', imageData.front);
formData.append('sideImage', imageData.side);
formData.append('backImage', imageData.back);
const structuredData = {
height: textData.height,
weight: textData.weight,
waist: textData.waist,
chest: textData.chest,
gender: textData.gender,
physicalAttributes: {
...imageDescriptions.front,
posture: imageDescriptions.side?.posture
}
};
formData.append('metadata', JSON.stringify(structuredData));
// Simulate initial model generation
for(let progress = 0; progress <= 50; progress += 10) {
await new Promise(resolve => setTimeout(resolve, 800));
setModelGenerationStatus({
status: 'processing',
progress,
message: getProgressMessage(progress)
});
}
// Post-process the 3D model
const postProcessModel = async () => {
// Simulated post-processing steps
const steps = [
{ name: 'Mesh Optimization', duration: 800 },
{ name: 'Polygon Reduction', duration: 600 },
{ name: 'Geometry Smoothing', duration: 700 },
{ name: 'Texture Optimization', duration: 500 },
{ name: 'Format Conversion', duration: 400 }
];
let progress = 50;
const progressIncrement = 50 / steps.length;
for (const step of steps) {
await new Promise(resolve => setTimeout(resolve, step.duration));
progress += progressIncrement;
setModelGenerationStatus({
status: 'processing',
progress,
message: `Post-processing: ${step.name}...`
});
}
};
await postProcessModel();
// Simulate successful completion
setModelGenerationStatus({
status: 'completed',
progress: 100,
message: '3D model optimized and ready for viewing!'
});
return true;
} catch (error) {
setModelGenerationStatus({
status: 'error',
progress: 0,
message: 'Failed to generate 3D model. Please try again.'
});
return false;
}
};
const getProgressMessage = (progress: number): string => {
if (progress <= 10) return 'Analyzing body measurements...';
if (progress <= 20) return 'Processing image data...';
if (progress <= 30) return 'Generating initial 3D mesh...';
if (progress <= 40) return 'Creating base geometry...';
if (progress <= 50) return 'Applying preliminary textures...';
if (progress <= 60) return 'Optimizing mesh topology...';
if (progress <= 70) return 'Reducing polygon count...';
if (progress <= 80) return 'Smoothing geometry...';
if (progress <= 90) return 'Optimizing textures and materials...';
return 'Converting to web-optimized format...';
};
const handleNext = async () => {
if (currentStep === 1) {
const success = await generateHunyuan3DModel(formData.photos, formData);
if (success) {
setCurrentStep(prev => prev + 1);
}
} else {
setCurrentStep(prev => prev + 1);
}
};
const handleBack = () => {
setCurrentStep(prev => prev - 1);
};
const renderStep = () => {
const getExercisesByEquipment = (equipment: string[]) => {
const exerciseDatabase = {
'dumbbells': [
{ name: 'Dumbbell Press', duration: 900, type: 'Strength', instructions: 'Lie on back, press dumbbells up from shoulders.' },
{ name: 'Dumbbell Rows', duration: 900, type: 'Strength', instructions: 'Bend over, pull dumbbells to chest.' },
],
'mat': [
{ name: 'Push-ups', duration: 900, type: 'Strength', instructions: 'Keep body straight, lower chest to ground, push back up.' },
{ name: 'Planks', duration: 600, type: 'Core', instructions: 'Maintain straight body position, engage core.' },
],
'bands': [
{ name: 'Band Pull-aparts', duration: 900, type: 'Strength', instructions: 'Hold band at shoulder height, pull apart.' },
{ name: 'Banded Squats', duration: 900, type: 'Strength', instructions: 'Place band above knees, perform squats.' },
],
'kettlebell': [
{ name: 'Kettlebell Swings', duration: 900, type: 'Strength', instructions: 'Hinge at hips, swing kettlebell.' },
{ name: 'Goblet Squats', duration: 900, type: 'Strength', instructions: 'Hold kettlebell at chest, perform squats.' },
],
'pullup-bar': [
{ name: 'Pull-ups', duration: 900, type: 'Strength', instructions: 'Grip bar, pull chin over bar.' },
{ name: 'Hanging Leg Raises', duration: 600, type: 'Core', instructions: 'Hang from bar, raise legs to parallel.' },
],
'bench': [
{ name: 'Bench Press', duration: 900, type: 'Strength', instructions: 'Lie on bench, press weight up.' },
{ name: 'Step-ups', duration: 900, type: 'Cardio', instructions: 'Step up and down on bench.' },
],
'foam-roller': [
{ name: 'Foam Rolling', duration: 600, type: 'Recovery', instructions: 'Roll major muscle groups.' },
{ name: 'Mobility Work', duration: 600, type: 'Flexibility', instructions: 'Use roller for mobility exercises.' },
]
};
const baseExercises = [
{ name: 'Warm-up', duration: 600, type: 'Cardio', instructions: 'Light jogging in place, arm circles, dynamic stretches.' },
{ name: 'Bodyweight Squats', duration: 900, type: 'Strength', instructions: 'Feet shoulder-width apart, lower body until thighs are parallel.' },
{ name: 'Cool-down', duration: 600, type: 'Stretching', instructions: 'Gentle stretching of major muscle groups.' }
];
let selectedExercises = [...baseExercises];
// Insert equipment-specific exercises before cool-down
equipment.forEach(item => {
if (exerciseDatabase[item as keyof typeof exerciseDatabase]) {
selectedExercises.splice(-1, 0, ...exerciseDatabase[item as keyof typeof exerciseDatabase]);
}
});
return selectedExercises;
};
const exercises = getExercisesByEquipment(formData.equipment);
useEffect(() => {
let interval: NodeJS.Timeout;
if (isExerciseActive && exerciseTimer > 0) {
if (showCamera) {
// Simulate form analysis every 5 seconds
const analysisInterval = setInterval(() => {
analyzeForm();
}, 5000);
return () => clearInterval(analysisInterval);
}
interval = setInterval(() => {
setExerciseTimer((prev) => {
if (prev <= 1) {
setIsExerciseActive(false);
if (currentExerciseIndex < exercises.length - 1) {
setCurrentExerciseIndex(prev => prev + 1);
if (voiceEnabled) {
setIsSpeaking(true);
const utterance = new SpeechSynthesisUtterance();
utterance.text = `Great job! Next exercise: ${exercises[currentExerciseIndex + 1].name}. ${exercises[currentExerciseIndex + 1].instructions}`;
utterance.onend = () => setIsSpeaking(false);
window.speechSynthesis.speak(utterance);
}
return exercises[currentExerciseIndex + 1].duration;
}
if (voiceEnabled) {
setIsSpeaking(true);
const utterance = new SpeechSynthesisUtterance();
utterance.text = "Congratulations! You've completed your workout!";
utterance.onend = () => setIsSpeaking(false);
window.speechSynthesis.speak(utterance);
}
return 0;
}
if (audioSettings.timerReminders && prev % 30 === 0) {
setIsSpeaking(true);
const utterance = new SpeechSynthesisUtterance();
utterance.text = `${prev / 60} minutes remaining. Keep going! Remember: ${exercises[currentExerciseIndex].instructions}`;
utterance.volume = audioSettings.volume / 100;
utterance.onend = () => setIsSpeaking(false);
window.speechSynthesis.speak(utterance);
}
return prev - 1;
});
}, 1000);
}
return () => clearInterval(interval);
}, [isExerciseActive, exerciseTimer, currentExerciseIndex]);
const formatTime = (seconds: number): string => {
const mins = Math.floor(seconds / 60);
const secs = seconds % 60;
return `${mins}:${secs.toString().padStart(2, '0')}`;
};
switch(currentStep) {
case 0:
return (
<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
<div className="relative h-screen flex flex-col items-center justify-center px-4">
<div className="absolute top-0 right-0 p-6">
<button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 !rounded-button cursor-pointer">
<i className="fas fa-bars text-xl"></i>
</button>
</div>
<div className="max-w-4xl mx-auto text-center">
<div className="mb-8">
<img
src="https://public.readdy.ai/ai/img_res/d20317b5ad579ba79a124428b6b82c9a.jpg"
alt="Fitness App Concept"
className="w-full h-64 object-cover rounded-xl shadow-2xl"
/>
</div>
<h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
Transform Your Fitness Journey
</h1>
<p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
Your personal AI-powered fitness companion. Get customized workouts, real-time guidance, and track your progress with advanced 3D modeling technology.
</p>
<div className="grid grid-cols-3 gap-8 mb-12">
<div className="p-6 bg-white rounded-xl shadow-lg">
<i className="fas fa-robot text-3xl text-indigo-600 mb-4"></i>
<h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
<p className="text-gray-600">Personalized workouts adapted to your body and goals</p>
</div>
<div className="p-6 bg-white rounded-xl shadow-lg">
<i className="fas fa-cube text-3xl text-indigo-600 mb-4"></i>
<h3 className="text-xl font-semibold mb-2">3D Modeling</h3>
<p className="text-gray-600">Visualize your progress with accurate body modeling</p>
</div>
<div className="p-6 bg-white rounded-xl shadow-lg">
<i className="fas fa-microphone-alt text-3xl text-indigo-600 mb-4"></i>
<h3 className="text-xl font-semibold mb-2">Voice Guidance</h3>
<p className="text-gray-600">Real-time audio instructions for perfect form</p>
</div>
</div>
<button
onClick={handleNext}
className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-700 transition-all !rounded-button cursor-pointer whitespace-nowrap"
>
Get Started
</button>
</div>
</div>
</div>
);
case 1:
return (
<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-8">
<div className="max-w-4xl mx-auto">
<div className="mb-8">
<h2 className="text-3xl font-bold text-gray-800 mb-4">Basic Information</h2>
<p className="text-gray-600">Let's start with your basic measurements and photos</p>
</div>
<div className="bg-white rounded-xl shadow-lg p-8">
<div className="mb-8">
<h3 className="text-xl font-semibold mb-4">Upload Your Photos</h3>
<p className="text-gray-600 mb-4">Upload photos from different angles to help us create your accurate 3D model</p>
<div className="grid grid-cols-3 gap-4">
{['Front View', 'Side View', 'Back View'].map((view, index) => (
<div key={index} className="relative">
<div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
<input
type="file"
accept="image/*"
className="absolute inset-0 opacity-0 cursor-pointer z-10"
onChange={(e) => {
const file = e.target.files?.[0];
if (file) {
const reader = new FileReader();
reader.onload = (event) => {
const previewImg = document.getElementById(`preview-${index}`) as HTMLImageElement;
if (previewImg && event.target?.result) {
previewImg.src = event.target.result as string;
previewImg.style.display = 'block';
// Simulate AI-generated description
const mockDescriptions = {
front: {
hair: 'Short black hair',
eyes: 'Brown',
skinTone: 'Light tan',
clothing: 'Blue fitness T-shirt, black shorts',
bodyType: 'Athletic',
posture: 'Standing straight, shoulders back'
},
side: {
hair: 'Short black hair',
eyes: 'Brown',
skinTone: 'Light tan',
clothing: 'Blue fitness T-shirt, black shorts',
bodyType: 'Athletic',
posture: 'Natural standing position'
},
back: {
hair: 'Short black hair',
eyes: 'Not visible',
skinTone: 'Light tan',
clothing: 'Blue fitness T-shirt, black shorts',
bodyType: 'Athletic',
posture: 'Standing straight'
}
};
setImageDescriptions(prev => ({
...prev,
[['front', 'side', 'back'][index]]: mockDescriptions[['front', 'side', 'back'][index] as keyof typeof mockDescriptions]
}));
}
};
reader.readAsDataURL(file);
}
}}
/>
{imageDescriptions[['front', 'side', 'back'][index] as keyof typeof imageDescriptions] && (
<div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 text-sm">
<h4 className="font-semibold mb-2">Image Analysis</h4>
<ul className="space-y-1">
{Object.entries(imageDescriptions[['front', 'side', 'back'][index] as keyof typeof imageDescriptions]!).map(([key, value]) => (
<li key={key} className="flex items-center gap-2">
<span className="capitalize">{key}:</span>
<span className="text-gray-300">{value}</span>
</li>
))}
</ul>
</div>
)}
<img
id={`preview-${index}`}
src=""
alt=""
className="w-full h-full object-cover hidden"
/>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<i className="fas fa-camera text-2xl text-gray-400 mb-2"></i>
<span className="text-sm text-gray-500">{view}</span>
</div>
</div>
</div>
))}
</div>
</div>
<div className="grid grid-cols-2 gap-6">
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
<input
type="number"
name="height"
value={formData.height}
onChange={handleInputChange}
className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
placeholder="Enter your height"
/>
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
<input
type="number"
name="weight"
value={formData.weight}
onChange={handleInputChange}
className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
placeholder="Enter your weight"
/>
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">Waist Circumference (cm)</label>
<input
type="number"
name="waist"
value={formData.waist}
onChange={handleInputChange}
className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
placeholder="Enter your waist circumference"
/>
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">Chest Circumference (cm)</label>
<input
type="number"
name="chest"
value={formData.chest}
onChange={handleInputChange}
className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
placeholder="Enter your chest circumference"
/>
</div>
</div>
<div className="mt-8 flex justify-between">
<button
onClick={handleBack}
className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all !rounded-button cursor-pointer whitespace-nowrap"
>
Back
</button>
<button
onClick={handleNext}
className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all !rounded-button cursor-pointer whitespace-nowrap"
>
Next Step
</button>
</div>
</div>
</div>
</div>
);
case 2:
return (
<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-8">
<div className="max-w-4xl mx-auto">
<div className="mb-8">
<h2 className="text-3xl font-bold text-gray-800 mb-4">Personal Details</h2>
<p className="text-gray-600">Help us customize your experience</p>
</div>
<div className="bg-white rounded-xl shadow-lg p-8">
<div className="grid grid-cols-1 gap-6">
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
<select
name="gender"
value={formData.gender}
onChange={handleInputChange}
className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
>
<option value="">Select your gender</option>
<option value="male">Male</option>
<option value="female">Female</option>
<option value="other">Other</option>
</select>
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">Current Fitness Level</label>
<select
name="fitnessLevel"
value={formData.fitnessLevel}
onChange={handleInputChange}
className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
>
<option value="">Select your fitness level</option>
<option value="beginner">Beginner</option>
<option value="intermediate">Intermediate</option>
<option value="advanced">Advanced</option>
</select>
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">Primary Goal</label>
<select
name="goal"
value={formData.goal}
onChange={handleInputChange}
className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
>
<option value="">Select your primary goal</option>
<option value="weight-loss">Weight Loss</option>
<option value="muscle-gain">Muscle Gain</option>
<option value="endurance">Improve Endurance</option>
<option value="flexibility">Increase Flexibility</option>
</select>
</div>
</div>
<div className="mt-8 flex justify-between">
<button
onClick={handleBack}
className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all !rounded-button cursor-pointer whitespace-nowrap"
>
Back
</button>
<button
onClick={handleNext}
className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all !rounded-button cursor-pointer whitespace-nowrap"
>
Generate 3D Model
</button>
</div>
</div>
</div>
</div>
);
case 3:
const generateAvatarPrompt = () => {
// Get user physical attributes
const genderText = formData.gender === 'male' ? 'male' : 'female';
const heightText = formData.height ? `${formData.height}cm tall` : 'average height';
const weightText = formData.weight ? `${formData.weight}kg` : 'average weight';
const buildText = formData.waist && formData.chest ?
`with ${formData.chest}cm chest and ${formData.waist}cm waist measurements` :
'with athletic build';
// Get AI-generated descriptions
const frontView = imageDescriptions.front;
const physicalFeatures = frontView ? {
hair: frontView.hair,
eyes: frontView.eyes,
skinTone: frontView.skinTone,
clothing: frontView.clothing,
bodyType: frontView.bodyType,
posture: frontView.posture
} : {
hair: 'short dark',
eyes: 'natural',
skinTone: 'neutral',
clothing: 'athletic wear',
bodyType: 'fit',
posture: 'upright'
};
// Combine measurements with physical appearance
const detailedDescription = `
${heightText} ${genderText} fitness model
${weightText}
${buildText}
with ${physicalFeatures.hair} hair
${physicalFeatures.eyes} eyes
${physicalFeatures.skinTone} skin tone
wearing ${physicalFeatures.clothing}
${physicalFeatures.bodyType} body type
maintaining ${physicalFeatures.posture} posture
`.replace(/\s+/g, ' ').trim();
return `Photorealistic 3D rendered ${detailedDescription}, anatomically accurate muscle definition visualization with transparent overlay showing skeletal structure, professional medical style visualization on dark background with blue accent lighting and holographic UI elements, ultra high quality, cinematic lighting`;
};
return (
<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-8">
<div className="max-w-4xl mx-auto">
<div className="mb-8">
<h2 className="text-3xl font-bold text-gray-800 mb-4">Your 3D Model</h2>
<p className="text-gray-600">Based on your measurements, we've created your digital twin</p>
</div>
<div className="grid grid-cols-2 gap-8">
<div className="bg-white rounded-xl shadow-lg p-8">
<img
src={`https://readdy.ai/api/search-image?query=${generateAvatarPrompt()}&width=400&height=600&seq=5&orientation=portrait`}
alt="3D Body Model"
className="w-full h-96 object-cover rounded-lg"
/>
</div>
<div className="bg-white rounded-xl shadow-lg p-8">
<h3 className="text-xl font-semibold mb-4">Body Analysis</h3>
<div className="space-y-4">
<div>
<div className="flex justify-between mb-1">
<span className="text-gray-600">BMI</span>
<span className="font-semibold">22.5</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-2">
<div className="bg-green-500 h-2 rounded-full" style={{width: '70%'}}></div>
</div>
</div>
<div>
<div className="flex justify-between mb-1">
<span className="text-gray-600">Body Fat %</span>
<span className="font-semibold">18%</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-2">
<div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
</div>
</div>
<div>
<div className="flex justify-between mb-1">
<span className="text-gray-600">Muscle Mass</span>
<span className="font-semibold">45%</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-2">
<div className="bg-purple-500 h-2 rounded-full" style={{width: '75%'}}></div>
</div>
</div>
</div>
<div className="mt-8">
<h3 className="text-xl font-semibold mb-4">Recommended Focus Areas</h3>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Core Strength</span>
<span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Upper Body</span>
<span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Flexibility</span>
</div>
</div>
</div>
</div>
<div className="mt-8 flex justify-between">
<button
onClick={handleBack}
className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all !rounded-button cursor-pointer whitespace-nowrap"
>
Back
</button>
<button
onClick={handleNext}
className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all !rounded-button cursor-pointer whitespace-nowrap"
>
View Workout Plan
</button>
</div>
</div>
</div>
);
case 4:
return (
<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-8">
<div className="max-w-7xl mx-auto">
<div className="mb-8">
<h2 className="text-3xl font-bold text-gray-800 mb-4">Progress Dashboard</h2>
<p className="text-gray-600">Track your fitness journey and achievements</p>
</div>
<div className="mb-8">
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
<div className="flex items-center justify-between mb-6">
<h3 className="text-lg font-semibold text-indigo-900">Total Workouts</h3>
<div className="relative">
<div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
<i className="fas fa-dumbbell text-2xl text-indigo-600"></i>
</div>
<div className="absolute -inset-1 bg-indigo-400 rounded-full animate-ping opacity-20"></div>
</div>
</div>
<div className="relative">
<div className="flex items-baseline gap-2">
<p className="text-4xl font-bold text-indigo-800">{userStats.totalWorkouts}</p>
<p className="text-lg text-indigo-600">sessions</p>
</div>
<div className="mt-4 flex items-center gap-2">
<div className="flex-1 h-2 bg-indigo-100 rounded-full overflow-hidden">
<div
className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
style={{width: `${(userStats.totalWorkouts / 30) * 100}%`}}
></div>
</div>
<span className="text-sm text-indigo-600 font-medium">
{Math.round((userStats.totalWorkouts / 30) * 100)}%
</span>
</div>
<p className="text-sm text-indigo-600/80 mt-2">Monthly Goal: 30 sessions</p>
</div>
</div>
<div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
<div className="flex items-center justify-between mb-6">
<h3 className="text-lg font-semibold text-emerald-900">Time Spent</h3>
<div className="relative">
<div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
<i className="fas fa-clock text-2xl text-emerald-600"></i>
</div>
<div className="absolute -inset-1 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
</div>
</div>
<div className="relative">
<div className="flex items-baseline gap-2">
<p className="text-4xl font-bold text-emerald-800">{Math.round(userStats.totalMinutes / 60)}</p>
<p className="text-lg text-emerald-600">hours</p>
</div>
<div className="mt-4 flex items-center gap-2">
<div className="flex-1 h-2 bg-emerald-100 rounded-full overflow-hidden">
<div
className="h-full bg-emerald-600 rounded-full transition-all duration-1000"
style={{width: `${(userStats.totalMinutes / 1800) * 100}%`}}
></div>
</div>
<span className="text-sm text-emerald-600 font-medium">
{Math.round((userStats.totalMinutes / 1800) * 100)}%
</span>
</div>
<p className="text-sm text-emerald-600/80 mt-2">Monthly Goal: 30 hours</p>
</div>
</div>
<div className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
<div className="flex items-center justify-between mb-6">
<h3 className="text-lg font-semibold text-amber-900">Calories Burned</h3>
<div className="relative">
<div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
<i className="fas fa-fire text-2xl text-amber-600"></i>
</div>
<div className="absolute -inset-1 bg-amber-400 rounded-full animate-ping opacity-20"></div>
</div>
</div>
<div className="relative">
<div className="flex items-baseline gap-2">
<p className="text-4xl font-bold text-amber-800">{Math.round(userStats.totalCalories / 1000)}k</p>
<p className="text-lg text-amber-600">calories</p>
</div>
<div className="mt-4 flex items-center gap-2">
<div className="flex-1 h-2 bg-amber-100 rounded-full overflow-hidden">
<div
className="h-full bg-amber-600 rounded-full transition-all duration-1000"
style={{width: `${(userStats.totalCalories / 10000) * 100}%`}}
></div>
</div>
<span className="text-sm text-amber-600 font-medium">
{Math.round((userStats.totalCalories / 10000) * 100)}%
</span>
</div>
<p className="text-sm text-amber-600/80 mt-2">Monthly Goal: 10,000 calories</p>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
<div className="bg-white rounded-xl shadow-lg p-8">
<div className="flex items-center justify-between mb-8">
<h3 className="text-xl font-semibold text-gray-800">Progress Towards {formData.goal}</h3>
<div className="relative group">
<button className="text-gray-400 hover:text-gray-600">
<i className="fas fa-info-circle"></i>
</button>
<div className="absolute right-0 top-full mt-2 w-64 p-4 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
<p className="text-sm text-gray-600">Track your progress across different fitness aspects. Each bar represents your current level in that category.</p>
</div>
</div>
</div>
<div className="space-y-8">
<div className="relative">
<div className="flex justify-between mb-3">
<div className="flex items-center gap-2">
<div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
<i className="fas fa-dumbbell text-indigo-600"></i>
</div>
<span className="font-medium text-gray-700">Strength</span>
</div>
<div className="flex items-center gap-2">
<span className="text-2xl font-bold text-indigo-600">{userStats.strengthProgress}</span>
<span className="text-gray-400">/ 100</span>
</div>
</div>
<div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden">
<div
className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-1000 transform origin-left"
style={{width: `${userStats.strengthProgress}%`}}
>
<div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
</div>
</div>
</div>
<div className="relative">
<div className="flex justify-between mb-3">
<div className="flex items-center gap-2">
<div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
<i className="fas fa-running text-emerald-600"></i>
</div>
<span className="font-medium text-gray-700">Cardio</span>
</div>
<div className="flex items-center gap-2">
<span className="text-2xl font-bold text-emerald-600">{userStats.cardioProgress}</span>
<span className="text-gray-400">/ 100</span>
</div>
</div>
<div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden">
<div
className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-1000 transform origin-left"
style={{width: `${userStats.cardioProgress}%`}}
>
<div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
</div>
</div>
</div>
<div className="relative">
<div className="flex justify-between mb-3">
<div className="flex items-center gap-2">
<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
<i className="fas fa-child text-purple-600"></i>
</div>
<span className="font-medium text-gray-700">Flexibility</span>
</div>
<div className="flex items-center gap-2">
<span className="text-2xl font-bold text-purple-600">{userStats.flexibilityProgress}</span>
<span className="text-gray-400">/ 100</span>
</div>
</div>
<div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden">
<div
className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-1000 transform origin-left"
style={{width: `${userStats.flexibilityProgress}%`}}
>
<div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
</div>
</div>
</div>
</div>
</div>
<div className="bg-white rounded-xl shadow-lg p-6">
<h3 className="text-lg font-semibold mb-6">Weekly Activity</h3>
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
style={{height: `${(day.calories / 600) * 100}%`, opacity: 0.7}}
></div>
</div>
<span className="mt-2 text-sm text-gray-600">{day.day}</span>
</div>
))}
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
<h3 className="text-lg font-semibold mb-6">Monthly Progress</h3>
<div ref={progressChartRef} style={{height: '300px'}}></div>
</div>
<div className="bg-white rounded-xl shadow-lg p-6">
<h3 className="text-lg font-semibold mb-6">Recent Achievements</h3>
<div className="space-y-4">
{userStats.recentAchievements.map((achievement, index) => (
<div key={index} className="flex items-start space-x-3">
<div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
<i className={`fas fa-${achievement.type === 'Strength' ? 'dumbbell' : achievement.type === 'Cardio' ? 'running' : 'child'} text-indigo-600`}></i>
</div>
<div>
<p className="text-sm font-medium text-gray-900">{achievement.value}</p>
<p className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
</div>
</div>
))}
</div>
</div>
</div>
<div className="mt-8 flex justify-between">
<button
onClick={handleBack}
className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all !rounded-button whitespace-nowrap"
>
Back
</button>
<button
onClick={handleNext}
className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all !rounded-button whitespace-nowrap"
>
Continue to Workout
</button>
</div>
</div>
</div>
);
case 5:
return (
<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-8">
<div className="max-w-6xl mx-auto">
<div className="mb-8">
<h2 className="text-3xl font-bold text-gray-800 mb-4">Your Personalized Workout Plan</h2>
<p className="text-gray-600">A comprehensive 30-day program tailored to your goals</p>
</div>
<div className="grid grid-cols-3 gap-8">
<div className="col-span-2 bg-white rounded-xl shadow-lg p-8">
<h3 className="text-xl font-semibold mb-6">Weekly Schedule</h3>
<div className="overflow-x-auto pb-4">
<div className="flex gap-4 min-w-max">
{Object.entries(formData.schedule).map(([day, schedule]) => {
const getWorkoutType = () => {
if (!schedule.active) return { color: 'gray', icon: 'bed', label: 'Rest' };
switch(schedule.intensity) {
case 'high': return {
color: 'blue',
icon: 'dumbbell',
label: 'Strength',
gradient: 'from-blue-50 to-indigo-50',
iconColor: 'text-blue-600'
};
case 'medium': return {
color: 'green',
icon: 'running',
label: 'Cardio',
gradient: 'from-green-50 to-emerald-50',
iconColor: 'text-green-600'
};
default: return {
color: 'amber',
icon: 'yoga',
label: 'Recovery',
gradient: 'from-amber-50 to-yellow-50',
iconColor: 'text-amber-600'
};
}
};
const workoutType = getWorkoutType();
const isToday = day === 'Wed';
return (
<div
key={day}
className={`w-[280px] rounded-xl ${isToday ? 'ring-2 ring-blue-500' : ''} cursor-pointer`}
onClick={() => {
setFormData(prev => ({
...prev,
schedule: {
...prev.schedule,
[day]: {
...prev.schedule[day as keyof typeof prev.schedule],
active: !prev.schedule[day as keyof typeof prev.schedule].active
}
}
}));
}}
>
<div className={`p-6 bg-gradient-to-br ${workoutType.gradient} rounded-xl transition-all hover:shadow-lg`}>
<div className="flex items-center justify-between mb-4">
<div>
<h3 className={`text-xl font-semibold ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
{day}
</h3>
<p className="text-sm text-gray-500">
{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
</p>
</div>
<div className={`w-12 h-12 rounded-full flex items-center justify-center ${schedule.active ? `bg-${workoutType.color}-100` : 'bg-gray-100'}`}>
<i className={`fas fa-${workoutType.icon} text-xl ${schedule.active ? workoutType.iconColor : 'text-gray-400'}`}></i>
</div>
</div>
<div className="space-y-4">
<div className="flex items-center gap-2">
<div className={`px-3 py-1 rounded-full text-sm font-medium ${
schedule.active
? `bg-${workoutType.color}-100 text-${workoutType.color}-700`
: 'bg-gray-100 text-gray-600'
}`}>
{workoutType.label}
</div>
{schedule.active && (
<div className="flex items-center gap-1 text-sm text-gray-500">
<i className="fas fa-clock"></i>
{schedule.startTime} - {schedule.endTime}
</div>
)}
</div>
{schedule.active && (
<div className="space-y-3">
<div className="flex items-center justify-between text-sm">
<span className="text-gray-600">Duration</span>
<span className="font-medium">45 min</span>
</div>
<div className="flex items-center justify-between text-sm">
<span className="text-gray-600">Intensity</span>
<div className="flex items-center gap-1">
{[1, 2, 3].map((level) => (
<div
key={level}
className={`w-4 h-1 rounded-full ${
level <= (schedule.intensity === 'high' ? 3 : schedule.intensity === 'medium' ? 2 : 1)
? `bg-${workoutType.color}-500`
: 'bg-gray-200'
}`}
/>
))}
</div>
</div>
<button
onClick={(e) => {
e.stopPropagation();
setFormData(prev => ({
...prev,
schedule: {
...prev.schedule,
[day]: {
...prev.schedule[day as keyof typeof prev.schedule],
notifications: !prev.schedule[day as keyof typeof prev.schedule].notifications
}
}
}));
}}
className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white rounded-lg hover:bg-opacity-90 transition-all"
>
<i className={`fas fa-bell text-sm ${schedule.notifications ? workoutType.iconColor : 'text-gray-400'}`}></i>
<span className="text-sm font-medium">Reminders {schedule.notifications ? 'On' : 'Off'}</span>
</button>
</div>
)}
{!schedule.active && (
<div className="text-center py-4">
<p className="text-gray-500">Rest & Recovery Day</p>
</div>
)}
</div>
</div>
</div>
);
})}
</div>
</div>
<div className="mt-8">
<div className="flex items-center justify-between mb-4">
<button
onClick={() => setCurrentDay(prev => (prev === 0 ? 6 : prev - 1))}
className="text-indigo-600 hover:text-indigo-800 transition-colors !rounded-button cursor-pointer whitespace-nowrap"
>
<i className="fas fa-chevron-left"></i>
</button>
<h3 className="text-xl font-semibold">
{['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentDay]}'s Workout
</h3>
<button
onClick={() => setCurrentDay(prev => (prev === 6 ? 0 : prev + 1))}
className="text-indigo-600 hover:text-indigo-800 transition-colors !rounded-button cursor-pointer whitespace-nowrap"
>
<i className="fas fa-chevron-right"></i>
</button>
</div>
<div className="space-y-4">
{(() => {
const dayKey = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][currentDay];
if (!formData.schedule[dayKey as keyof typeof formData.schedule].active) {
return (
<div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
<i className="fas fa-bed text-4xl text-gray-400 mb-4"></i>
<p className="text-lg text-gray-600">Rest Day</p>
<p className="text-sm text-gray-500 mt-2">Take time to recover and recharge</p>
</div>
);
}
return [
{ name: 'Warm-up', duration: '10 min', type: 'Cardio' },
{ name: currentDay % 2 === 0 ? 'Push-ups' : 'Pull-ups', duration: '15 min', type: 'Strength' },
{ name: currentDay % 2 === 0 ? 'Squats' : 'Lunges', duration: '15 min', type: 'Strength' },
{ name: currentDay % 2 === 0 ? 'Planks' : 'Russian Twists', duration: '10 min', type: 'Core' },
{ name: 'Cool-down', duration: '10 min', type: 'Stretching' }
].map((exercise, index) => (
<div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div>
<h4 className="font-medium">{exercise.name}</h4>
<p className="text-sm text-gray-600">{exercise.type}</p>
</div>
<div className="text-right">
<p className="font-medium">{exercise.duration}</p>
</div>
</div>
));
})()}
</div>
</div>
</div>
<div className="space-y-8">
<div className="bg-white rounded-xl shadow-lg p-8">
<h3 className="text-xl font-semibold mb-4">Fitness Assessment</h3>
<div ref={progressChartRef} style={{ height: '300px' }}></div>
</div>
<div className="bg-white rounded-xl shadow-lg p-8">
<h3 className="text-xl font-semibold mb-4">Available Equipment</h3>
<div className="space-y-3">
{[
{ id: 'dumbbells', name: 'Dumbbells (5-10kg)', icon: 'dumbbell' },
{ id: 'mat', name: 'Exercise Mat', icon: 'mattress-pillow' },
{ id: 'bands', name: 'Resistance Bands', icon: 'running' },
{ id: 'kettlebell', name: 'Kettlebell', icon: 'weight-hanging' },
{ id: 'pullup-bar', name: 'Pull-up Bar', icon: 'bars' },
{ id: 'bench', name: 'Exercise Bench', icon: 'bench-press' },
{ id: 'foam-roller', name: 'Foam Roller', icon: 'circle' }
].map(equipment => (
<div key={equipment.id}
className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
formData.equipment.includes(equipment.id)
? 'bg-indigo-100 text-indigo-700'
: 'bg-gray-50 hover:bg-gray-100'
}`}
onClick={() => {
setFormData(prev => ({
...prev,
equipment: prev.equipment.includes(equipment.id)
? prev.equipment.filter(id => id !== equipment.id)
: [...prev.equipment, equipment.id]
}));
}}>
<i className={`fas fa-${equipment.icon} ${formData.equipment.includes(equipment.id) ? 'text-indigo-600' : 'text-gray-500'} mr-3`}></i>
<span>{equipment.name}</span>
{formData.equipment.includes(equipment.id) && (
<i className="fas fa-check ml-auto text-indigo-600"></i>
)}
</div>
))}
</div>
</div>
</div>
</div>
<div className="mt-8 flex justify-between">
<button
onClick={handleBack}
className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all !rounded-button cursor-pointer whitespace-nowrap"
>
Back
</button>
<button
onClick={() => setShowNotification(true)}
className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all !rounded-button cursor-pointer whitespace-nowrap"
>
Start Workout
</button>
</div>
</div>
</div>
);
case 6:
return (
<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-8">
<div className="max-w-6xl mx-auto">
<div className="mb-8">
<h2 className="text-3xl font-bold text-gray-800 mb-4">Active Workout Session</h2>
<p className="text-gray-600">Follow along with your AI trainer</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div className="bg-white rounded-xl shadow-lg p-8">
<div className="relative">
{showCamera ? (
<div className="relative w-full h-64 bg-black rounded-lg overflow-hidden">
<video
ref={videoRef}
autoPlay
playsInline
className={`w-full h-full object-cover ${
formAnalysis.formStatus === 'warning' ? 'border-4 border-yellow-500' :
formAnalysis.formStatus === 'error' ? 'border-4 border-red-500' :
formAnalysis.formStatus === 'good' ? 'border-4 border-green-500' : ''
}`}
/>
{formAnalysis.guideStep === 0 && (
<div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
<div className="text-center text-white p-6 max-w-sm">
<i className="fas fa-camera text-4xl mb-4"></i>
<h3 className="text-xl font-bold mb-2">Form Analysis Setup</h3>
<p className="mb-4">Position yourself fully in frame, about 6 feet from the camera</p>
<button
onClick={() => setFormAnalysis(prev => ({ ...prev, guideStep: 1 }))}
className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all !rounded-button whitespace-nowrap"
>
Continue
</button>
</div>
</div>
)}
{formAnalysis.guideStep === 1 && (
<div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
<div className="text-center text-white p-6 max-w-sm">
<i className="fas fa-walking text-4xl mb-4"></i>
<h3 className="text-xl font-bold mb-2">Calibration</h3>
<p className="mb-4">Stand in a neutral position with arms at your sides</p>
<button
onClick={() => setFormAnalysis(prev => ({ ...prev, guideStep: 2 }))}
className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all !rounded-button whitespace-nowrap"
>
Start Analysis
</button>
</div>
</div>
)}
<div className="absolute bottom-4 right-4 space-x-2 flex">
{formAnalysis.recordedSession ? (
<button
onClick={() => {
// Implement replay logic
}}
className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-all !rounded-button whitespace-nowrap"
>
<i className="fas fa-play mr-1"></i> Replay
</button>
) : (
<button
onClick={() => {
setFormAnalysis(prev => ({ ...prev, isRecording: !prev.isRecording }));
}}
className={`px-3 py-1 ${
formAnalysis.isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'
} text-white rounded-lg text-sm transition-all !rounded-button whitespace-nowrap`}
>
<i className={`fas fa-${formAnalysis.isRecording ? 'stop' : 'record-vinyl'} mr-1`}></i>
{formAnalysis.isRecording ? 'Stop Recording' : 'Record'}
</button>
)}
<button
onClick={() => {
setShowCamera(false);
stopCamera();
}}
className="px-3 py-1 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-all !rounded-button whitespace-nowrap"
>
<i className="fas fa-video-slash mr-1"></i> Stop Camera
</button>
</div>
<div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg flex items-center">
<i className={`fas fa-circle ${
formAnalysis.isRecording ? 'text-red-600 animate-pulse' : 'text-green-600'
} mr-2`}></i>
{formAnalysis.isRecording ? 'Recording' : 'Form Analysis Active'}
</div>
{formAnalysis.feedback.length > 0 && (
<div className={`absolute top-4 right-4 max-w-xs p-3 rounded-lg ${
formAnalysis.formStatus === 'warning' ? 'bg-yellow-100 text-yellow-800' :
formAnalysis.formStatus === 'error' ? 'bg-red-100 text-red-800' :
'bg-green-100 text-green-800'
}`}>
<div className="flex items-center">
<i className={`fas fa-${
formAnalysis.formStatus === 'warning' ? 'exclamation-triangle' :
formAnalysis.formStatus === 'error' ? 'exclamation-circle' :
'check-circle'
} mr-2`}></i>
<p className="text-sm font-medium">{formAnalysis.feedback[0]}</p>
</div>
</div>
)}
<div className="absolute bottom-4 left-4">
<div className="flex items-center space-x-2 text-white text-sm">
<div className={`w-2 h-2 rounded-full ${
formAnalysis.formStatus === 'good' ? 'bg-green-500' :
formAnalysis.formStatus === 'warning' ? 'bg-yellow-500' :
formAnalysis.formStatus === 'error' ? 'bg-red-500' : 'bg-gray-500'
}`}></div>
<span>Form Quality</span>
</div>
</div>
</div>
) : (
<div className="relative">
<img
src="https://public.readdy.ai/ai/img_res/9654d29103e406dd8a2d10537c6b4cd8.jpg"
alt="Exercise Demonstration"
className="w-full h-64 object-cover rounded-lg"
/>
<button
onClick={() => {
setShowCamera(true);
startCamera();
}}
className="absolute bottom-4 right-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all !rounded-button whitespace-nowrap"
>
<i className="fas fa-video mr-2"></i>
Start Form Analysis
</button>
</div>
)}
</div>
<div className="text-center mb-8">
<div className="flex items-center justify-center gap-4 mb-4">
<h3 className="text-2xl font-bold">{exercises[currentExerciseIndex].name}</h3>
<div className="flex items-center gap-2">
<button
onClick={() => setAudioSettings(prev => ({...prev, timerReminders: !prev.timerReminders}))}
className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all !rounded-button"
title={audioSettings.timerReminders ? "Disable timer reminders" : "Enable timer reminders"}
>
<i className={`fas fa-clock ${audioSettings.timerReminders ? 'text-indigo-600' : 'text-gray-400'}`}></i>
</button>
<button
onClick={() => setAudioSettings(prev => ({...prev, formFeedback: !prev.formFeedback}))}
className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all !rounded-button"
title={audioSettings.formFeedback ? "Disable form feedback" : "Enable form feedback"}
>
<i className={`fas fa-comment-alt ${audioSettings.formFeedback ? 'text-indigo-600' : 'text-gray-400'}`}></i>
</button>
</div>
</div>
<p className="text-gray-600">{exercises[currentExerciseIndex].type}</p>
{isSpeaking && (audioSettings.timerReminders || audioSettings.formFeedback) && (
<div className="mt-2 flex items-center justify-center text-indigo-600">
<i className="fas fa-microphone-alt animate-pulse mr-2"></i>
<span className="text-sm">AI Trainer Speaking...</span>
</div>
)}
</div>
<div className="mb-8">
<h4 className="font-semibold mb-2">Instructions:</h4>
<p className="text-gray-600">{exercises[currentExerciseIndex].instructions}</p>
</div>
<div className="text-center">
<div className="text-4xl font-bold mb-4">{formatTime(exerciseTimer)}</div>
<div className="flex justify-center space-x-4">
{!isExerciseActive ? (
<button
onClick={() => {
setIsExerciseActive(true);
if (exerciseTimer === 0) {
setExerciseTimer(exercises[currentExerciseIndex].duration);
}
if (audioSettings.formFeedback) {
setIsSpeaking(true);
const utterance = new SpeechSynthesisUtterance();
utterance.text = `Starting ${exercises[currentExerciseIndex].name}. ${exercises[currentExerciseIndex].instructions}`;
utterance.volume = audioSettings.volume / 100;
utterance.onend = () => setIsSpeaking(false);
window.speechSynthesis.speak(utterance);
}
}}
className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all !rounded-button whitespace-nowrap"
>
{exerciseTimer === 0 ? 'Start Exercise' : 'Resume'}
</button>
) : (
<button
onClick={() => setIsExerciseActive(false)}
className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all !rounded-button whitespace-nowrap"
>
Pause
</button>
)}
{exerciseTimer !== 0 && (
<button
onClick={() => {
setIsExerciseActive(false);
setExerciseTimer(exercises[currentExerciseIndex].duration);
}}
className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all !rounded-button whitespace-nowrap"
>
Reset
</button>
)}
</div>
</div>
</div>
<div className="space-y-8">
<div className="bg-white rounded-xl shadow-lg p-8">
<h3 className="text-xl font-semibold mb-4">Workout Progress</h3>
<div className="space-y-4">
{exercises.map((exercise, index) => (
<div
key={index}
className={`p-4 rounded-lg ${
index === currentExerciseIndex
? 'bg-indigo-100 border-2 border-indigo-500'
: index < currentExerciseIndex
? 'bg-green-100'
: 'bg-gray-100'
}`}
>
<div className="flex justify-between items-center">
<div>
<h4 className="font-medium">{exercise.name}</h4>
<p className="text-sm text-gray-600">{exercise.type}</p>
</div>
<div className="text-right">
<p className="font-medium">{formatTime(exercise.duration)}</p>
</div>
</div>
</div>
))}
</div>
</div>
<div className="space-y-8">
<div className="bg-white rounded-xl shadow-lg p-8">
<h3 className="text-xl font-semibold mb-4">Workout Stats</h3>
<div className="grid grid-cols-2 gap-4">
<div className="text-center p-4 bg-gray-50 rounded-lg">
<p className="text-sm text-gray-600">Calories Burned</p>
<p className="text-2xl font-bold text-indigo-600">245</p>
</div>
<div className="text-center p-4 bg-gray-50 rounded-lg">
<p className="text-sm text-gray-600">Time Elapsed</p>
<p className="text-2xl font-bold text-indigo-600">24:30</p>
</div>
</div>
</div>
{showCamera && formAnalysis.score > 0 && (
<div className="bg-white rounded-xl shadow-lg p-8">
<div className="flex items-center justify-between mb-6">
<h3 className="text-xl font-semibold">Form Analysis</h3>
<div className="flex items-center">
<span className="text-3xl font-bold text-indigo-600">{formAnalysis.score}</span>
<span className="text-gray-400 ml-1">/10</span>
</div>
</div>
<div className="space-y-6">
<div>
<h4 className="text-sm font-semibold text-gray-600 mb-3">Real-time Feedback</h4>
<div className="space-y-2">
{formAnalysis.feedback.map((feedback, index) => (
<div key={index} className="flex items-start space-x-2">
<i className="fas fa-check-circle text-green-500 mt-1"></i>
<p className="text-gray-700">{feedback}</p>
</div>
))}
</div>
</div>
<div>
<h4 className="text-sm font-semibold text-gray-600 mb-3">Suggested Improvements</h4>
<div className="space-y-2">
{formAnalysis.improvements.map((improvement, index) => (
<div key={index} className="flex items-start space-x-2">
<i className="fas fa-lightbulb text-yellow-500 mt-1"></i>
<p className="text-gray-700">{improvement}</p>
</div>
))}
</div>
</div>
</div>
</div>
)}
</div>
</div>
</div>
<div className="mt-8 flex justify-between">
<button
onClick={() => {
setCurrentStep(4);
setCurrentExerciseIndex(0);
setIsExerciseActive(false);
setExerciseTimer(0);
completeWorkout();
}}
className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all !rounded-button whitespace-nowrap"
>
End Workout
</button>
{currentExerciseIndex === exercises.length - 1 && exerciseTimer === 0 && (
<button
onClick={() => {
setCurrentStep(4);
setCurrentExerciseIndex(0);
setIsExerciseActive(false);
setExerciseTimer(0);
completeWorkout();
}}
className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all !rounded-button whitespace-nowrap"
>
Complete Workout
</button>
)}
</div>
</div>
</div>
);
}
};
const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
const [loginForm, setLoginForm] = useState({
email: '',
password: '',
rememberMe: false
});
const [loginError, setLoginError] = useState<string>('');
const handleLogin = () => {
setShowLoginModal(true);
setLoginForm({
email: '',
password: '',
rememberMe: false
});
setLoginError('');
};
const [adaptationHistory, setAdaptationHistory] = useState<{
date: string;
reason: string;
changes: Array<{
exercise: string;
modification: string;
explanation: string;
}>;
}[]>([]);
const handleLoginSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setLoginError('');
// Simple validation
if (!loginForm.email || !loginForm.password) {
setLoginError('Please fill in all fields');
return;
}
if (!loginForm.email.includes('@')) {
setLoginError('Please enter a valid email address');
return;
}
try {
// Show loading state
const submitButton = (e.target as HTMLFormElement).querySelector('button[type="submit"]') as HTMLButtonElement;
const originalText = submitButton.innerHTML;
submitButton.disabled = true;
submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
// Simulate API call
await new Promise(resolve => setTimeout(resolve, 1500));
setUser({
id: '123',
name: 'Alex Thompson',
email: loginForm.email,
avatar: 'https://public.readdy.ai/ai/img_res/8abd254c66809a7324d5e23e88d06918.jpg',
isLoggedIn: true
});
setShowLoginModal(false);
setLoginForm({ email: '', password: '', rememberMe: false });
// Show success notification
const notification = document.createElement('div');
notification.className = 'fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg';
notification.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Successfully signed in!';
document.body.appendChild(notification);
setTimeout(() => notification.remove(), 3000);
} catch (error) {
setLoginError('An error occurred. Please try again.');
} finally {
const submitButton = (e.target as HTMLFormElement).querySelector('button[type="submit"]') as HTMLButtonElement;
submitButton.disabled = false;
submitButton.innerHTML = 'Sign In';
}
};
const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);
const handleLogout = () => {
setShowLogoutConfirm(true);
};
const confirmLogout = () => {
setUser({
id: '',
name: '',
email: '',
avatar: '',
isLoggedIn: false
});
setCurrentStep(0);
setShowLogoutConfirm(false);
};
const completeWorkout = () => {
// Generate AI adaptations based on workout feedback
const generateAdaptations = () => {
const adaptations = {
date: new Date().toISOString(),
reason: "Based on your recent performance and feedback",
changes: exercises.map(ex => {
const feedback = workoutFeedback.exerciseFeedback[ex.name];
if (feedback?.difficulty === 'too-easy') {
return {
exercise: ex.name,
modification: "Increased difficulty",
explanation: "You consistently performed well in this exercise"
};
} else if (feedback?.difficulty === 'too-hard') {
return {
exercise: ex.name,
modification: "Decreased difficulty",
explanation: "Adjusting to help you maintain proper form"
};
}
return {
exercise: ex.name,
modification: "Maintained current level",
explanation: "Your current performance is optimal"
};
})
};
setAdaptationHistory(prev => [adaptations, ...prev]);
};
generateAdaptations();
const newWorkout = {
date: new Date().toISOString(),
duration: 3600,
caloriesBurned: 245,
exercises: exercises.map(ex => ({
name: ex.name,
difficulty: ex.difficulty || 'medium',
performance: ex.performance || 'just-right',
completionRate: ex.completionRate || 100,
})),
muscleGroups: ['Legs', 'Core'],
overallDifficulty: 'just-right',
adaptationNeeded: false
};
setWorkoutHistory(prev => [newWorkout, ...prev]);
// Check for progression
const recentWorkouts = [newWorkout, ...workoutHistory.slice(0, 2)];
const readyForProgression = recentWorkouts.length >= 3 &&
recentWorkouts.every(workout =>
workout.exercises.every(ex =>
ex.completionRate >= 90 &&
(ex.performance === 'too-easy' || ex.performance === 'just-right')
)
);
if (readyForProgression) {
setShowProgressionModal(true);
} else {
setShowWorkoutFeedbackModal(true);
}
// Update user stats
setUserStats(prev => {
const lastWorkoutDate = new Date(prev.lastWorkoutDate);
const today = new Date();
const dayDiff = Math.floor((today.getTime() - lastWorkoutDate.getTime()) / (1000 * 60 * 60 * 24));
const newStreak = dayDiff === 1 ? prev.currentStreak + 1 : 1;
return {
...prev,
totalWorkouts: prev.totalWorkouts + 1,
totalMinutes: prev.totalMinutes + 60,
totalCalories: prev.totalCalories + 245,
currentStreak: newStreak,
longestStreak: Math.max(prev.longestStreak, newStreak),
lastWorkoutDate: today.toISOString()
};
});
// Check and award achievements
const newAchievements = [...achievements];
const checkAndUpdateAchievement = (id: string, condition: boolean, progress?: number) => {
const achievement = newAchievements.find(a => a.id === id);
if (achievement) {
if (condition && !achievement.earned) {
achievement.earned = true;
achievement.date = new Date().toISOString();
setShowAchievementNotification(true);
} else if (progress !== undefined) {
achievement.progress = progress;
}
}
};
// Check various achievements
checkAndUpdateAchievement('first-workout', userStats.totalWorkouts === 0);
checkAndUpdateAchievement('week-streak', userStats.currentStreak === 7);
checkAndUpdateAchievement('strength-master', false, Math.min(userStats.totalWorkouts, 10));
checkAndUpdateAchievement('calorie-milestone', userStats.totalCalories >= 10000, userStats.totalCalories);
checkAndUpdateAchievement('perfect-month', false, userStats.totalWorkouts);
// Check equipment mastery
const usedEquipment = new Set(formData.equipment);
checkAndUpdateAchievement('equipment-master', usedEquipment.size === 7, usedEquipment.size);
setAchievements(newAchievements);
};
const [showAchievementNotification, setShowAchievementNotification] = useState(false);
const [showRecoveryPlan, setShowRecoveryPlan] = useState(false);
const [showWorkoutFeedbackModal, setShowWorkoutFeedbackModal] = useState(false);
const [showProgressionModal, setShowProgressionModal] = useState(false);
const [workoutFeedback, setWorkoutFeedback] = useState<{
overallDifficulty: 'too-easy' | 'just-right' | 'too-hard';
exerciseFeedback: {
[key: string]: {
difficulty: 'too-easy' | 'just-right' | 'too-hard';
completionRate: number;
};
};
}>({
overallDifficulty: 'just-right',
exerciseFeedback: {}
});
const [recoveryPlan, setRecoveryPlan] = useState<{
title: string;
description: string;
exercises: Array<{
name: string;
duration: number;
instructions: string;
image: string;
}>;
}>({
title: '',
description: '',
exercises: []
});
useEffect(() => {
if (showRecoveryPlan) {
// Generate personalized recovery plan based on the latest workout
const latestWorkout = workoutHistory[0];
if (latestWorkout) {
const isLegDay = latestWorkout.exercises.some(ex =>
ex.toLowerCase().includes('squat') ||
ex.toLowerCase().includes('lunge') ||
ex.toLowerCase().includes('leg')
);
const recoveryExercises = isLegDay ? [
{
name: 'Quad Stretch',
duration: 60,
instructions: 'Stand on one leg, bend your knee and bring your heel toward your buttocks. Hold for 30 seconds each side.',
image: 'https://public.readdy.ai/ai/img_res/6bb7f416ca9cd4421a22fa87cd93ea03.jpg'
},
{
name: 'Hamstring Stretch',
duration: 60,
instructions: 'Sit with one leg extended, reach for your toes while keeping your back straight. Hold for 30 seconds each side.',
image: 'https://public.readdy.ai/ai/img_res/6b85d22d71b40a4f83ddd3d5a3b3aa95.jpg'
},
{
name: 'Foam Rolling - Quads',
duration: 90,
instructions: 'Place the foam roller under your thighs, roll slowly from hip to knee, pausing on tight spots.',
image: 'https://public.readdy.ai/ai/img_res/238d867c5cf6d0faf0ae4fb84d9e2652.jpg'
}
] : [
{
name: 'Child\'s Pose',
duration: 60,
instructions: 'Kneel on the floor, sit back on your heels, and stretch your arms forward. Hold and breathe deeply.',
image: 'https://public.readdy.ai/ai/img_res/2c8af2a82b31b7e936b4af07411ea642.jpg'
},
{
name: 'Cat-Cow Stretch',
duration: 60,
instructions: 'On hands and knees, alternate between arching and rounding your back, moving with your breath.',
image: 'https://public.readdy.ai/ai/img_res/562c0653cb2095bc06dff91c57714a43.jpg'
}
];
setRecoveryPlan({
title: isLegDay ? 'Leg Day Recovery' : 'Post-Workout Recovery',
description: isLegDay
? 'Great leg workout! Let\'s reduce muscle soreness with these targeted stretches.'
: 'Nice work! Try these recovery exercises to help your body bounce back stronger.',
exercises: recoveryExercises
});
}
}
}, [showRecoveryPlan, workoutHistory]);
return (
<div className="relative">
{!user.isLoggedIn && (
<div className="absolute top-4 left-4 flex items-center space-x-4">
<button
onClick={handleLogin}
className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all !rounded-button whitespace-nowrap flex items-center gap-2"
>
<i className="fas fa-user"></i>
Sign In
</button>
<button
className="px-6 py-2 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-all !rounded-button whitespace-nowrap flex items-center gap-2"
onClick={() => {
setShowLoginModal(true);
setLoginForm({ email: '', password: '', rememberMe: false });
}}
>
<i className="fas fa-user-plus"></i>
Sign Up
</button>
</div>
)}
{showLoginModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
<div className="flex justify-between items-center mb-6">
<h3 className="text-2xl font-bold">Sign In</h3>
<button
onClick={() => {
setShowLoginModal(false);
setLoginError('');
setLoginForm({ email: '', password: '', rememberMe: false });
}}
className="text-gray-400 hover:text-gray-600"
>
<i className="fas fa-times"></i>
</button>
</div>
<form onSubmit={handleLoginSubmit}>
<div className="space-y-4">
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
<input
type="email"
value={loginForm.email}
onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
placeholder="Enter your email"
/>
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
<input
type="password"
value={loginForm.password}
onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
placeholder="Enter your password"
/>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center">
<input
type="checkbox"
id="remember-me"
checked={loginForm.rememberMe}
onChange={(e) => setLoginForm(prev => ({ ...prev, rememberMe: e.target.checked }))}
className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
/>
<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
Remember me
</label>
</div>
<button type="button" className="text-sm text-indigo-600 hover:text-indigo-500">
Forgot password?
</button>
</div>
{loginError && (
<div className="text-red-500 text-sm">{loginError}</div>
)}
<button
type="submit"
className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all !rounded-button whitespace-nowrap"
>
Sign In
</button>
</div>
</form>
<div className="mt-6 text-center text-sm text-gray-600">
Don't have an account?{' '}
<button className="text-indigo-600 hover:text-indigo-500 font-medium">
Sign up
</button>
</div>
</div>
</div>
)}
{showLogoutConfirm && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
<h3 className="text-2xl font-bold mb-4">Sign Out</h3>
<p className="text-gray-600 mb-6">
Are you sure you want to sign out? Your progress will be saved.
</p>
<div className="flex justify-end space-x-4">
<button
onClick={() => setShowLogoutConfirm(false)}
className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all !rounded-button whitespace-nowrap"
>
Cancel
</button>
<button
onClick={confirmLogout}
className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all !rounded-button whitespace-nowrap"
>
Sign Out
</button>
</div>
</div>
</div>
)}
{user.isLoggedIn && (
<div className="absolute top-4 right-4 flex items-center space-x-4">
<div className="flex items-center space-x-2">
<img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
<span className="text-gray-700">{user.name}</span>
</div>
<button
onClick={handleLogout}
className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all !rounded-button whitespace-nowrap"
>
Sign Out
</button>
</div>
)}
{currentStep === 4 && user.isLoggedIn && (
<div className="absolute top-20 right-4 bg-white rounded-xl shadow-lg p-6 w-80">
<div className="mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-4 text-white relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-shine"></div>
<div className="flex items-center justify-between mb-2 relative">
<div className="flex items-center">
<div className="relative">
<i className={`fas fa-fire text-2xl mr-2 ${userStats.currentStreak >= 7 ? 'animate-flicker' : ''}`}></i>
<div className={`absolute -inset-1 bg-orange-400 rounded-full ${userStats.currentStreak >= 7 ? 'animate-ping opacity-30' : 'opacity-0'}`}></div>
</div>
<div>
<span className="text-lg font-bold flex items-center">
{userStats.currentStreak} Day Streak!
{userStats.currentStreak >= userStats.longestStreak && (
<span className="ml-2 text-yellow-300 animate-bounce">🏆</span>
)}
</span>
<div className="h-1 bg-white/30 rounded-full mt-1">
<div
className="h-full bg-white rounded-full transition-all duration-500"
style={{width: `${(userStats.currentStreak / 30) * 100}%`}}
></div>
</div>
</div>
</div>
<div className="text-right">
<span className="text-sm">Best: {userStats.longestStreak}</span>
<div className="text-xs mt-1 opacity-75">
{30 - userStats.currentStreak} days to monthly goal
</div>
</div>
</div>
<div className="text-sm opacity-90 relative z-10">
Keep up the momentum! You're building a healthy habit.
{userStats.currentStreak >= 7 && (
<div className="mt-2 text-xs bg-white/20 rounded-full px-3 py-1 inline-block">
<i className="fas fa-star text-yellow-300 mr-1"></i>
Week warrior status achieved!
</div>
)}
</div>
</div>
<div className="flex justify-between items-center mb-6">
<h3 className="text-lg font-semibold">Recent Progress</h3>
<div className="flex space-x-2">
<span className="text-sm text-gray-500">This Week</span>
<i className="fas fa-chevron-down text-gray-400"></i>
</div>
</div>
<div className="space-y-4">
{workoutHistory.slice(0, 3).map((workout, index) => (
<div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all cursor-pointer">
<div className="flex justify-between items-center mb-2">
<div className="flex items-center">
<div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
<i className="fas fa-dumbbell text-indigo-600"></i>
</div>
<div>
<p className="font-medium">{new Date(workout.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
<p className="text-sm text-gray-600">{workout.exercises.length} exercises</p>
</div>
</div>
<div className="text-right">
<p className="font-medium text-indigo-600">{Math.round(workout.caloriesBurned)} cal</p>
<p className="text-sm text-gray-600">{Math.round(workout.duration / 60)} min</p>
</div>
</div>
<div className="flex flex-wrap gap-2">
{workout.exercises.slice(0, 2).map((exercise, i) => (
<span key={i} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">{exercise}</span>
))}
{workout.exercises.length > 2 && (
<span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">+{workout.exercises.length - 2} more</span>
)}
</div>
</div>
))}
{workoutHistory.length > 3 && (
<div className="mt-6 text-center">
<button
onClick={() => {
const HistoryModal = () => {
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;
const totalPages = Math.ceil(workoutHistory.length / itemsPerPage);
const paginatedWorkouts = workoutHistory.slice(
(currentPage - 1) * itemsPerPage,
currentPage * itemsPerPage
);
return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
<div className="flex justify-between items-center mb-6">
<h3 className="text-2xl font-bold">Workout History</h3>
<button
className="text-gray-400 hover:text-gray-600"
onClick={() => document.getElementById('history-modal')?.remove()}
>
<i className="fas fa-times"></i>
</button>
</div>
<div className="space-y-4">
{paginatedWorkouts.map((workout, index) => (
<div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all">
<div className="flex justify-between items-center mb-2">
<div className="flex items-center">
<div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
<i className="fas fa-dumbbell text-indigo-600"></i>
</div>
<div>
<p className="font-medium">
{new Date(workout.date).toLocaleDateString('en-US', {
weekday: 'short',
month: 'short',
day: 'numeric'
})}
</p>
<p className="text-sm text-gray-600">{workout.exercises.length} exercises</p>
</div>
</div>
<div className="text-right">
<p className="font-medium text-indigo-600">{Math.round(workout.caloriesBurned)} cal</p>
<p className="text-sm text-gray-600">{Math.round(workout.duration / 60)} min</p>
</div>
</div>
<div className="flex flex-wrap gap-2">
{workout.exercises.map((exercise, i) => (
<span key={i} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
{exercise}
</span>
))}
</div>
</div>
))}
</div>
<div className="mt-6 flex justify-center items-center gap-4">
<button
onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
disabled={currentPage === 1}
className={`p-2 rounded-lg ${
currentPage === 1
? 'text-gray-400 cursor-not-allowed'
: 'text-indigo-600 hover:bg-indigo-50'
}`}
>
<i className="fas fa-chevron-left"></i>
</button>
<span className="text-gray-600">
Page {currentPage} of {totalPages}
</span>
<button
onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
disabled={currentPage === totalPages}
className={`p-2 rounded-lg ${
currentPage === totalPages
? 'text-gray-400 cursor-not-allowed'
: 'text-indigo-600 hover:bg-indigo-50'
}`}
>
<i className="fas fa-chevron-right"></i>
</button>
</div>
</div>
</div>
);
};
const modalContainer = document.createElement('div');
modalContainer.id = 'history-modal';
document.body.appendChild(modalContainer);
ReactDOM.render(<HistoryModal />, modalContainer);
}}
className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors !rounded-button whitespace-nowrap"
>
View All History <i className="fas fa-arrow-right ml-1"></i>
</button>
</div>
)}
</div>
<div className="mt-6 pt-6 border-t border-gray-100">
<div className="flex justify-between items-center mb-4">
<div className="flex items-center">
<h4 className="text-sm font-semibold">Achievements & Badges</h4>
<div className="ml-2 bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full">
{achievements.filter(a => a.earned).length}/{achievements.length}
</div>
</div>
<button className="text-indigo-600 text-sm hover:text-indigo-700 !rounded-button whitespace-nowrap">View All</button>
</div>
<div className="space-y-4">
{achievements.slice(0, 3).map((achievement, index) => (
<div key={index} className={`relative group transition-all duration-300 ${
achievement.earned
? 'transform hover:scale-102 hover:shadow-lg bg-white'
: 'opacity-60 hover:opacity-80 filter grayscale hover:grayscale-0 bg-gray-50'
}`}>
<div className={`flex items-center space-x-3 p-3 rounded-lg ${
achievement.earned
? 'bg-gradient-to-r from-indigo-50 to-purple-50 shadow-sm'
: 'bg-gray-100/50 backdrop-blur-sm'
}`}>
<div className={`w-12 h-12 rounded-full flex items-center justify-center relative ${
achievement.earned
? 'bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse-slow'
: 'bg-gray-200'
}`}>
{achievement.earned && (
<div className="absolute -inset-1 bg-indigo-400/30 rounded-full animate-ping"></div>
)}
<i className={`fas fa-${achievement.icon} ${achievement.earned ? 'text-white' : 'text-gray-400'} text-xl`}></i>
</div>
<div className="flex-1">
<div className="flex items-center justify-between">
<p className={`font-medium ${achievement.earned ? 'text-indigo-700' : 'text-gray-600'}`}>
{achievement.name}
{achievement.earned && (
<i className="fas fa-check-circle text-green-500 ml-2"></i>
)}
</p>
{achievement.earned && (
<div className="flex items-center bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
<i className="fas fa-trophy mr-1"></i>
{new Date(achievement.date!).toLocaleDateString()}
</div>
)}
</div>
<p className={`text-sm mt-1 ${achievement.earned ? 'text-gray-600' : 'text-gray-500'}`}>
{achievement.description}
</p>
{!achievement.earned && achievement.progress !== undefined && (
<div className="mt-3 bg-white/80 p-3 rounded-lg backdrop-blur-sm">
<div className="flex justify-between items-center mb-2">
<div className="flex items-center gap-2">
<span className="text-xs font-medium text-gray-700">{achievement.progress} / {achievement.total}</span>
<div className="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full text-xs font-medium">
{Math.round((achievement.progress / achievement.total!) * 100)}%
</div>
</div>
<div className="flex items-center gap-1 text-xs text-indigo-600/80">
<i className="fas fa-clock-rotate-left"></i>
<span className="font-medium">In Progress</span>
</div>
</div>
<div className="relative">
<div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
<div
className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
style={{width: `${(achievement.progress / achievement.total!) * 100}%`}}
>
<div className="absolute inset-0 bg-white/30 animate-pulse"></div>
<div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-r from-transparent to-white/30 animate-shimmer"></div>
</div>
</div>
<div className="absolute -right-1 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-2 border-indigo-500 shadow-md"></div>
</div>
<div className="mt-2 flex items-center justify-between text-xs">
<span className="text-indigo-600 font-medium">
{achievement.total! - achievement.progress} more to unlock
</span>
<div className="flex items-center gap-1 text-gray-500">
<i className="fas fa-lock text-gray-400"></i>
<span>Locked</span>
</div>
</div>
</div>
)}
</div>
</div>
{!achievement.earned && (
<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 rounded-lg pointer-events-none"></div>
)}
{!achievement.earned && (
<div className="hidden group-hover:block absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
Keep going! {achievement.progress !== undefined ? `${achievement.total! - achievement.progress} more to go!` : 'Complete the challenge to unlock'}
</div>
)}
</div>
))}
</div>
</div>
</div>
)}
{showWorkoutFeedbackModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4">
<div className="flex justify-between items-center mb-6">
<h3 className="text-2xl font-bold">How was your workout?</h3>
<button
onClick={() => {
setShowWorkoutFeedbackModal(false);
setShowRecoveryPlan(true);
}}
className="text-gray-400 hover:text-gray-600"
>
<i className="fas fa-times"></i>
</button>
</div>
<div className="mb-8">
<h4 className="text-lg font-semibold mb-4">Overall Difficulty</h4>
<div className="flex gap-4">
{['too-easy', 'just-right', 'too-hard'].map((difficulty) => (
<button
key={difficulty}
onClick={() => setWorkoutFeedback(prev => ({
...prev,
overallDifficulty: difficulty as typeof prev.overallDifficulty
}))}
className={`flex-1 p-4 rounded-xl border-2 transition-all ${
workoutFeedback.overallDifficulty === difficulty
? 'border-indigo-600 bg-indigo-50'
: 'border-gray-200 hover:border-indigo-300'
}`}
>
<div className="text-center">
<i className={`fas fa-${
difficulty === 'too-easy' ? 'smile' :
difficulty === 'just-right' ? 'thumbs-up' : 'tired'
} text-2xl ${
workoutFeedback.overallDifficulty === difficulty
? 'text-indigo-600'
: 'text-gray-400'
}`}></i>
<p className="mt-2 font-medium capitalize">
{difficulty.replace('-', ' ')}
</p>
</div>
</button>
))}
</div>
</div>
<div className="mb-8">
<h4 className="text-lg font-semibold mb-4">Exercise Feedback</h4>
<div className="space-y-4">
{exercises.map((exercise, index) => (
<div key={index} className="bg-gray-50 p-4 rounded-xl relative group">
<div className="flex items-center justify-between mb-2">
<div className="flex items-center gap-2">
<h5 className="font-medium">{exercise.name}</h5>
{adaptationHistory.length > 0 && adaptationHistory[0].changes.some(change => change.exercise === exercise.name) && (
<div className="relative">
<i className="fas fa-info-circle text-indigo-600 cursor-help"></i>
<div className="absolute left-0 bottom-full mb-2 w-80 p-6 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
<div className="relative">
<div className="absolute -top-1 -right-1">
<div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
</div>
<h6 className="text-lg font-semibold mb-3 text-gray-800">AI Workout Adaptation</h6>
<div className="space-y-4">
{adaptationHistory[0].changes
.filter(change => change.exercise === exercise.name)
.map((change, i) => (
<div key={i} className="bg-gray-50 rounded-lg p-4">
<div className="flex items-center gap-2 mb-2">
<i className="fas fa-chart-line text-indigo-600"></i>
<p className="font-medium text-indigo-700">{change.modification}</p>
</div>
<div className="flex items-start gap-2">
<i className="fas fa-lightbulb text-amber-500 mt-1"></i>
<p className="text-gray-600">{change.explanation}</p>
</div>
<div className="mt-3 pt-3 border-t border-gray-200">
<div className="flex items-center gap-2 text-sm text-gray-500">
<i className="fas fa-robot"></i>
<p>Based on your recent performance data</p>
</div>
</div>
</div>
))}
</div>
</div>
<div className="absolute -bottom-2 left-6 w-4 h-4 bg-white transform rotate-45 shadow-lg"></div>
</div>
</div>
)}
</div>
<div className="flex gap-2">
{['too-easy', 'just-right', 'too-hard'].map((difficulty) => (
<button
key={difficulty}
onClick={() => setWorkoutFeedback(prev => ({
...prev,
exerciseFeedback: {
...prev.exerciseFeedback,
[exercise.name]: {
...prev.exerciseFeedback[exercise.name],
difficulty: difficulty as 'too-easy' | 'just-right' | 'too-hard'
}
}
}))}
className={`p-2 rounded-lg transition-all ${
workoutFeedback.exerciseFeedback[exercise.name]?.difficulty === difficulty
? 'bg-indigo-100 text-indigo-600'
: 'hover:bg-gray-200'
}`}
>
<i className={`fas fa-${
difficulty === 'too-easy' ? 'smile' :
difficulty === 'just-right' ? 'thumbs-up' : 'tired'
}`}></i>
</button>
))}
</div>
</div>
<div className="flex items-center gap-4">
<span className="text-sm text-gray-600">Completion Rate:</span>
<input
type="range"
min="0"
max="100"
step="10"
value={workoutFeedback.exerciseFeedback[exercise.name]?.completionRate || 100}
onChange={(e) => setWorkoutFeedback(prev => ({
...prev,
exerciseFeedback: {
...prev.exerciseFeedback,
[exercise.name]: {
...prev.exerciseFeedback[exercise.name],
completionRate: parseInt(e.target.value)
}
}
}))}
className="flex-1"
/>
<span className="text-sm font-medium">
{workoutFeedback.exerciseFeedback[exercise.name]?.completionRate || 100}%
</span>
</div>
</div>
))}
</div>
</div>
<div className="flex justify-end">
<button
onClick={() => {
setShowWorkoutFeedbackModal(false);
setShowRecoveryPlan(true);
// Update workout history with feedback
setWorkoutHistory(prev => {
const updated = [...prev];
updated[0] = {
...updated[0],
overallDifficulty: workoutFeedback.overallDifficulty,
exercises: updated[0].exercises.map(ex => ({
...ex,
performance: workoutFeedback.exerciseFeedback[ex.name]?.difficulty || 'just-right',
completionRate: workoutFeedback.exerciseFeedback[ex.name]?.completionRate || 100
}))
};
return updated;
});
}}
className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all !rounded-button whitespace-nowrap"
>
Submit Feedback
</button>
</div>
</div>
</div>
)}
{showProgressionModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
<div className="text-center">
<div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
<i className="fas fa-level-up-alt text-3xl text-indigo-600"></i>
</div>
<h3 className="text-2xl font-bold mb-4">Ready to Level Up!</h3>
<p className="text-gray-600 mb-6">
You've consistently performed well in your recent workouts. Would you like to increase the difficulty of your workout plan?
</p>
<div className="space-y-4">
<button
onClick={() => {
// Implement workout progression logic here
setShowProgressionModal(false);
setShowRecoveryPlan(true);
// Show success notification
const notification = document.createElement('div');
notification.className = 'fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg';
notification.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Workout plan updated with increased difficulty!';
document.body.appendChild(notification);
setTimeout(() => notification.remove(), 3000);
}}
className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all !rounded-button whitespace-nowrap"
>
Level Up My Workout
</button>
<button
onClick={() => {
setShowProgressionModal(false);
setShowRecoveryPlan(true);
}}
className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all !rounded-button whitespace-nowrap"
>
Keep Current Level
</button>
</div>
</div>
</div>
</div>
)}
{showRecoveryPlan && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
<div className="flex justify-between items-center mb-6">
<div>
<h3 className="text-2xl font-bold text-gray-800">{recoveryPlan.title}</h3>
<p className="text-gray-600 mt-2">{recoveryPlan.description}</p>
</div>
<button
onClick={() => setShowRecoveryPlan(false)}
className="text-gray-400 hover:text-gray-600"
>
<i className="fas fa-times"></i>
</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
{recoveryPlan.exercises.map((exercise, index) => (
<div key={index} className="bg-gray-50 rounded-xl overflow-hidden">
<img
src={exercise.image}
alt={exercise.name}
className="w-full h-48 object-cover"
/>
<div className="p-6">
<div className="flex justify-between items-center mb-4">
<h4 className="text-xl font-semibold">{exercise.name}</h4>
<span className="text-indigo-600 font-medium">
{Math.floor(exercise.duration / 60)} min
</span>
</div>
<p className="text-gray-600 mb-4">{exercise.instructions}</p>
<button
className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 !rounded-button whitespace-nowrap"
onClick={() => {
// Start guided recovery exercise
setShowRecoveryPlan(false);
// You could implement a timer/guide feature here
}}
>
<i className="fas fa-play"></i>
Start Exercise
</button>
</div>
</div>
))}
</div>
<div className="flex justify-between items-center bg-indigo-50 p-6 rounded-xl">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
<i className="fas fa-heart text-indigo-600 text-xl"></i>
</div>
<div>
<h4 className="font-semibold">Recovery Tips</h4>
<p className="text-gray-600">Stay hydrated and get adequate sleep for optimal recovery</p>
</div>
</div>
<button className="text-indigo-600 hover:text-indigo-700 font-medium !rounded-button whitespace-nowrap">
Learn More
</button>
</div>
<div className="mt-8 flex justify-end">
<button
onClick={() => setShowRecoveryPlan(false)}
className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all !rounded-button whitespace-nowrap"
>
Got It
</button>
</div>
</div>
</div>
)}
{showAchievementNotification && (
<div className="fixed bottom-4 right-4 bg-white rounded-xl shadow-xl p-6 w-96 animate-slide-up border-2 border-indigo-500">
<div className="relative">
<div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
<div className="relative">
<div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
<i className="fas fa-trophy text-4xl text-white animate-pulse"></i>
</div>
<div className="absolute -inset-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full animate-ping opacity-20"></div>
</div>
</div>
<div className="mt-10 text-center">
<div className="flex items-center justify-center mb-2">
<h4 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
Achievement Unlocked!
</h4>
<span className="ml-2 text-2xl animate-bounce">🎉</span>
</div>
<div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-4 transform transition-all hover:scale-105">
<div className="flex items-center justify-center mb-3">
<i className={`fas fa-${achievements.find(a => a.earned && !a.date)?.icon || 'star'} text-2xl text-indigo-600 mr-2`}></i>
<p className="text-xl font-bold text-indigo-700">
{achievements.find(a => a.earned && !a.date)?.name || "Milestone Reached!"}
</p>
</div>
<p className="text-gray-600">
{achievements.find(a => a.earned && !a.date)?.description || "Keep pushing your limits!"}
</p>
</div>
{userStats.currentStreak > 0 && (
<div className="flex items-center justify-center bg-orange-50 rounded-xl p-4 mb-4">
<div className="relative">
<i className="fas fa-fire text-2xl text-orange-500 animate-pulse"></i>
<div className="absolute -inset-1 bg-orange-500 rounded-full animate-ping opacity-20"></div>
</div>
<div className="ml-3">
<span className="font-bold text-orange-600">{userStats.currentStreak} Day Streak!</span>
<p className="text-sm text-orange-500 mt-1">You're on fire! Keep it up!</p>
</div>
</div>
)}
<div className="flex justify-center space-x-3">
<button
onClick={() => setShowAchievementNotification(false)}
className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 !rounded-button whitespace-nowrap"
>
Continue Training
</button>
<button
onClick={() => {
setShowAchievementNotification(false);
// Add navigation to achievements page logic here
}}
className="px-6 py-2.5 bg-white text-indigo-600 border-2 border-indigo-600 rounded-xl hover:bg-indigo-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 !rounded-button whitespace-nowrap"
>
View All Achievements
</button>
</div>
</div>
<button
onClick={() => setShowAchievementNotification(false)}
className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all"
>
<i className="fas fa-times"></i>
</button>
</div>
</div>
)}
{renderStep()}
{showNotification && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
<h3 className="text-2xl font-bold mb-4">Ready to Begin?</h3>
<p className="text-gray-600 mb-6">
Your AI trainer is ready to guide you through your workout. Make sure you're in a comfortable space with your equipment ready.
</p>
<div className="mb-6 bg-gray-50 p-6 rounded-xl">
<h4 className="text-lg font-semibold mb-4">Audio Settings</h4>
<div className="space-y-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<i className="fas fa-volume-up text-gray-600"></i>
<span className="text-gray-700">Master Volume</span>
</div>
<div className="flex items-center gap-2">
<input
type="range"
min="0"
max="100"
value={audioSettings.volume}
onChange={(e) => setAudioSettings(prev => ({ ...prev, volume: parseInt(e.target.value) }))}
className="w-32"
/>
<span className="text-sm text-gray-600 w-8">{audioSettings.volume}%</span>
</div>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<i className="fas fa-clock text-gray-600"></i>
<span className="text-gray-700">Timer Reminders</span>
</div>
<button
onClick={() => setAudioSettings(prev => ({ ...prev, timerReminders: !prev.timerReminders }))}
className={`relative w-12 h-6 rounded-full transition-colors ${audioSettings.timerReminders ? 'bg-indigo-600' : 'bg-gray-300'}`}
>
<div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${audioSettings.timerReminders ? 'right-1' : 'left-1'}`}></div>
</button>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<i className="fas fa-comment-alt text-gray-600"></i>
<span className="text-gray-700">Form Feedback</span>
</div>
<button
onClick={() => setAudioSettings(prev => ({ ...prev, formFeedback: !prev.formFeedback }))}
className={`relative w-12 h-6 rounded-full transition-colors ${audioSettings.formFeedback ? 'bg-indigo-600' : 'bg-gray-300'}`}
>
<div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${audioSettings.formFeedback ? 'right-1' : 'left-1'}`}></div>
</button>
</div>
<button
onClick={() => {
if (!audioSettings.previewPlaying) {
setAudioSettings(prev => ({ ...prev, previewPlaying: true }));
const utterance = new SpeechSynthesisUtterance();
utterance.text = "This is how your AI trainer will sound during the workout.";
utterance.volume = audioSettings.volume / 100;
utterance.onend = () => setAudioSettings(prev => ({ ...prev, previewPlaying: false }));
window.speechSynthesis.speak(utterance);
}
}}
className="w-full mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 !rounded-button whitespace-nowrap"
disabled={audioSettings.previewPlaying}
>
<i className={`fas fa-${audioSettings.previewPlaying ? 'spinner fa-spin' : 'play'}`}></i>
{audioSettings.previewPlaying ? 'Playing Preview...' : 'Preview Voice'}
</button>
</div>
</div>
<div className="flex justify-end space-x-4">
<button
onClick={() => setShowNotification(false)}
className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all !rounded-button cursor-pointer whitespace-nowrap"
>
Cancel
</button>
<button
onClick={() => {
setShowNotification(false);
setCurrentStep(6);
}}
className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all !rounded-button cursor-pointer whitespace-nowrap"
>
Begin Workout
</button>
</div>
</div>
</div>
)}
{isMenuOpen && (
<div className="fixed top-0 right-0 h-screen w-64 bg-white shadow-xl z-50 transform transition-transform">
<div className="p-6">
<div className="flex justify-between items-center mb-8">
<h3 className="text-xl font-semibold">Menu</h3>
<button
onClick={() => setIsMenuOpen(false)}
className="text-gray-600 !rounded-button cursor-pointer"
>
<i className="fas fa-times"></i>
</button>
</div>
<nav className="space-y-4">
<button
onClick={() => {
setCurrentStep(0);
setIsMenuOpen(false);
}}
className={`block w-full text-left px-4 py-2 rounded-lg ${currentStep === 0 ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
>
<i className="fas fa-home mr-2"></i> Home
</button>
<button
onClick={() => {
setCurrentStep(4);
setIsMenuOpen(false);
}}
className={`block w-full text-left px-4 py-2 rounded-lg ${currentStep === 4 ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
>
<i className="fas fa-dumbbell mr-2"></i> Workouts
</button>
<button
onClick={() => {
setShowNotification(true);
setIsMenuOpen(false);
}}
className="block w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
>
<i className="fas fa-chart-line mr-2"></i> Progress
</button>
<button
onClick={() => {
setCurrentStep(1);
setIsMenuOpen(false);
}}
className={`block w-full text-left px-4 py-2 rounded-lg ${currentStep === 1 ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
>
<i className="fas fa-cog mr-2"></i> Settings
</button>
<button
onClick={() => {
setShowNotification(true);
setIsMenuOpen(false);
}}
className="block w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
>
<i className="fas fa-question-circle mr-2"></i> Help
</button>
</nav>
</div>
</div>
)}
</div>
);
};
export default App
