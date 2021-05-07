import { SliceComponentProps } from '@prismic-slices';
import { Asset } from '@prismic-types';
import { useImageSwap } from '@src/hooks/useImageSwap';
import { postGutterBottom } from '@styles/spacing';
import { getLqip, getSrcSet } from '@utils/imgix-utils';
import React from 'react';
import 'twin.macro';

type SliceProps = {
  slice_type: 'image_with_caption';
  slice_label: null;
  items: unknown[];
  primary: {
    image: Asset;
    caption?: string;
  };
};
type Props = SliceComponentProps<SliceProps>;

// TODO maybe add config (label) in prismic for full-width or not, so we can set the sizes accordingly
// TODO preview image on click
function PostImageWithCaptionSlice({ className, slice }: Props) {
  const data = slice.primary;
  const imgRef = useImageSwap();

  return (
    <figure
      className={className}
      css={postGutterBottom}
      tw="flex flex-col items-center justify-center rounded overflow-hidden"
    >
      <img
        data-srcset={getSrcSet(data.image.url)}
        data-src={data.image.url}
        src={getLqip(data.image.url)}
        srcSet={getLqip(data.image.url)}
        ref={imgRef}
        width={data.image.dimensions.width}
        height={data.image.dimensions.height}
        alt={data.image.alt ?? 'Missing alt'}
        sizes="(min-width: 65ch) 130ch, 100vw"
      />
      <figcaption tw="mx-auto text-smaller mt-2 text-skin-muted text-center">
        {data.caption}
      </figcaption>
    </figure>
  );
}

export default PostImageWithCaptionSlice;
