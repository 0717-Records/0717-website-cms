import React from 'react';
import Image from 'next/image';

const ImgPlaceHolder = () => {
  return (
    <Image
      src={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='%23ddd'/><g stroke='%23999' stroke-width='3' fill='none'><rect x='100' y='80' width='400' height='240' rx='8' ry='8'/><line x1='120' y1='280' x2='240' y2='160'/><line x1='240' y1='160' x2='360' y2='280'/><circle cx='380' cy='160' r='24'/></g></svg>`}
      alt='No image available'
      width={600}
      height={400}
      className='mx-auto rounded-lg'
      unoptimized
      priority
    />
  );
};

export default ImgPlaceHolder;
