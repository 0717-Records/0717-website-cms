import BlogList from '@/components/Blog/BlogList';
import { getAllBlogPosts, getBlogIndexPage } from '@/actions/blog';
import PageHero from '@/components/Page/PageHero';
import Container from '@/components/Layout/Container';
import Card from '@/components/blocks/Card';

export default async function BlogPage() {
  const [blogPosts, blogIndexPage] = await Promise.all([getAllBlogPosts(), getBlogIndexPage()]);

  return (
    <>
      {/* Page Hero */}
      <PageHero
        title={blogIndexPage?.title || 'Blog'}
        heroImage={blogIndexPage?.heroImage}
        documentId={blogIndexPage?._id}
        documentType={blogIndexPage?._type}
      />
      <Container textAlign='left'>
        {/* Page Subtitle */}
        {blogIndexPage?.subtitle && (
          <div className='container mx-auto px-4 md:px-8 py-8'>
            <p className='text-body-3xl text-text-subtle max-w-3xl mx-auto whitespace-pre-line text-center'>
              {blogIndexPage.subtitle}
            </p>
          </div>
        )}

        {/* List of Blog Posts */}
        <div className={`${!blogIndexPage?.subtitle ? 'pt-16 md:pt-24' : ''} pb-16 md:pb-24`}>
          <BlogList
            posts={blogPosts}
            noPostsText={
              blogIndexPage?.noArticlesMessage ||
              'No articles available at the moment. Check back soon!'
            }
          />
        </div>

        {/* Closing Card */}
        {blogIndexPage?.hasClosingCard && blogIndexPage?.closingCard && (
          <div className='pb-16 md:pb-24'>
            <Card
              {...blogIndexPage.closingCard}
              documentId={blogIndexPage._id}
              documentType={blogIndexPage._type}
            />
          </div>
        )}
      </Container>
    </>
  );
}
