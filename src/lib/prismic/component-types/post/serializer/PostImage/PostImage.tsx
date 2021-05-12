import Image from '@components/common/Image/Image';
import { Asset } from '@prismic-types';
import { postGutterBottom } from '@styles/spacing';
import React from 'react';
import 'twin.macro';

type Props = { className?: string; data: Asset };

// TODO preview image on click
function PostImage({ className, data }: Props) {
  const imgSrc = `${data.url}`;

  return (
    <Image
      imgSrc={imgSrc}
      css={postGutterBottom}
      sizes="(min-width: 65ch) 130ch, 100vw"
      tw="w-full rounded-sm overflow-hidden"
      className={className}
      alt={data.alt ?? 'Missing alternative text'}
      width={data.dimensions.width}
      height={data.dimensions.height}
    />
  );
}

export default PostImage;
