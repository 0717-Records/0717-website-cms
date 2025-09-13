import '@/app/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProd = process.env.NEXT_PUBLIC_ENV === 'production';
  return (
    <html lang='en'>
      <head>{!isProd && <meta name='robots' content='noindex, nofollow' />}</head>
      <body>{children}</body>
    </html>
  );
}
