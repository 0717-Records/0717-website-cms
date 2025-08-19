import React from 'react';
import CTACalloutLink from './CTACalloutLink';

// Example usage of CTACalloutLink component
const CTACalloutLinkExamples = () => {
  return (
    <div className="space-y-6 p-8">
      <h2 className="text-2xl font-bold mb-6">CTACalloutLink Examples</h2>
      
      {/* Full example with all fields */}
      <CTACalloutLink
        heading="Complete Example"
        text="This is a complete example with heading, text, and image. Click to navigate to our about page."
        image={{
          src: "/placeholder-avatar.jpg",
          alt: "Example image",
          width: 64,
          height: 64
        }}
        href="/about"
      />

      {/* External link example */}
      <CTACalloutLink
        heading="External Link"
        text="This links to an external website. Notice the different icon indicating it opens in a new tab."
        image={{
          src: "/placeholder-avatar.jpg",
          alt: "External link",
        }}
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
      />

      {/* Text only example */}
      <CTACalloutLink
        text="This is a minimal example with just text content and no heading or image. It still works perfectly and maintains the card styling."
        href="/contact"
      />

      {/* No heading example */}
      <CTACalloutLink
        text="This example has an image but no heading. The layout adapts nicely to this configuration."
        image={{
          src: "/placeholder-avatar.jpg",
          alt: "No heading example",
        }}
        href="/services"
      />

      {/* Multi-line text example */}
      <CTACalloutLink
        heading="Multi-line Text"
        text={`This example demonstrates how line breaks work in the text field.

You can add multiple paragraphs and they will be displayed properly with the whitespace-pre-line class.

Perfect for longer descriptions!`}
        href="/blog"
      />
    </div>
  );
};

export default CTACalloutLinkExamples;