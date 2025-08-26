'use client';

import React, { useEffect, useRef } from 'react';

interface ModalProps {
  children: React.ReactNode;
  modalContent: React.ReactNode;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

const Modal: React.FC<ModalProps> = ({ children, modalContent }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open the dialog programmatically
  const openDialog = () => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  };

  // Close handler
  const closeDialog = () => {
    dialogRef.current?.close();
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
        className='backdrop:bg-black/70 flex-col items-center justify-center w-screen h-screen bg-transparent overflow-hidden hidden open:flex p-0 m-0 max-w-none max-h-none'
        onClick={(e) => {
          // Close if clicking the dialog itself (backdrop), not its content
          if (e.target === e.currentTarget) {
            closeDialog();
          }
        }}>
        {modalContent}
      </dialog>
    </>
  );
};

export default Modal;
