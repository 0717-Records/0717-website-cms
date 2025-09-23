import FavouriteGrid from '@/components/Favourites/FavouriteGrid';
import { getAllFavourites, getFavouritesIndexPage } from '@/actions/favourites';
import PageHero from '@/components/Page/PageHero';
import Container from '@/components/Layout/Container';
import Card from '@/components/blocks/Card';
import PageSubtitle from '@/components/Typography/PageSubtitle';
import { getSiteSettings } from '@/actions';
import { generateMetadata as generatePageMetadata, generateCanonicalUrl } from '@/lib/metadata';
import { closingCardSpacing } from '@/utils/spacingConstants';
import { normalizeClosingCardForCard } from '@/utils/closingCardHelpers';

export async function generateMetadata() {
  const [siteSettings, favouritesIndexPage] = await Promise.all([
    getSiteSettings(),
    getFavouritesIndexPage(),
  ]);

  if (!siteSettings) {
    return {
      title: 'Favourites | 07:17 Records',
      description: 'Discover our favourite bands and artists',
    };
  }

  return generatePageMetadata({
    title: favouritesIndexPage?.title || 'Favourites',
    description: favouritesIndexPage?.subtitle || siteSettings.siteDescription || undefined,
    siteSettings,
    canonicalUrl: generateCanonicalUrl('/favourites'),
  });
}

export default async function FavouritesPage() {
  const [allFavourites, favouritesIndexPage] = await Promise.all([
    getAllFavourites(),
    getFavouritesIndexPage(),
  ]);

  return (
    <>
      {/* Page Hero */}
      <PageHero
        title={favouritesIndexPage?.title || 'Our Favourites'}
        heroImage={favouritesIndexPage?.backgroundImage || '/images/hero-bg/hero-bg-option6-2.webp'}
        documentId={favouritesIndexPage?._id}
        documentType={favouritesIndexPage?._type}
        showBreadcrumb={true}
        breadcrumbPageTitle={favouritesIndexPage?.title || 'Our Favourites'}
      />
      <Container textAlign='center'>
        {/* Page Subtitle */}
        {favouritesIndexPage?.subtitle && (
          <PageSubtitle>{favouritesIndexPage.subtitle}</PageSubtitle>
        )}

        {/* Favourites Section */}
        <FavouriteGrid favourites={allFavourites} rowSize='large' showViewAllButton={false} />

        {/* Favourites Message Card - moved to bottom of page */}
        {favouritesIndexPage?.showFavouritesMessage && favouritesIndexPage?.favouritesMessage && (
          <div className={closingCardSpacing}>
            <Card
              {...normalizeClosingCardForCard(favouritesIndexPage.favouritesMessage)}
              documentId={favouritesIndexPage._id}
              documentType={favouritesIndexPage._type}
              fieldPathPrefix='favouritesMessage'
            />
          </div>
        )}
      </Container>
    </>
  );
}
