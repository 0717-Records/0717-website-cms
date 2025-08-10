import Link from 'next/link';

export function Footer() {
  return (
    <footer className='bg-gray-50 border-t border-gray-200 mt-12'>
      <div className='container mx-auto p-6'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-gray-600'>
            © {new Date().getFullYear()} Layer Caker. All rights reserved.
          </p>
          <nav className='flex items-center gap-4'>
            <Link
              className='text-sm text-gray-600 hover:text-pink-500 transition-colors'
              href='/posts'>
              Posts
            </Link>
            <Link
              className='text-sm text-gray-600 hover:text-pink-500 transition-colors'
              href='/studio'>
              Studio
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
