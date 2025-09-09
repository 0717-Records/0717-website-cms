import React from 'react';

interface ErrorGraphicProps {
  className?: string;
}

const ErrorGraphic: React.FC<ErrorGraphicProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`max-w-full h-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="System error"
    >
      {/* Gradients */}
      <defs>
        <linearGradient id="exclamationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffea00" />
          <stop offset="100%" stopColor="#f4a300" />
        </linearGradient>
        <linearGradient id="errorShadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="warningGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffea00" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f4a300" stopOpacity="0.1" />
        </radialGradient>
      </defs>
      
      {/* Warning glow effect */}
      <circle 
        cx="100" 
        cy="100" 
        r="110" 
        fill="url(#warningGlow)"
      />
      
      {/* Shadow/depth effect */}
      <polygon 
        points="102,30 172,160 32,160" 
        fill="url(#errorShadowGradient)"
      />
      
      {/* Main triangle background */}
      <polygon 
        points="100,25 170,155 30,155" 
        fill="url(#exclamationGradient)"
        stroke="#000000"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      
      {/* Exclamation mark */}
      <g transform="translate(100, 100)">
        {/* Exclamation mark line */}
        <rect
          x="-4"
          y="-45"
          width="8"
          height="50"
          rx="4"
          fill="#000000"
        />
        
        {/* Exclamation mark dot */}
        <circle
          cx="0"
          cy="25"
          r="6"
          fill="#000000"
        />
      </g>
      
      {/* Decorative warning elements */}
      <g opacity="0.4">
        {/* Small warning triangles */}
        <polygon points="45,45 55,60 35,60" fill="#f4a300" opacity="0.6" />
        <polygon points="155,50 165,65 145,65" fill="#ffea00" opacity="0.5" />
        <polygon points="40,135 48,148 32,148" fill="#f4a300" opacity="0.4" />
        <polygon points="165,140 173,153 157,153" fill="#ffea00" opacity="0.6" />
      </g>
    </svg>
  );
};

export default ErrorGraphic;