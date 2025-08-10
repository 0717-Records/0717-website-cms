import PageBuilder from '@/components/PageBuilder';
import { getPageBySlug } from '@/actions';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  return page?.content ? (
    <PageBuilder content={page.content} documentId={page._id} documentType={page._type} />
  ) : null;
}
