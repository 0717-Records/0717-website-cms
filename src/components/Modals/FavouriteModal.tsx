'use client';

import React from 'react';
import NextImage from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { HeartIcon } from '@sanity/icons';
import CTA from '../UI/CTA';
import type { FAVOURITES_ALL_QUERYResult } from '@/sanity/types';
import Modal from '../UI/Modal';
import { FaExternalLinkAlt } from 'react-icons/fa';

type FavouriteData = FAVOURITES_ALL_QUERYResult[0];

interface FavouriteModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  favourite: FavouriteData;
}

const FavouriteModal: React.FC<FavouriteModalProps> = ({ isModalOpen, closeModal, favourite }) => {
  const imageUrl = favourite.profileImage?.asset
    ? urlFor(favourite.profileImage.asset).width(400).height(400).quality(90).url()
    : null;

  const linkLabel = favourite.linkLabel || 'More Info';

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      aria-labelledby='favourite-modal-title'
      aria-describedby='favourite-modal-description'>
      <div className='w-[90vw] max-w-[400px] md:max-w-[500px] bg-white rounded-lg overflow-hidden'>
        <div className='p-6 md:p-8 space-y-4'>
          {/* Profile Image */}
          <div className='flex justify-center'>
            <div className='relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gradient-to-br from-brand-secondary to-brand-primary'>
              {imageUrl ? (
                <NextImage
                  src={imageUrl}
                  alt={favourite.profileImage?.alt || `${favourite.name} profile image`}
                  fill
                  sizes='160px'
                  className='object-cover'
                  priority
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center'>
                  <HeartIcon className='text-white text-body-4xl' />
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <div className='text-center'>
            <h2 id='favourite-modal-title' className='text-h4 font-bold text-gray-900'>
              {favourite.name}
            </h2>
          </div>

          {/* Genre */}
          {favourite.genre && (
            <div className='text-center'>
              <p className='text-body-base font-medium text-brand-secondary'>{favourite.genre}</p>
            </div>
          )}

          {/* Description */}
          {favourite.description && (
            <div id='favourite-modal-description' className='text-center'>
              <p className='text-body-base text-gray-700 leading-relaxed'>
                {favourite.description}
              </p>
            </div>
          )}

          {/* CTA Button */}
          {favourite.link && (
            <div className='flex justify-center pt-2'>
              <CTA href={favourite.link} variant='filled' target='_blank' rel='noopener noreferrer'>
                {linkLabel}
                <FaExternalLinkAlt className='ml-2' />
              </CTA>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FavouriteModal;
