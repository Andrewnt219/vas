import { SliceComponentProps } from '@prismic-slices';
import React, { ReactElement } from 'react';
import tw, { styled } from 'twin.macro';

type SliceProps = {
  slice_type: 'breaker';
  slice_label: null;
  items: unknown[];
  primary: {};
};
type Props = SliceComponentProps<SliceProps>;

// TODO Breaker is not centered on mobile
function PostBreaker(_: Props): ReactElement {
  return <Container />;
}

type ContainerProps = {};
const Container = styled.hr<ContainerProps>`
  border: none;
  ${tw`my-4 md:my-7`}
  ${tw`flex justify-center items-center`}
	height: auto; // need for before

  ::before {
    content: '\\00b7 \\00b7 \\00b7';
    ${tw`font-bold text-skin-muted text-2xl`}
    letter-spacing: 21px;
  }
`;

export default PostBreaker;
