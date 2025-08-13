import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = '' }: SectionProps) => {
  return (
    <section className={`py-16 md:py-24 ${className}`.trim()}>
      <div className='container mx-auto px-4'>{children}</div>
    </section>
  );
};

export default Section;
