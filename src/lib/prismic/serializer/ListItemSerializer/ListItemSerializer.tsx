import { ListItem } from '@prismic-types';
import React, { ReactNode } from 'react';
import tw, { css } from 'twin.macro';

const listStyle = css`
  ::marker {
    ${tw`text-skin-muted`}
  }
`;
type Props = { data: ListItem; className?: string; children: ReactNode };

function ListItemSerializer({ className, children }: Props) {
  return (
    <li className={className} css={listStyle}>
      {children}
    </li>
  );
}

export default ListItemSerializer;
