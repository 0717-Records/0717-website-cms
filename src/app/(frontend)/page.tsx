import PageBuilder from '@/components/PageBuilder';
import { getHomePage } from '@/actions';
import Link from 'next/link';

export default async function Page() {
  const page = await getHomePage();

  return page?.content ? (
    <PageBuilder content={page.content} documentId={page._id} documentType={page._type} />
  ) : (
    <div className='section-padding'>
      <div className='container-max'>
        <div className='text-center space-y-8'>
          <h1 className='text-4xl font-bold text-gradient'>Welcome to 0717 Records</h1>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Your content management system is ready. Create your first page content in the Sanity
            Studio.
          </p>
          <div className='card-base max-w-md mx-auto'>
            <h2 className='text-xl font-semibold text-foreground mb-4'>Get Started</h2>
            <p className='text-muted-foreground mb-6'>
              Visit the studio to create your home page content and start building your site.
            </p>
            <Link href='/studio' className='btn-primary'>
              Open Studio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
