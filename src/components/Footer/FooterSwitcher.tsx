'use client';

import React, { useState, useEffect } from 'react';
import Footer_1 from './Footer_1';
import Footer_2 from './Footer_2';
import Footer_3 from './Footer_3';
import Footer_4 from './Footer_4';

import type {
  FOOTER_QUERYResult,
  SITE_SETTINGS_QUERYResult,
  COMPANY_LINKS_QUERYResult,
} from '@/sanity/types';

const footerVariations = [
  { id: 1, name: 'Black Footer', component: Footer_1 },
  { id: 2, name: 'White Footer', component: Footer_2 },
  { id: 3, name: 'Gradient Yellow', component: Footer_3 },
  { id: 4, name: 'Dark Gradient', component: Footer_4 },
];

interface FooterSwitcherProps {
  footerData: FOOTER_QUERYResult | null;
  siteSettingsData: SITE_SETTINGS_QUERYResult | null;
  companyLinksData: COMPANY_LINKS_QUERYResult | null;
}

const headerVariations = [
  { id: 'white', name: 'White Header' },
  { id: 'black', name: 'Black Header' },
  { id: 'yellow', name: 'Gradient Yellow' },
  { id: 'darkGradient', name: 'Dark Gradient' },
];

const FooterSwitcher: React.FC<FooterSwitcherProps> = ({
  footerData,
  siteSettingsData,
  companyLinksData,
}) => {
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
      // Reset all header styles first
      header.style.background = '';
      header.style.backgroundColor = '';
      header.style.color = '';

      // Get white logo element (for reuse across cases)
      const whiteLogo = document.querySelector('#white-logo') as HTMLImageElement;

      switch (selectedHeaderVariation) {
        case 'black':
          // Apply black header styles
          header.style.backgroundColor = '#000000';
          header.style.color = '#ffffff';

          // Create white logo if it doesn't exist
          let whiteLogoElement = whiteLogo;
          if (!whiteLogoElement) {
            whiteLogoElement = document.createElement('img');
            whiteLogoElement.id = 'white-logo';
            whiteLogoElement.src = '/images/logo-text-white.png';
            whiteLogoElement.alt = '07:17 Records Logo';
            whiteLogoElement.className = logo.className;

            // Position it exactly over the original logo
            whiteLogoElement.style.position = 'absolute';
            whiteLogoElement.style.top = '0';
            whiteLogoElement.style.left = '0';
            whiteLogoElement.style.width = logo.style.width || getComputedStyle(logo).width;
            whiteLogoElement.style.height = logo.style.height || getComputedStyle(logo).height;
            whiteLogoElement.style.zIndex = '10';
            whiteLogoElement.style.objectFit = 'contain';

            // Make parent relative if it isn't already
            if (logo.parentElement) {
              const parentStyle = getComputedStyle(logo.parentElement);
              if (parentStyle.position === 'static') {
                logo.parentElement.style.position = 'relative';
              }
              logo.parentElement.appendChild(whiteLogoElement);
            }
          }

          // Hide black logo, show white logo
          logo.style.opacity = '0';
          whiteLogoElement.style.opacity = '1';

          // Update menu button spans to white
          const blackHeaderSpans = menuButton.querySelectorAll('span');
          blackHeaderSpans.forEach((span) => {
            (span as HTMLElement).style.backgroundColor = '#ffffff';
          });
          break;

        case 'white':
          // Apply white header styles (default)
          header.style.backgroundColor = '#ffffff';
          header.style.color = '';

          // Show black logo, hide white logo
          logo.style.opacity = '1';
          if (whiteLogo) {
            whiteLogo.style.opacity = '0';
          }

          // Update menu button spans to black (reset)
          const whiteHeaderSpans = menuButton.querySelectorAll('span');
          whiteHeaderSpans.forEach((span) => {
            (span as HTMLElement).style.backgroundColor = '';
          });
          break;

        case 'yellow':
          // Apply yellow gradient header styles
          header.style.background =
            'linear-gradient(135deg, #fffacc 0%, #fffef0 25%, #ffffff 50%, #fffef0 75%, #fffacc 100%)';
          header.style.color = '';

          // Show black logo, hide white logo
          logo.style.opacity = '1';
          if (whiteLogo) {
            whiteLogo.style.opacity = '0';
          }

          // Update menu button spans to black (reset)
          const yellowHeaderSpans = menuButton.querySelectorAll('span');
          yellowHeaderSpans.forEach((span) => {
            (span as HTMLElement).style.backgroundColor = '';
          });
          break;

        case 'darkGradient':
          // Apply dark gradient header styles (same as Footer_4)
          header.style.background =
            'linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #3a3a3a 50%, #1a1a1a 75%, #000000 100%)';
          header.style.color = '#ffffff';

          // Create white logo if it doesn't exist
          let darkGradientWhiteLogoElement = whiteLogo;
          if (!darkGradientWhiteLogoElement) {
            darkGradientWhiteLogoElement = document.createElement('img');
            darkGradientWhiteLogoElement.id = 'white-logo';
            darkGradientWhiteLogoElement.src = '/images/logo-text-white.png';
            darkGradientWhiteLogoElement.alt = '07:17 Records Logo';
            darkGradientWhiteLogoElement.className = logo.className;

            // Position it exactly over the original logo
            darkGradientWhiteLogoElement.style.position = 'absolute';
            darkGradientWhiteLogoElement.style.top = '0';
            darkGradientWhiteLogoElement.style.left = '0';
            darkGradientWhiteLogoElement.style.width =
              logo.style.width || getComputedStyle(logo).width;
            darkGradientWhiteLogoElement.style.height =
              logo.style.height || getComputedStyle(logo).height;
            darkGradientWhiteLogoElement.style.zIndex = '10';
            darkGradientWhiteLogoElement.style.objectFit = 'contain';

            // Make parent relative if it isn't already
            if (logo.parentElement) {
              const parentStyle = getComputedStyle(logo.parentElement);
              if (parentStyle.position === 'static') {
                logo.parentElement.style.position = 'relative';
              }
              logo.parentElement.appendChild(darkGradientWhiteLogoElement);
            }
          }

          // Hide black logo, show white logo
          logo.style.opacity = '0';
          darkGradientWhiteLogoElement.style.opacity = '1';

          // Update menu button spans to white
          const darkGradientHeaderSpans = menuButton.querySelectorAll('span');
          darkGradientHeaderSpans.forEach((span) => {
            (span as HTMLElement).style.backgroundColor = '#ffffff';
          });
          break;

        default:
          // Fallback to white header
          header.style.backgroundColor = '#ffffff';
          header.style.color = '';
          logo.style.opacity = '1';
          if (whiteLogo) {
            whiteLogo.style.opacity = '0';
          }
          const defaultSpans = menuButton.querySelectorAll('span');
          defaultSpans.forEach((span) => {
            (span as HTMLElement).style.backgroundColor = '';
          });
          break;
      }
    }

    // Cleanup: Reset header styles when component unmounts
    return () => {
      if (header && logo && menuButton) {
        header.style.backgroundColor = '';
        header.style.background = '';
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
  const SelectedFooterComponent =
    footerVariations.find((variation) => variation.id === selectedFooterVariation)?.component ||
    Footer_1;

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
