import React from 'react';
import type { POST_QUERYResult } from '@/sanity/types';
import dayjs from 'dayjs';

type PublishedAtProps = {
  publishedAt: NonNullable<POST_QUERYResult>['publishedAt'];
};

const PublishedAt = ({ publishedAt }: PublishedAtProps) => {
  return publishedAt ? (
    <p className='text-base text-slate-700'>{dayjs(publishedAt).format('D MMMM YYYY')}</p>
  ) : null;
};

export default PublishedAt;
