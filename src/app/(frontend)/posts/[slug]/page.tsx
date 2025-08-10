import { Post } from '@/componets/Post';
import { getPostBySlug } from '@/actions';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className='container mx-auto grid grid-cols-1 gap-6 p-12'>
      <Post {...post} />
    </div>
  );
}
