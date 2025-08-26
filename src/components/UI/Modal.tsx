'use client';

import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  modalContent: React.ReactNode;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  // For now, just render the children (the image) without modal functionality
  return <>{children}</>;
};

export default Modal;
