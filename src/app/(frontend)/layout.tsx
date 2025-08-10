import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { SanityLive } from '@/sanity/lib/live';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisableDraftMode from '@/components/DisableDraftMode';

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-white min-h-screen flex flex-col'>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
    </div>
  );
}
