import React from 'react';
import type { PropsWithChildren } from 'react';

const Title = ({ children }: PropsWithChildren) => {
  return (
    <h1 className='text-h6 md:text-h4 lg:text-h2 font-semibold text-slate-800 text-pretty max-w-3xl'>
      {children}
    </h1>
  );
};

export default Title;
