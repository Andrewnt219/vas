import { separator } from '@styles/apply';
import { isLastElement } from '@utils/validate-utils';
import React, { Children, ReactNode } from 'react';

type Props = { className?: string; children: ReactNode[] };

function WithSeparator({ className, children }: Props) {
  return (
    <div className={className} tw="flex items-center  space-x-1">
      {Children.map(children, (child, index) => {
        return (
          <>
            {child}
            {!isLastElement(children, index) && <span css={separator} />}
          </>
        );
      })}
    </div>
  );
}

export default WithSeparator;
