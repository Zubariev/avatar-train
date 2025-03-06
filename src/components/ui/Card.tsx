
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', gradient = false }) => {
  return (
    <div 
      className={`
        rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl
        ${gradient 
          ? 'bg-gradient-to-br from-indigo-50 to-purple-50' 
          : 'bg-white'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
