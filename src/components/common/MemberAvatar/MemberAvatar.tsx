import Image from '@components/common/Image/Image';
import { useSizes } from '@contexts/SizesContext';
import { Asset } from '@prismic-types';
import React from 'react';

type Props = {
  className?: string;
  // TODO so close ComponentType<ComponentProps<typeof EnhancedImage>>
  imageData: Asset;
};

function MemberAvatar({ className, imageData }: Props) {
  const imgSrc = imageData.url;
  const sizes = useSizes();

  return (
    <div tw="relative aspect-w-1 aspect-h-1" className={className}>
      <Image
        sizes={sizes}
        tw="img-absolute absolute!"
        imgSrc={imgSrc}
        alt={imageData.alt ?? 'Missing alt text'}
      />
    </div>
  );
}

export default MemberAvatar;
