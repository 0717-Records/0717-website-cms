import React from 'react';

const TypographyShowcase = () => {
  return (
    <div className='p-8 space-y-12 max-w-4xl mx-auto'>
      <div className='space-y-4'>
        <h2 className='text-h2 text-brand-primary'>Typography System Showcase</h2>
        <p className='text-body-lg text-gray-600'>
          Complete responsive typography utilities with font-size, line-height, letter-spacing, and
          font-weight
        </p>
      </div>

      {/* Heading Examples */}
      <div className='space-y-6'>
        <h3 className='text-h3'>Responsive Heading Styles</h3>
        <p className='text-body-base text-gray-600'>
          All headings automatically scale from mobile to desktop sizes
        </p>
        <div className='space-y-4'>
          <h1 className='text-h1'>H1 - Main Display Heading (2.5rem → 3.5rem)</h1>
          <h2 className='text-h2'>H2 - Section Title (2rem → 2.75rem)</h2>
          <h3 className='text-h3'>H3 - Subsection Heading (1.75rem → 2.25rem)</h3>
          <h4 className='text-h4'>H4 - Minor Heading (1.5rem → 1.875rem)</h4>
          <h5 className='text-h5'>H5 - Small Heading (1.25rem → 1.5rem)</h5>
          <h6 className='text-h6'>H6 - Caption Heading (1.125rem → 1.25rem)</h6>
        </div>
      </div>

      {/* Body Text Examples */}
      <div className='space-y-6'>
        <h3 className='text-h3'>Responsive Body Text Styles</h3>
        <p className='text-body-base text-gray-600'>
          Body text utilities with consistent mobile-to-desktop scaling
        </p>
        <div className='space-y-4'>
          <p className='text-body-3xl'>Body 3XL - Hero text (1.5rem → 1.875rem)</p>
          <p className='text-body-2xl'>Body 2XL - Featured content (1.25rem → 1.5rem)</p>
          <p className='text-body-xl'>Body XL - Standout paragraphs (1.125rem → 1.25rem)</p>
          <p className='text-body-lg'>Body Large - Emphasized text (1rem → 1.125rem)</p>
          <p className='text-body-base'>
            Body Base - Standard paragraph text (0.875rem → 1rem). This is the default reading size
            that provides optimal readability across all devices with automatic responsive scaling.
          </p>
          <p className='text-body-sm'>Body Small - Secondary information (0.75rem → 0.875rem)</p>
          <p className='text-body-xs'>Body XS - Fine print and footnotes (0.625rem → 0.75rem)</p>
        </div>
      </div>

      {/* Real-world Example */}
      <div className='space-y-6'>
        <h3 className='text-h3'>Real-world Article Example</h3>
        <article className='space-y-6'>
          <h1 className='text-h1'>The Future of Responsive Typography</h1>
          <p className='text-body-lg text-gray-600'>
            How modern CSS and design systems create seamless reading experiences across all devices
          </p>

          <p className='text-body-base'>
            Typography is the art and technique of arranging type to make written language legible,
            readable, and appealing when displayed. The arrangement involves selecting typefaces,
            point sizes, line lengths, line-spacing, and letter-spacing.
          </p>

          <h2 className='text-h2'>Responsive Design Principles</h2>
          <p className='text-body-base'>
            Good typography should automatically adapt to different screen sizes while maintaining
            optimal readability. Each utility includes carefully crafted responsive breakpoints that
            scale typography appropriately from mobile to desktop.
          </p>

          <h3 className='text-h3'>Mobile-First Approach</h3>
          <p className='text-body-base'>
            Our typography system starts with mobile-optimized sizes and scales up for larger
            screens, ensuring excellent readability on all devices without requiring separate
            classes for different screen sizes.
          </p>

          <blockquote className='text-body-xl italic text-gray-700 border-l-4 border-brand-primary pl-6'>
            &ldquo;Typography is the craft of endowing human language with a durable visual
            form.&rdquo;
          </blockquote>

          <p className='text-body-sm text-gray-500'>
            Note: All typography utilities include responsive scaling, complete with font-size,
            line-height, letter-spacing, and font-weight properties.
          </p>
        </article>
      </div>

      {/* Usage Examples */}
      <div className='space-y-6'>
        <h3 className='text-h3'>Available Typography Utilities</h3>
        <div className='bg-gray-50 p-6 rounded-lg space-y-4'>
          <h4 className='text-h4'>Complete Utility Reference:</h4>
          <div className='text-body-sm space-y-3 font-mono bg-white p-4 rounded border'>
            <div>
              <strong className='text-h6 font-mono'>Headings (with responsive scaling):</strong>
              <p>text-h1, text-h2, text-h3, text-h4, text-h5, text-h6</p>
            </div>
            <div>
              <strong className='text-h6 font-mono'>Body Text (with responsive scaling):</strong>
              <p>
                text-body-xs, text-body-sm, text-body-base, text-body-lg, text-body-xl,
                text-body-2xl, text-body-3xl
              </p>
            </div>
            <div className='text-body-xs text-gray-600'>
              All utilities automatically scale from mobile to desktop at 768px breakpoint
            </div>
          </div>
        </div>
      </div>

      {/* Size Comparison */}
      <div className='space-y-6'>
        <h3 className='text-h3'>Size Comparison</h3>
        <div className='space-y-2'>
          <div className='text-h1'>H1</div>
          <div className='text-h2'>H2</div>
          <div className='text-h3'>H3</div>
          <div className='text-h4'>H4</div>
          <div className='text-h5'>H5</div>
          <div className='text-h6'>H6</div>
          <div className='text-body-3xl'>Body 3XL</div>
          <div className='text-body-2xl'>Body 2XL</div>
          <div className='text-body-xl'>Body XL</div>
          <div className='text-body-lg'>Body LG</div>
          <div className='text-body-base'>Body Base</div>
          <div className='text-body-sm'>Body SM</div>
          <div className='text-body-xs'>Body XS</div>
        </div>
      </div>
    </div>
  );
};

export default TypographyShowcase;
