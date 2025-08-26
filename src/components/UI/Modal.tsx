'use client';

import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import React, { useEffect, useRef, useState } from 'react';

interface ModalProps {
  children: React.ReactNode;
  modalContent: React.ReactNode;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

const Modal: React.FC<ModalProps> = ({ children, modalContent }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useBodyScrollLock(isOpen);

  // Open the dialog programmatically
  const openDialog = () => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
      setIsOpen(true);
      // Small delay to ensure dialog is rendered, then start fade in
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    }
  };

  // Close handler with fade out
  const closeDialog = () => {
    setIsVisible(false);
    // Wait for fade out animation to complete before actually closing
    setTimeout(() => {
      dialogRef.current?.close();
      setIsOpen(false);
    }, 300); // Match the CSS transition duration
  };

  // Escape key handling
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      // Prevent default so ESC doesn’t just close without cleanup
      e.preventDefault();
      closeDialog();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, []);

  return (
    <>
      <button onClick={openDialog} className='cursor-pointer'>
        {children}
      </button>
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
            closeDialog();
          }
        }}>
        {/* Close button */}
        <button
          onClick={closeDialog}
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
        {modalContent}
      </dialog>
    </>
  );
};

export default Modal;
