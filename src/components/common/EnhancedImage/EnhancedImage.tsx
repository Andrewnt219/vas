import NextImage, { ImageProps } from 'next/image';
import React, { SyntheticEvent, useRef, VFC } from 'react';

// For some reasons, using Omit src cause error
type Props = ImageProps & {
  className?: string;
  lqip: string;
  alt: string;
};

// TODO swap the same way as <Image />
/**
 * @description Enhanced local images loading with next-optimized-images
 */
// NOTE there is an error where relative overwrites absolute from img-absolute in deployed version
const EnhancedImage: VFC<Props> = ({ className, lqip, ...imageProps }) => {
  const lqipRef = useRef<HTMLImageElement | null>(null);

  // Switch display with placeholder
  const handleImageLoad = (ev: SyntheticEvent<HTMLImageElement, Event>) => {
    const placeholderImageEl = lqipRef.current;
    const { currentTarget: imageEl } = ev;

    imageEl.style.opacity = '1';

    if (placeholderImageEl) {
      placeholderImageEl.style.opacity = '0';
    }
  };

  // Show placeholder again
  const handleErrorLoad = (ev: SyntheticEvent<HTMLImageElement, Event>) => {
    const placeholderImageEl = lqipRef.current;
    const { currentTarget: imageEl } = ev;

    imageEl.style.opacity = '0';

    if (placeholderImageEl) {
      placeholderImageEl.style.opacity = '1';
    }
  };

  return (
    <div tw="relative" className={className}>
      <img
        tw="h-full w-full object-cover absolute top-0 left-0 opacity-100 duration-500"
        aria-hidden="true"
        alt=""
        ref={lqipRef}
        src={lqip}
      />
      <NextImage
        tw="opacity-0 transition-opacity  duration-500"
        onLoad={handleImageLoad}
        onError={handleErrorLoad}
        {...imageProps}
      />
    </div>
  );
};

export default EnhancedImage;
