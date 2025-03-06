
import React from 'react';
import Card from './ui/card';
import ProgressBar from './ui/ProgressBar';

interface StatCardProps {
  title: string;
  value: number;
  max: number;
  icon: React.ReactNode;
  color?: 'indigo' | 'purple' | 'green' | 'amber';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  max,
  icon,
  color = 'indigo'
}) => {
  const colorClasses = {
    indigo: 'text-indigo-600',
    purple: 'text-purple-600',
    green: 'text-green-600',
    amber: 'text-amber-600',
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <div className={`${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
      
      <div className="flex items-baseline mb-2">
        <span className="text-2xl font-bold text-gray-800">{value}</span>
        <span className="text-gray-500 ml-1">/{max}</span>
      </div>
      
      <ProgressBar 
        value={value} 
        max={max} 
        color={color} 
        showValue={false}
      />
    </Card>
  );
};

export default StatCard;
