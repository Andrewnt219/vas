import Image from '@components/common/Image/Image';
import { useSizes } from '@contexts/SizesContext';
import { Asset } from '@prismic-types';
import { postGutterBottom } from '@styles/spacing';
import React from 'react';
import 'twin.macro';

type Props = { className?: string; data: Asset };

// TODO preview image on click
function ImageSerializer({ className, data }: Props) {
  const imgSrc = `${data.url}`;
  const sizes = useSizes();

  return (
    <Image
      imgSrc={imgSrc}
      css={postGutterBottom}
      sizes={sizes}
      tw="w-full rounded-sm overflow-hidden"
      className={className}
      alt={data.alt ?? 'Missing alternative text'}
      width={data.dimensions.width}
      height={data.dimensions.height}
    />
  );
}

export default ImageSerializer;
