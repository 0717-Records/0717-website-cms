'use client';

import React, { useState, useEffect } from 'react';

const footerVariations = [
  { id: 1, name: 'Dark Mode' },
  { id: 2, name: 'Light Mode' },
  { id: 3, name: 'Gradient Blue' },
  { id: 4, name: 'Purple Theme' },
  { id: 5, name: 'Green Theme' },
];

const headerVariations = [
  { id: 'white', name: 'White Header' },
  { id: 'black', name: 'Black Header' },
];

const FooterSwitcher: React.FC = () => {
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

  // Apply footer styles based on selected variation
  useEffect(() => {
    const footer = document.querySelector('footer[aria-label="Site Footer"]') as HTMLElement;

    if (footer) {
      // Reset all previous styles
      footer.style.background = '';
      footer.style.color = '';

      // Apply variation-specific styles
      switch (selectedFooterVariation) {
        case 1: // Dark Mode (original style)
          footer.style.background = '#000000';
          footer.style.color = '#ffffff';
          // Don't apply any custom styles - keep original styling
          resetFooterElementStyles();
          break;

        case 2: // Light Mode
          footer.style.background = '#ffffff';
          footer.style.color = '#1F2937';
          applyFooterElementStyles({
            backgroundColor: '#ffffff',
            textColor: '#1F2937',
            accentColor: '#ffea00',
            separatorColor: '#E5E7EB',
            socialIconBg: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            linkHoverColor: '#3B82F6',
          });
          break;

        case 3: // Gradient Blue
          footer.style.background =
            'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #1E40AF 100%)';
          footer.style.color = '#ffffff';
          applyFooterElementStyles({
            backgroundColor: 'transparent',
            textColor: '#ffffff',
            accentColor: '#FDE047',
            separatorColor: 'rgba(255, 255, 255, 0.3)',
            socialIconBg: 'linear-gradient(135deg, #FDE047 0%, #FACC15 100%)',
            linkHoverColor: '#FDE047',
          });
          break;

        case 4: // Purple Theme
          footer.style.background =
            'linear-gradient(135deg, #581C87 0%, #7C3AED 50%, #6B21A8 100%)';
          footer.style.color = '#ffffff';
          applyFooterElementStyles({
            backgroundColor: 'transparent',
            textColor: '#ffffff',
            accentColor: '#F472B6',
            separatorColor: 'rgba(255, 255, 255, 0.3)',
            socialIconBg: 'linear-gradient(135deg, #F472B6 0%, #EC4899 100%)',
            linkHoverColor: '#F472B6',
          });
          break;

        case 5: // Green Theme
          footer.style.background =
            'linear-gradient(135deg, #064E3B 0%, #059669 50%, #047857 100%)';
          footer.style.color = '#ffffff';
          applyFooterElementStyles({
            backgroundColor: 'transparent',
            textColor: '#ffffff',
            accentColor: '#FCD34D',
            separatorColor: 'rgba(255, 255, 255, 0.3)',
            socialIconBg: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)',
            linkHoverColor: '#FCD34D',
          });
          break;
      }
    }

    // Cleanup: Reset footer styles when component unmounts
    return () => {
      if (footer) {
        footer.style.background = '';
        footer.style.color = '';
        resetFooterElementStyles();
      }
    };
  }, [selectedFooterVariation]);

  // Helper function to apply styles to footer elements
  const applyFooterElementStyles = (colors: {
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    separatorColor: string;
    socialIconBg: string;
    linkHoverColor: string;
  }) => {
    // Update text colors
    const messageTexts = document.querySelectorAll('.footer-message-text');
    const copyright = document.querySelector('.footer-copyright');
    const quickLinksTitle = document.querySelector('.footer-quick-links-title');

    messageTexts.forEach((el) => ((el as HTMLElement).style.color = colors.textColor));
    if (copyright) (copyright as HTMLElement).style.color = colors.textColor;
    if (quickLinksTitle) (quickLinksTitle as HTMLElement).style.color = colors.textColor;

    // Update accent colors (message titles)
    const messageTitles = document.querySelectorAll('.footer-message-title');
    messageTitles.forEach((el) => ((el as HTMLElement).style.color = colors.accentColor));

    // Update separator
    const separator = document.querySelector('.footer-separator');
    if (separator) (separator as HTMLElement).style.backgroundColor = colors.separatorColor;

    // Update social icons background
    const socialIcons = document.querySelectorAll('.footer-social-icon');
    socialIcons.forEach((el) => ((el as HTMLElement).style.background = colors.socialIconBg));

    // Update quick links and legal links hover colors
    const quickLinks = document.querySelectorAll('.footer-quick-link');
    const legalLinks = document.querySelectorAll('.footer-legal-link');

    quickLinks.forEach((el) => {
      (el as HTMLElement).style.color = colors.textColor;
      el.addEventListener(
        'mouseenter',
        () => ((el as HTMLElement).style.color = colors.linkHoverColor)
      );
      el.addEventListener('mouseleave', () => ((el as HTMLElement).style.color = colors.textColor));
    });

    legalLinks.forEach((el) => {
      (el as HTMLElement).style.color = colors.textColor;
      el.addEventListener(
        'mouseenter',
        () => ((el as HTMLElement).style.color = colors.linkHoverColor)
      );
      el.addEventListener('mouseleave', () => ((el as HTMLElement).style.color = colors.textColor));
    });
  };

  // Helper function to reset footer element styles
  const resetFooterElementStyles = () => {
    const elements = document.querySelectorAll(
      '.footer-message-text, .footer-copyright, .footer-quick-links-title, ' +
        '.footer-message-title, .footer-separator, .footer-social-icon, ' +
        '.footer-quick-link, .footer-legal-link'
    );
    elements.forEach((el) => {
      (el as HTMLElement).style.color = '';
      (el as HTMLElement).style.backgroundColor = '';
      (el as HTMLElement).style.background = '';
    });
  };

  return (
    <div>
      {/* Switcher Controls */}
      <div className='bg-gray-100 border-t border-gray-200 py-6 px-6 md:px-16'>
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
                  Variation {variation.id}: {variation.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSwitcher;
