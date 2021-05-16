import Image from '@components/common/Image/Image';
import { Asset } from '@prismic-types';
import { fonts } from '@styles/_typographyStyles';
import { getSizes } from '@utils/css-utils';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';
type Props = {
  className?: string;
  data: {
    title: string;
    description: RichTextBlock[];
    thumbnail: Asset;
  };
};

// TODO useSizes()
function PageBanner({ className, data }: Props) {
  const { title, description, thumbnail } = data;

  return (
    <header
      key={data.title}
      className={className}
      tw="relative col-span-full aspect-w-16 aspect-h-7 mb-10 md:mb-20 xl:grid-p-sm"
    >
      {/* TODO fix sizes */}
      <Image
        tw="img-absolute absolute!"
        imgSrc={thumbnail.url}
        alt={thumbnail.alt ?? 'Missing alternative text'}
        sizes={getSizes(['75vw'])}
      />

      <div
        tw="absolute z-10 w-full h-full flex flex-col items-center justify-center text-white"
        css="background: linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.8) 100%)"
      >
        <h1 css={fonts.h1}>{title}</h1>

        {description && (
          <div tw="hidden md:(block text-center mt-5 max-w-md font-medium)">
            <RichText render={description} />
          </div>
        )}
      </div>
    </header>
  );
}

export default PageBanner;
