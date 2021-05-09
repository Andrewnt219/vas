import { Embed } from '@prismic-types';
import { postGutterBottom } from '@styles/spacing';
import React from 'react';

type Props = { className?: string; data: Embed };

function PostEmbed({ className, data }: Props) {
  return (
    <div
      className={className}
      css={postGutterBottom}
      tw="w-full aspect-w-4 aspect-h-3 relative all-child:(w-full h-full absolute)"
      dangerouslySetInnerHTML={{ __html: data.oembed.html }}
    />
  );
}

export default PostEmbed;
