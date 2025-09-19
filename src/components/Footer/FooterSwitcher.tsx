'use client';

import React, { useState, useEffect } from 'react';
import {
  FooterVariation1,
  FooterVariation2,
  FooterVariation3,
  FooterVariation4,
  FooterVariation5,
} from './FooterVariations';

const footerVariations = [
  { id: 1, name: 'Black Enhanced', component: FooterVariation1 },
  { id: 2, name: 'Light Transparent', component: FooterVariation2 },
  { id: 3, name: 'Gradient Design', component: FooterVariation3 },
  { id: 4, name: 'Minimal Clean', component: FooterVariation4 },
  { id: 5, name: 'Card-based', component: FooterVariation5 },
];

const FooterSwitcher: React.FC = () => {
  const [selectedVariation, setSelectedVariation] = useState(1);

  // Hide the original footer from the layout when this component mounts
  useEffect(() => {
    const footer = document.querySelector('body > div > footer[aria-label="Site Footer"]');
    if (footer) {
      (footer as HTMLElement).style.display = 'none';
    }

    // Cleanup: Show the footer again when component unmounts
    return () => {
      if (footer) {
        (footer as HTMLElement).style.display = '';
      }
    };
  }, []);

  const SelectedFooterComponent = footerVariations.find(
    (variation) => variation.id === selectedVariation
  )?.component || FooterVariation1;

  return (
    <div>
      {/* Switcher Controls */}
      <div className='bg-gray-100 border-t border-gray-200 py-6 px-6 md:px-16'>
        <div className='container mx-auto'>
          <div className='text-center mb-4'>
            <h3 className='text-body-lg font-semibold text-gray-900 mb-2'>
              Footer Design Variations (Temporary - For Review)
            </h3>
            <p className='text-body-sm text-gray-600'>
              Select a footer variation to preview different designs
            </p>
          </div>

          <div className='flex flex-wrap justify-center gap-3'>
            {footerVariations.map((variation) => (
              <button
                key={variation.id}
                onClick={() => setSelectedVariation(variation.id)}
                className={`px-4 py-2 rounded-lg text-body-sm font-medium transition-all ${
                  selectedVariation === variation.id
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-brand-primary hover:text-brand-primary'
                }`}>
                Variation {variation.id}: {variation.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Footer */}
      <SelectedFooterComponent />
    </div>
  );
};

export default FooterSwitcher;