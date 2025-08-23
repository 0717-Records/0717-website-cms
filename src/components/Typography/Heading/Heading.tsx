import React from 'react';
import styles from './Heading.module.css';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps {
  level: HeadingLevel;
  children: React.ReactNode;
  className?: string;
  showUnderline?: boolean;
  showMargin?: boolean;
}

const Heading = ({
  level,
  children,
  className = '',
  showUnderline = false,
  showMargin = true,
}: HeadingProps) => {
  // Get the text utility class for the heading level
  const getTextClass = (level: HeadingLevel) => {
    const textClasses = {
      h1: 'text-h1',
      h2: 'text-h2',
      h3: 'text-h3',
      h4: 'text-h4',
      h5: 'text-h5',
      h6: 'text-h6',
    };
    return textClasses[level];
  };

  // Get the underline class for the heading level
  const getUnderlineClass = (level: HeadingLevel, show: boolean) => {
    if (!show) return '';

    const underlineClasses = {
      h1: styles.underlineH1,
      h2: styles.underlineH2,
      h3: styles.underlineH3,
      h4: styles.underlineH4,
      h5: styles.underlineH5,
      h6: styles.underlineH6,
    };
    return underlineClasses[level];
  };

  const textClass = getTextClass(level);
  const underlineClass = getUnderlineClass(level, showUnderline);
  const marginClass = showMargin ? 'mb-4' : '';
  const combinedClassName = `${textClass} ${underlineClass} ${marginClass} ${className}`.trim();

  const HeadingTag = level;

  return <HeadingTag className={combinedClassName}>{children}</HeadingTag>;
};

export default Heading;
