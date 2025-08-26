'use client';

import React, { useState } from 'react';
import { stegaClean } from 'next-sanity';
import NextImage from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { ImageGalleryBlock } from '@/types/blocks';
import Heading from '../Typography/Heading/Heading';

interface ImageGalleryModalProps {
  images: ImageGalleryBlock['images'];
  firstImageIndex: number;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({ images, firstImageIndex }) => {
  return (
    <div>
      <Heading level='h2' id='gallery-modal-title' className='sr-only'>
        Image gallery viewer
      </Heading>
      <div id='gallery-modal-description' className='sr-only'></div>
      <div className='text-pink-400 text-5xl'>THE GALLERY!</div>
    </div>
  );
};

export default ImageGalleryModal;
