import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'white' | 'black';
}

export default function Loader({ size = 'medium', color = 'primary' }: LoaderProps) {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  const colorClasses = {
    primary: 'border-blue-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    black: 'border-black border-t-transparent',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
      />
    </div>
  );
}
