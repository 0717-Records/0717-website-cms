import PageBuilder from '@/components/PageBuilder';
import { getHomePage } from '@/actions';

export default async function Page() {
  const page = await getHomePage();

  return page?.content ? (
    <PageBuilder content={page.content} documentId={page._id} documentType={page._type} />
  ) : (
    <></>
  );
}
