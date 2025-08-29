import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className='container mx-auto px-4 sm:px-12 mt-12'>{children}</div>;
};

export default Container;
