'use client';

import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import React, { useEffect, useRef, useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openModal = () => {
    console.log('openModal called');
    // Clear any existing timeout
    if (timeoutRef.current) {
      console.log('Clearing existing timeout');
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
    setShouldRender(true);
  };
  
  const closeModal = () => {
    console.log('closeModal called');
    setIsOpen(false);
    // Set shouldRender to false after fade out completes
    timeoutRef.current = setTimeout(() => {
      console.log('Setting shouldRender to false after fadeout');
      setShouldRender(false);
      timeoutRef.current = null;
    }, 300);
  };

  const Modal = ({ children }: { children: React.ReactNode }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useBodyScrollLock(shouldRender);

    // Handle opening when isOpen changes
    useEffect(() => {
      console.log('Open effect - isOpen:', isOpen, 'dialog exists:', !!dialogRef.current, 'dialog.open:', dialogRef.current?.open);
      if (isOpen && dialogRef.current) {
        // Reset isVisible to false before opening
        setIsVisible(false);
        if (!dialogRef.current.open) {
          console.log('Opening modal and starting fade in');
          dialogRef.current.showModal();
        }
        // Small delay to ensure dialog is rendered, then start fade in
        setTimeout(() => {
          console.log('Setting isVisible to true for fade in');
          setIsVisible(true);
        }, 10);
      }
    }, [isOpen]);

    // Handle closing when closeModal is called
    useEffect(() => {
      console.log('Close effect - isOpen:', isOpen, 'isVisible:', isVisible);
      if (!isOpen && isVisible) {
        console.log('Starting fade out - setting isVisible to false');
        setIsVisible(false);
        // Wait for fade out animation to complete before actually closing
        setTimeout(() => {
          console.log('Closing dialog after fade out');
          dialogRef.current?.close();
        }, 300); // Match the CSS transition duration
      }
    }, [isOpen]);

    // Escape key handling
    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const handleCancel = (e: Event) => {
        // Prevent default so ESC doesn't just close without cleanup
        e.preventDefault();
        closeModal();
      };

      dialog.addEventListener('cancel', handleCancel);
      return () => dialog.removeEventListener('cancel', handleCancel);
    }, [closeModal]);

    console.log('Render - shouldRender:', shouldRender, 'isOpen:', isOpen, 'isVisible:', isVisible, 'opacity class:', isVisible ? 'opacity-100' : 'opacity-0');
    
    return shouldRender ? (
      <dialog
        ref={dialogRef}
        aria-labelledby='image-modal-title'
        aria-describedby='image-modal-description'
        className={`backdrop:bg-black/80 flex-col items-center justify-center w-screen h-screen bg-transparent overflow-hidden hidden open:flex p-0 m-0 max-w-none max-h-none transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={(e) => {
          // Close if clicking the dialog itself (backdrop), not its content
          if (e.target === e.currentTarget) {
            closeModal();
          }
        }}>
        {/* Close button */}
        <button
          onClick={closeModal}
          className='cursor-pointer absolute top-4 right-4 z-50 p-2 bg-black/70 hover:bg-white rounded-full transition-colors group'
          aria-label='Close modal'>
          <svg
            className='w-6 h-6 text-white group-hover:text-black transition-colors'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={3}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
        {children}
      </dialog>
    ) : null;
  };

  return { isOpen, openModal, closeModal, Modal };
};

export default useModal;
