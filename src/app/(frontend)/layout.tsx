import { Header } from '@/componets/Header';
import { SanityLive } from '@/sanity/lib/live';

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='bg-white min-h-screen'>
      <Header />
      {children}
      <SanityLive />
    </section>
  );
}
