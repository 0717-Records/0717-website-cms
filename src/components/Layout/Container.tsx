import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  textAlign?: 'left' | 'center' | 'right';
}

const Container = ({ children, textAlign = 'center' }: ContainerProps) => {
  return (
    <div className={`container mx-auto px-4 mb-20 md:mb-32 sm:px-12 mt-12 text-${textAlign}`}>
      {children}
    </div>
  );
};

export default Container;
