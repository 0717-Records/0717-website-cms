import React from 'react';
import Image from 'next/image';

const ImgPlaceHolder = () => {
  return (
    <Image
      src={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'><rect width='100%' height='100%' fill='%23ddd'/><g stroke='%23777' stroke-width='2' fill='none'><rect x='50' y='40' width='200' height='120' rx='4' ry='4'/><line x1='60' y1='140' x2='120' y2='80'/><line x1='120' y1='80' x2='180' y2='140'/><circle cx='190' cy='80' r='12'/></g></svg>`}
      alt='No image available'
      width={300}
      height={200}
      className='mx-auto rounded-lg'
      unoptimized
      priority
    />
  );
};

export default ImgPlaceHolder;
