'use client';

import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import React, { useEffect, useRef, useState } from 'react';

interface ModalProps {
  children: React.ReactNode;
  modalContent: React.ReactNode;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  modalContent,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useBodyScrollLock(isOpen || shouldRender);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else if (shouldRender) {
      // Start fade out animation
      setIsVisible(false);
      // Close dialog and stop rendering after animation completes
      setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match transition duration
    }
  }, [isOpen, shouldRender]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (shouldRender && isOpen) {
      dialog.showModal();
      // Small delay to ensure the dialog is rendered before starting animation
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [shouldRender, isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setIsOpen(false);
    };

    const handleCancel = (event: Event) => {
      event.preventDefault();
    };

    const handleClick = (event: MouseEvent) => {
      if (event.target === dialog) {
        // Clicked on backdrop
        setIsOpen(false);
      }
    };

    dialog.addEventListener('close', handleClose);
    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('click', handleClick);

    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('click', handleClick);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{children}</button>
      {isOpen && (
        <dialog
          ref={dialogRef}
          className={`fixed inset-0 z-50 flex items-center justify-center backdrop:bg-black/90 backdrop:transition-opacity bg-transparent border-none p-0 max-w-none max-h-none w-full h-full transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}>
          <button
            onClick={() => setIsOpen(false)}
            className='fixed top-4 right-4 z-50 p-2 hover:bg-black/50 rounded-full transition-colors cursor-pointer'
            aria-label='Close modal'>
            <svg
              className='w-6 h-6 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
          <div
            className={`relative transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {modalContent}
          </div>
        </dialog>
      )}
    </>
  );
};

export default Modal;
