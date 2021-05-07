import { List } from '@prismic-types';
import { postGutterBottom } from '@styles/spacing';
import React, { ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
  data: List;
  children: ReactNode;
};

function PostList({ data, children }: Props) {
  return (
    <StyledList
      css={postGutterBottom}
      as={data.type === 'group-o-list-item' ? 'ol' : 'ul'}
    >
      {children}
    </StyledList>
  );
}

type StyledListProps = {};
const StyledList = styled.ul<StyledListProps>`
  ${tw`pl-10 space-y-1`}
`;

export default PostList;
