import { List } from '@prismic-types';
import { postGutterBottom } from '@styles/spacing';
import React, { ReactNode } from 'react';
import tw from 'twin.macro';

const listStyle = [postGutterBottom, tw`pl-10 space-y-1`];
const ul = [listStyle, tw`list-disc`];
const ol = [listStyle, tw`list-decimal`];

type Props = {
  data: List;
  children: ReactNode;
  className?: string;
};

function ListSerializer({ data, children, className }: Props) {
  switch (data.type) {
    case 'group-o-list-item':
      return (
        <ol css={ol} className={className}>
          {children}
        </ol>
      );

    default:
      return (
        <ul css={ul} className={className}>
          {children}
        </ul>
      );
  }
}

export default ListSerializer;
