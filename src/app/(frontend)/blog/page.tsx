import BlogList from '@/components/Blog/BlogList';
import { getAllBlogPosts, getBlogIndexPage } from '@/actions/blog';
import PageHero from '@/components/Page/PageHero';
import Container from '@/components/Layout/Container';
import Card from '@/components/blocks/Card';
import PageSubtitle from '@/components/Typography/PageSubtitle';
import { closingCardSpacing } from '@/utils/spacingConstants';

export default async function BlogPage() {
  const [blogPosts, blogIndexPage] = await Promise.all([getAllBlogPosts(), getBlogIndexPage()]);

  return (
    <>
      {/* Page Hero */}
      <PageHero
        title={blogIndexPage?.title || 'Blog'}
        heroImage={blogIndexPage?.heroImage || '/images/hero-bg/hero-bg-option7-2.webp'}
        documentId={blogIndexPage?._id}
        documentType={blogIndexPage?._type}
      />
      <Container>
        {/* Page Subtitle */}
        {blogIndexPage?.subtitle && <PageSubtitle>{blogIndexPage.subtitle}</PageSubtitle>}

        {/* List of Blog Posts */}
        <div className={`${!blogIndexPage?.subtitle ? 'pt-16 md:pt-24' : ''}`}>
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
          <div className={closingCardSpacing}>
            <Card
              {...blogIndexPage.closingCard}
              documentId={blogIndexPage._id}
              documentType={blogIndexPage._type}
              fieldPathPrefix='closingCard'
            />
          </div>
        )}
      </Container>
    </>
  );
}
