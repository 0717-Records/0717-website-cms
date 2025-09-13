import React from 'react';
import '@/app/globals.css';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isProd = process.env.NEXT_PUBLIC_ENV === 'production';
  return (
    <html lang='en'>
      <head>{!isProd && <meta name='robots' content='noindex, nofollow' />}</head>
      <body className='text-body-base bg-gray-50'>{children}</body>
    </html>
  );
};

export default RootLayout;
