import React from 'react';
import type { CTAEmailButtonBlock } from '@/types/blocks';
import type { BlockProps } from '@/types/shared';
import CTAEmailButton from '../UI/CTAEmailButton';

interface CTAEmailButtonProps extends BlockProps<CTAEmailButtonBlock> {
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