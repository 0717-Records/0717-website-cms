import React from 'react';
import type { CTAEmailButtonBlock } from '@/types/blocks';
import CTAEmailButton from '../UI/CTAEmailButton';

interface CTAEmailButtonProps extends Omit<CTAEmailButtonBlock, '_type' | '_key'> {
  className?: string;
  email?: string;
}

const CTAEmailButtonComponent = ({
  className = '',
  email = 'noemailexists@noemail.com',
}: CTAEmailButtonProps) => {
  return (
    <div className={className}>
      <CTAEmailButton email={email} />
    </div>
  );
};

export default CTAEmailButtonComponent;