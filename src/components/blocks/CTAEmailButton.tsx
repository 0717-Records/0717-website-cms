import React from 'react';
import type { CTAEmailButtonBlock } from '@/types/blocks';
import type { BlockProps } from '@/types/shared';
import CTAEmailButton from '../UI/CTAEmailButton';

const CTAEmailButtonComponent = ({
  className = '',
}: BlockProps<CTAEmailButtonBlock>) => {
  return (
    <div className={className}>
      <CTAEmailButton />
    </div>
  );
};

export default CTAEmailButtonComponent;