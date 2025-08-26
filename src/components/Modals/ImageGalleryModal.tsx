'use client';

import React, { useState } from 'react';
import { stegaClean } from 'next-sanity';
import NextImage from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { ImageGalleryBlock } from '@/types/blocks';
import Heading from '../Typography/Heading/Heading';
import Modal from '../UI/Modal';

interface ImageGalleryModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const ImageGalleryModal = ({ isModalOpen, closeModal }: ImageGalleryModalProps) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      aria-labelledby='image-modal-title'
      aria-describedby='image-modal-description'>
      <div>
        <Heading level='h2' id='gallery-modal-title' className='sr-only'>
          Image gallery viewer
        </Heading>
        <div id='gallery-modal-description' className='sr-only'></div>
        <div className='text-pink-400 text-5xl'>THE GALLERY!</div>
      </div>
    </Modal>
  );
};

export default ImageGalleryModal;
