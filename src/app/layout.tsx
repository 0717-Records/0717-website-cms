import React from 'react';
import '@/app/globals.css';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <body className='text-body-base'>{children}</body>
    </html>
  );
};

export default RootLayout;
