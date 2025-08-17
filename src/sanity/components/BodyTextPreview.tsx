import React from 'react';

/**
 * BodyTextPreview Component for Sanity Studio
 *
 * ⚠️  IMPORTANT: KEEP IN SYNC WITH GLOBALS.CSS ⚠️
 * These style values must match the corresponding @utility definitions in:
 * src/app/globals.css (lines ~95-171)
 *
 * When updating typography styles:
 * 1. Update the @utility definitions in globals.css (for frontend rendering)
 * 2. Update the corresponding values in this file (for Sanity Studio previews)
 *
 * Both files must have identical font-size, line-height, font-weight, and letter-spacing values
 * to ensure consistency between Sanity Studio previews and frontend display.
 */

interface BlockStyleProps {
  children: React.ReactNode;
}

interface BodyTextPreviewProps extends BlockStyleProps {
  value: string;
}

const BodyTextPreview = ({ children, value }: BodyTextPreviewProps) => {
  // ⚠️ These values must match the @utility definitions in src/app/globals.css
  const getStyles = (styleType: string) => {
    switch (styleType) {
      case 'body-3xl':
        return {
          fontSize: '2.0625rem',
          lineHeight: '2.25rem',
          fontWeight: '400',
          letterSpacing: '0',
        };
      case 'body-2xl':
        return {
          fontSize: '1.625rem',
          lineHeight: '2rem',
          fontWeight: '400',
          letterSpacing: '0',
        };
      case 'body-xl':
        return {
          fontSize: '1.375rem',
          lineHeight: '1.75rem',
          fontWeight: '400',
          letterSpacing: '0',
        };
      case 'body-lg':
        return {
          fontSize: '1.25rem',
          lineHeight: '1.75rem',
          fontWeight: '400',
          letterSpacing: '0',
        };
      case 'body-base':
        return {
          fontSize: '1.125rem',
          lineHeight: '1.75rem',
          fontWeight: '400',
          letterSpacing: '0',
        };
      case 'body-sm':
        return {
          fontSize: '0.9375rem',
          lineHeight: '1.25rem',
          fontWeight: '400',
          letterSpacing: '0em',
        };
      case 'body-xs':
        return {
          fontSize: '0.8125rem',
          lineHeight: '1rem',
          fontWeight: '400',
          letterSpacing: '0em',
        };
      default:
        return {};
    }
  };

  return <div style={getStyles(value)}>{children}</div>;
};

export default BodyTextPreview;
export type { BlockStyleProps };
