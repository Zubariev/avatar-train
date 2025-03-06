
import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  color?: 'indigo' | 'purple' | 'green' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
  animate?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  color = 'indigo',
  size = 'md',
  showValue = true,
  className = '',
  animate = true,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const colorClasses = {
    indigo: 'bg-indigo-600',
    purple: 'bg-purple-600',
    green: 'bg-green-600',
    amber: 'bg-amber-500',
  };
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showValue && (
            <span className="text-sm font-medium text-gray-700">{value}/{max}</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full ${
            animate ? 'transition-all duration-500 ease-out' : ''
          }`}
          style={{ width: `${percentage}%` }}
        >
          {size === 'lg' && showValue && (
            <span className="sr-only">{percentage}% Complete</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
