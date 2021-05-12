import Image from '@components/common/Image/Image';
import { Asset } from '@prismic-types';
import { getSizes } from '@utils/css-utils';
import React from 'react';
import 'twin.macro';

type Props = { className?: string; data: Asset };

function AboutUsImage({ className, data }: Props) {
  const imgSrc = `${data.url}`;

  return (
    <Image
      sizes={getSizes(['80vw', undefined, '50vw'])}
      imgSrc={imgSrc}
      tw="my-7 md:my-14 rounded-sm overflow-hidden "
      className={className}
      alt={data.alt ?? 'Missing alternative text'}
      width={data.dimensions.width}
      height={data.dimensions.height}
    />
  );
}

export default AboutUsImage;
