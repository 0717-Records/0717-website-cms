import { PostCard } from '@/components/PostCard';
import { Title } from '@/components/Title';
import { getAllPosts } from '@/actions';

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <div className='container mx-auto grid grid-cols-1 gap-6 p-12'>
      <Title>Post Index</Title>
      <div className='flex flex-col gap-24 py-12'>
        {posts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
}
