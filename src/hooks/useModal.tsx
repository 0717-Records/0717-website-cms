'use client';

import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import React, { use, useEffect, useRef, useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openModal = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
    // setShouldRender(true);
  };

  const closeModal = () => {
    setIsClosing(true);

    // timeoutRef.current = setTimeout(() => {
    //   // setShouldRender(false);
    //   // setIsOpen(false);
    //   timeoutRef.current = null;
    // }, 300);
  };

  const Modal = ({ children }: { children: React.ReactNode }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // useBodyScrollLock(shouldRender);

    useEffect(() => {
      if (isOpen && dialogRef.current && !dialogRef.current.open) {
        dialogRef.current.showModal();
        setIsVisible(true);
      }
    }, [isOpen]);

    useEffect(() => {
      if (isClosing) {
        setIsVisible(false);
        // setTimeout(() => {
        //   setIsClosing(false);
        //   dialogRef.current?.close();
        //   setIsOpen(false);
        // }, 300);
      }
    }, [isClosing]);

    // useEffect(() => {
    //   if (isOpen && dialogRef.current) {
    //     setIsVisible(false);
    //     if (!dialogRef.current.open) {
    //       dialogRef.current.showModal();
    //     }
    //     setTimeout(() => {
    //       setIsVisible(true);
    //     }, 10);
    //   }
    // }, [isOpen]);

    // useEffect(() => {
    //   if (!isOpen && isVisible) {
    //     setIsVisible(false);
    //     setTimeout(() => {
    //       dialogRef.current?.close();
    //     }, 300);
    //   }
    // }, [isOpen]);

    // Handle the ESCAPE button press
    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const handleCancel = (e: Event) => {
        e.preventDefault();
        closeModal();
      };
      dialog.addEventListener('cancel', handleCancel);
      return () => dialog.removeEventListener('cancel', handleCancel);
    }, []);

    return isOpen ? (
      <dialog
        ref={dialogRef}
        aria-labelledby='image-modal-title'
        aria-describedby='image-modal-description'
        className={`backdrop:bg-black/80 flex-col items-center justify-center w-screen h-screen bg-transparent overflow-hidden hidden open:flex p-0 m-0 max-w-none max-h-none transition-opacity duration-500 ${
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
