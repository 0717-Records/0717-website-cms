import BlogList from '@/components/Blog/BlogList';
import { getAllBlogPosts, getBlogIndexPage } from '@/actions/blog';
import PageHero from '@/components/Page/PageHero';
import Container from '@/components/Layout/Container';
import Card from '@/components/blocks/Card';
import PageSubtitle from '@/components/Typography/PageSubtitle';
import { closingCardSpacing } from '@/utils/spacingConstants';
import { getSiteSettings } from '@/actions';
import { generateMetadata as generatePageMetadata, generateCanonicalUrl } from '@/lib/metadata';

export async function generateMetadata() {
  const [siteSettings, blogIndexPage] = await Promise.all([
    getSiteSettings(),
    getBlogIndexPage(),
  ]);

  if (!siteSettings) {
    return {
      title: 'Blog | 07:17 Records',
      description: 'Read our latest articles and insights',
    };
  }

  return generatePageMetadata({
    title: blogIndexPage?.title || 'Blog',
    description: blogIndexPage?.subtitle || siteSettings.siteDescription || undefined,
    siteSettings,
    canonicalUrl: generateCanonicalUrl('/blog'),
  });
}

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
        showBreadcrumb={true}
        breadcrumbPageTitle={blogIndexPage?.title || 'Blog'}
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
