'use client';

import React from 'react';
import NextImage from 'next/image';
import Modal from '@/components/UI/Modal';
import Heading from '../Typography/Heading/Heading';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt: string;
  caption?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageAlt,
  caption,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-[95vw] h-[95svh] max-w-[95vw] max-h-[95svh]"
      aria-labelledby="image-modal-title"
      aria-describedby="image-modal-description">
      <div className="flex flex-col items-center justify-center h-full max-h-[95svh] overflow-hidden">
        <Heading level='h2' id="image-modal-title" className="sr-only">
          Full-screen image view
        </Heading>
        <div id="image-modal-description" className="sr-only">
          {imageAlt}
        </div>
        
        {/* Main image */}
        <div className="relative flex items-center justify-center flex-1">
          <NextImage
            src={imageUrl}
            alt={imageAlt}
            width={1200}
            height={900}
            className="max-w-[90vw] max-h-[80svh] w-auto h-auto object-contain"
            priority
          />
        </div>
        
        {/* Caption */}
        {caption && (
          <div className="flex-shrink-0 w-full mt-4 pb-4">
            <p className="text-white text-center max-w-2xl px-4 mx-auto text-body-sm">
              {caption}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ImageModal;