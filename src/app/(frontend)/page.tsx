import PageBuilder from '@/components/PageBuilder';
import { getHomePage } from '@/actions';

export default async function Page() {
  const page = await getHomePage();

  return page?.homePage?.content ? (
    <PageBuilder
      content={page?.homePage.content}
      documentId={page?.homePage._id}
      documentType={page?.homePage._type}
    />
  ) : null;
}
