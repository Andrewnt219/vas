import { separator } from '@styles/apply';
import { isLastElement } from '@utils/validate-utils';
import React, { Children, ReactElement } from 'react';

type Props = { className?: string; children: ReactElement[] };

function WithSeparator({ className, children }: Props) {
  return (
    <div className={className} tw="flex items-center  space-x-1">
      {Children.map(children, (child, index) => {
        return (
          <>
            {React.cloneElement(child)}
            {!isLastElement(children, index) && <span css={separator} />}
          </>
        );
      })}
    </div>
  );
}

export default WithSeparator;
