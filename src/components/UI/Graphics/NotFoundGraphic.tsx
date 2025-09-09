import React from 'react';

interface NotFoundGraphicProps {
  className?: string;
}

const NotFoundGraphic: React.FC<NotFoundGraphicProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`max-w-full h-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Unknown location"
    >
      {/* Outer circle with gradient */}
      <defs>
        <linearGradient id="questionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffea00" />
          <stop offset="100%" stopColor="#f4a300" />
        </linearGradient>
        <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      {/* Shadow/depth effect */}
      <circle 
        cx="102" 
        cy="102" 
        r="90" 
        fill="url(#shadowGradient)"
      />
      
      {/* Main circle background */}
      <circle 
        cx="100" 
        cy="100" 
        r="90" 
        fill="url(#questionGradient)"
        stroke="#000000"
        strokeWidth="3"
      />
      
      {/* Question mark */}
      <g transform="translate(100, 100)">
        {/* Question mark curve */}
        <path
          d="M -25 -35 
             C -25 -50, -10 -55, 5 -55
             C 20 -55, 35 -40, 35 -25
             C 35 -10, 20 -5, 5 5
             L 5 15"
          stroke="#000000"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Question mark dot */}
        <circle
          cx="5"
          cy="35"
          r="6"
          fill="#000000"
        />
      </g>
      
      {/* Decorative elements around the circle */}
      <g opacity="0.6">
        {/* Small question marks floating around */}
        <text x="40" y="40" fill="#f4a300" className="text-body-lg font-bold opacity-50">?</text>
        <text x="150" y="50" fill="#ffea00" className="text-body-sm font-bold opacity-40">?</text>
        <text x="30" y="170" fill="#f4a300" className="text-body-base font-bold opacity-30">?</text>
        <text x="170" y="160" fill="#ffea00" className="text-body-lg font-bold opacity-50">?</text>
      </g>
    </svg>
  );
};

export default NotFoundGraphic;