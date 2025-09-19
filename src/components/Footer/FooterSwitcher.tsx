'use client';

import React, { useState, useEffect } from 'react';
import Footer_1 from './Footer_1';
import Footer_2 from './Footer_2';
import Footer_3 from './Footer_3';
import type {
  FOOTER_QUERYResult,
  SITE_SETTINGS_QUERYResult,
  COMPANY_LINKS_QUERYResult,
} from '@/sanity/types';

const footerVariations = [
  { id: 1, name: 'Dark Mode', component: Footer_1 },
  { id: 2, name: 'Light Mode', component: Footer_2 },
  { id: 3, name: 'Gradient Blue', component: Footer_3 },
];

interface FooterSwitcherProps {
  footerData: FOOTER_QUERYResult | null;
  siteSettingsData: SITE_SETTINGS_QUERYResult | null;
  companyLinksData: COMPANY_LINKS_QUERYResult | null;
}

const headerVariations = [
  { id: 'white', name: 'White Header' },
  { id: 'black', name: 'Black Header' },
];

const FooterSwitcher: React.FC<FooterSwitcherProps> = ({ footerData, siteSettingsData, companyLinksData }) => {
  const [selectedFooterVariation, setSelectedFooterVariation] = useState(1);
  const [selectedHeaderVariation, setSelectedHeaderVariation] = useState('white');

  // Apply header styles based on selected variation
  useEffect(() => {
    const header = document.querySelector('header');
    const logo = document.querySelector('header a img') as HTMLImageElement; // More specific selector for logo
    const menuButton = document.querySelector(
      'header button[aria-controls="mobile-navigation-menu"]'
    );

    if (header && logo && menuButton) {
      if (selectedHeaderVariation === 'black') {
        // Apply black header styles
        header.style.backgroundColor = '#000000';
        header.style.color = '#ffffff';

        // Hide black logo and show white logo using CSS

        // Create white logo if it doesn't exist
        let whiteLogo = document.querySelector('#white-logo') as HTMLImageElement;
        if (!whiteLogo) {
          whiteLogo = document.createElement('img');
          whiteLogo.id = 'white-logo';
          whiteLogo.src = '/images/logo-text-white.png';
          whiteLogo.alt = '07:17 Records Logo';
          whiteLogo.className = logo.className; // Copy same classes

          // Position it exactly over the original logo
          whiteLogo.style.position = 'absolute';
          whiteLogo.style.top = '0';
          whiteLogo.style.left = '0';
          whiteLogo.style.width = logo.style.width || getComputedStyle(logo).width;
          whiteLogo.style.height = logo.style.height || getComputedStyle(logo).height;
          whiteLogo.style.zIndex = '10';
          whiteLogo.style.objectFit = 'contain';

          // Make parent relative if it isn't already
          if (logo.parentElement) {
            const parentStyle = getComputedStyle(logo.parentElement);
            if (parentStyle.position === 'static') {
              logo.parentElement.style.position = 'relative';
            }
            logo.parentElement.appendChild(whiteLogo);
          }
        }

        // Hide black logo, show white logo
        logo.style.opacity = '0';
        whiteLogo.style.opacity = '1';

        // Update menu button (hamburger) spans to white
        const menuButtonSpans = menuButton.querySelectorAll('span');
        menuButtonSpans.forEach((span) => {
          (span as HTMLElement).style.backgroundColor = '#ffffff';
        });
      } else {
        // Apply white header styles (default)
        header.style.backgroundColor = '#ffffff';
        header.style.color = '';

        // Show black logo, hide white logo
        const whiteLogo = document.querySelector('#white-logo') as HTMLImageElement;

        // Show black logo, hide white logo
        logo.style.opacity = '1';
        if (whiteLogo) {
          whiteLogo.style.opacity = '0';
        }

        // Update menu button (hamburger) spans to black (reset)
        const menuButtonSpans = menuButton.querySelectorAll('span');
        menuButtonSpans.forEach((span) => {
          (span as HTMLElement).style.backgroundColor = '';
        });
      }
    }

    // Cleanup: Reset header styles when component unmounts
    return () => {
      if (header && logo && menuButton) {
        header.style.backgroundColor = '';
        header.style.color = '';
        logo.style.opacity = '1';

        // Remove white logo if it exists
        const whiteLogo = document.querySelector('#white-logo');
        if (whiteLogo) {
          whiteLogo.remove();
        }

        const menuButtonSpans = menuButton.querySelectorAll('span');
        menuButtonSpans.forEach((span) => {
          (span as HTMLElement).style.backgroundColor = '';
        });
      }
    };
  }, [selectedHeaderVariation]);

  // Get the selected footer component
  const SelectedFooterComponent = footerVariations.find(
    (variation) => variation.id === selectedFooterVariation
  )?.component || Footer_1;

  return (
    <div>
      {/* Switcher Controls */}
      <div className='py-6 px-6 md:px-16'>
        <div className='container mx-auto'>
          <div className='text-center mb-6'>
            <h3 className='text-body-lg font-semibold text-gray-900 mb-2'>
              Header & Footer Design Variations (Temporary - For Review)
            </h3>
            <p className='text-body-sm text-gray-600'>
              Select variations to preview different header and footer designs
            </p>
          </div>

          {/* Header Variations */}
          <div className='mb-6'>
            <h4 className='text-body-base font-semibold text-gray-800 mb-3 text-center'>
              Header Variations
            </h4>
            <div className='flex flex-wrap justify-center gap-3'>
              {headerVariations.map((variation) => (
                <button
                  key={variation.id}
                  onClick={() => setSelectedHeaderVariation(variation.id)}
                  className={`px-4 py-2 rounded-lg text-body-sm font-medium transition-all ${
                    selectedHeaderVariation === variation.id
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-brand-primary hover:text-brand-primary'
                  }`}>
                  {variation.name}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Variations */}
          <div>
            <h4 className='text-body-base font-semibold text-gray-800 mb-3 text-center'>
              Footer Variations
            </h4>
            <div className='flex flex-wrap justify-center gap-3'>
              {footerVariations.map((variation) => (
                <button
                  key={variation.id}
                  onClick={() => setSelectedFooterVariation(variation.id)}
                  className={`px-4 py-2 rounded-lg text-body-sm font-medium transition-all ${
                    selectedFooterVariation === variation.id
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-brand-primary hover:text-brand-primary'
                  }`}>
                  {variation.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Render Selected Footer Component */}
      <SelectedFooterComponent
        footerData={footerData}
        siteSettingsData={siteSettingsData}
        companyLinksData={companyLinksData}
      />
    </div>
  );
};

export default FooterSwitcher;
