import { SliceComponentProps } from '@prismic-slices';
import { Asset } from '@prismic-types';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';
import tw, { css } from 'twin.macro';

const figure = css`
  ${tw`relative p-6`}

  ::before {
    ${tw`z-0`}
    ${tw`text-primary text-8xl opacity-10 font-bold`}
		${tw`absolute left-0 top-5`}
		${tw`md:(text-9xl top-0)`}

		content: '\\201d';

    font-family: serif;
    line-height: 55px;
  }
`;

/* -------------------------------------------------------------------------- */

type SliceProps = {
  slice_type: 'quote';
  slice_label: null;
  items: unknown[];
  primary: {
    quote: RichTextBlock[];
    name_of_the_author: RichTextBlock[];
    portrait_author: Asset;
  };
};
type Props = SliceComponentProps<SliceProps>;
const PostQuoteSlice = ({ slice }: Props) => (
  <figure css={figure}>
    <blockquote tw=" font-black text-larger mb-2">
      {RichText.asText(slice.primary.quote)}
    </blockquote>

    <figcaption tw="italic">
      {RichText.render(slice.primary.name_of_the_author)}
    </figcaption>
  </figure>
);

export default PostQuoteSlice;
