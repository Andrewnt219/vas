import { SliceComponentProps } from '@prismic-slices';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';
import 'twin.macro';
import { serializer } from '../../post-serializer';

type SliceProps = {
  slice_type: 'text';
  slice_label: null;
  items: unknown[];
  primary: {
    text: RichTextBlock[];
  };
};
type Props = SliceComponentProps<SliceProps>;

function PostTextSlice({ slice }: Props) {
  return <RichText render={slice.primary.text} htmlSerializer={serializer} />;
}

export default PostTextSlice;
