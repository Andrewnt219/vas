import { Embed } from '@prismic-types';
import React from 'react';

type Props = { className?: string; data: Embed };

function PostEmbed({ className, data }: Props) {
  return (
    <div
      className={className}
      tw="w-full pb-sm relative all-child:(w-full h-full absolute) mb-sm md:mb-md"
      dangerouslySetInnerHTML={{ __html: data.oembed.html }}
    />
  );
}

export default PostEmbed;
