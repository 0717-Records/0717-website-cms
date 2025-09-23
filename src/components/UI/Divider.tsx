import React from 'react';

interface DividerProps {
  className?: string;
  isSmall?: boolean;
  alignment?: 'left' | 'center' | 'right';
  useFixedWidth?: boolean; // Use fixed-width lines instead of full-width extending lines
}

const getJustifyClass = (alignment: 'left' | 'center' | 'right'): string => {
  switch (alignment) {
    case 'left':
      return 'justify-start';
    case 'right':
      return 'justify-end';
    default:
      return 'justify-center';
  }
};

const Divider = ({ className = '', isSmall = false, alignment = 'center', useFixedWidth = false }: DividerProps) => {

  // For left/right alignment
  if (alignment === 'left' || alignment === 'right') {
    const dotsOnLeft = alignment === 'left';

    if (useFixedWidth) {
      // Fixed-width design for pagebuilder usage - matches center alignment outer line lengths
      if (isSmall) {
        return (
          <div className={`flex items-center ${getJustifyClass(alignment)} ${className}`.trim()}>
            <div className='flex items-center space-x-2'>
              {dotsOnLeft ? (
                <>
                  {/* Left side: dot, line, dot */}
                  <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
                  <div className='w-4 h-0.5 bg-brand-gradient'></div>
                  <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
                  {/* Fixed width line - same as center alignment outer lines */}
                  <div className='w-8 h-0.5 bg-brand-gradient'></div>
                </>
              ) : (
                <>
                  {/* Fixed width line - same as center alignment outer lines */}
                  <div className='w-8 h-0.5 bg-brand-gradient'></div>
                  {/* Right side: dot, line, dot */}
                  <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
                  <div className='w-4 h-0.5 bg-brand-gradient'></div>
                  <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
                </>
              )}
            </div>
          </div>
        );
      }

      return (
        <div className={`flex items-center ${getJustifyClass(alignment)} ${className}`.trim()}>
          <div className='flex items-center space-x-4'>
            {dotsOnLeft ? (
              <>
                {/* Left side: dot, line, dot */}
                <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
                <div className='w-8 md:w-12 h-0.5 bg-brand-gradient'></div>
                <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
                {/* Fixed width line - same as center alignment outer lines */}
                <div className='w-16 md:w-24 h-0.5 bg-brand-gradient'></div>
              </>
            ) : (
              <>
                {/* Fixed width line - same as center alignment outer lines */}
                <div className='w-16 md:w-24 h-0.5 bg-brand-gradient'></div>
                {/* Right side: dot, line, dot */}
                <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
                <div className='w-8 md:w-12 h-0.5 bg-brand-gradient'></div>
                <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
              </>
            )}
          </div>
        </div>
      );
    }

    // Full-width design for standalone usage
    if (isSmall) {
      return (
        <div className={`flex items-center w-full ${className}`.trim()}>
          {dotsOnLeft ? (
            <>
              {/* Left side: dot, line, dot */}
              <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
              <div className='w-4 h-0.5 bg-brand-gradient mx-2'></div>
              <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
              {/* Full width line */}
              <div className='flex-1 h-0.5 bg-brand-gradient ml-2'></div>
            </>
          ) : (
            <>
              {/* Full width line */}
              <div className='flex-1 h-0.5 bg-brand-gradient mr-2'></div>
              {/* Right side: dot, line, dot */}
              <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
              <div className='w-4 h-0.5 bg-brand-gradient mx-2'></div>
              <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
            </>
          )}
        </div>
      );
    }

    return (
      <div className={`flex items-center w-full ${className}`.trim()}>
        {dotsOnLeft ? (
          <>
            {/* Left side: dot, line, dot */}
            <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
            <div className='w-8 md:w-12 h-0.5 bg-brand-gradient mx-4'></div>
            <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
            {/* Full width line */}
            <div className='flex-1 h-0.5 bg-brand-gradient ml-4'></div>
          </>
        ) : (
          <>
            {/* Full width line */}
            <div className='flex-1 h-0.5 bg-brand-gradient mr-4'></div>
            {/* Right side: dot, line, dot */}
            <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
            <div className='w-8 md:w-12 h-0.5 bg-brand-gradient mx-4'></div>
            <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
          </>
        )}
      </div>
    );
  }

  // Center alignment: fixed width (original) or full width with center element
  if (useFixedWidth) {
    // Original fixed-width design for pagebuilder usage
    if (isSmall) {
      return (
        <div className={`flex items-center ${getJustifyClass(alignment)} ${className}`.trim()}>
          <div className='flex items-center space-x-2'>
            {/* Left line */}
            <div className='w-8 h-0.5 bg-brand-gradient'></div>
            {/* Left dot */}
            <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
            {/* Center line */}
            <div className='w-4 h-0.5 bg-brand-gradient'></div>
            {/* Right dot */}
            <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
            {/* Right line */}
            <div className='w-8 h-0.5 bg-brand-gradient'></div>
          </div>
        </div>
      );
    }

    return (
      <div className={`flex items-center ${getJustifyClass(alignment)} ${className}`.trim()}>
        <div className='flex items-center space-x-4'>
          {/* Left line */}
          <div className='w-16 md:w-24 h-0.5 bg-brand-gradient'></div>
          {/* Left dot */}
          <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
          {/* Center line */}
          <div className='w-8 md:w-12 h-0.5 bg-brand-gradient'></div>
          {/* Right dot */}
          <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
          {/* Right line */}
          <div className='w-16 md:w-24 h-0.5 bg-brand-gradient'></div>
        </div>
      </div>
    );
  }

  // Full width design for standalone usage
  if (isSmall) {
    return (
      <div className={`flex items-center w-full ${className}`.trim()}>
        {/* Left line - full width */}
        <div className='flex-1 h-0.5 bg-brand-gradient mr-2'></div>
        {/* Center element: dot, line, dot */}
        <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
        <div className='w-4 h-0.5 bg-brand-gradient mx-2'></div>
        <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
        {/* Right line - full width */}
        <div className='flex-1 h-0.5 bg-brand-gradient ml-2'></div>
      </div>
    );
  }

  return (
    <div className={`flex items-center w-full ${className}`.trim()}>
      {/* Left line - full width */}
      <div className='flex-1 h-0.5 bg-brand-gradient mr-4'></div>
      {/* Center element: dot, line, dot */}
      <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
      <div className='w-8 md:w-12 h-0.5 bg-brand-gradient mx-4'></div>
      <div className='w-2 h-2 rounded-full bg-brand-primary'></div>
      {/* Right line - full width */}
      <div className='flex-1 h-0.5 bg-brand-gradient ml-4'></div>
    </div>
  );
};

export default Divider;
