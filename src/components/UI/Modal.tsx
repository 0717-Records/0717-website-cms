'use client';

import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  showCloseButton = true,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose();
    };

    const handleCancel = (event: Event) => {
      if (!closeOnEscape) {
        event.preventDefault();
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (closeOnOverlayClick && event.target === dialog) {
        // Clicked on backdrop
        onClose();
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
  }, [onClose, closeOnEscape, closeOnOverlayClick]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className='fixed inset-0 z-50 flex items-center justify-center backdrop:bg-black/90 backdrop:transition-opacity bg-transparent border-none p-0 max-w-none max-h-none w-full h-full'
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}>
      {showCloseButton && (
        <button
          onClick={onClose}
          className='fixed top-4 right-4 z-50 p-2 hover:bg-black/50 rounded-full transition-colors cursor-pointer'
          aria-label='Close modal'>
          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      )}
      <div className={`relative ${className}`}>{children}</div>
    </dialog>
  );
};

export default Modal;
