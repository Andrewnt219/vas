import { postGutterBottom } from '@styles/spacing';
import { h2 } from '@styles/_typographyStyles';
import { RichTextBlock } from 'prismic-reactjs';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  data: RichTextBlock;
  children: ReactNode;
};

function PostRichText({ className, data, children }: Props) {
  switch (data.type) {
    case 'heading2':
      return (
        <h2 className={className} css={h2} tw=" mb-4 mt-7 xl:( mt-14 mb-8)">
          {children}
        </h2>
      );

    case 'heading3':
      return (
        <h3
          className={className}
          tw="font-bold mt-7 mb-2 text-larger md:(mt-14 mb-5 text-3xl)"
        >
          {children}
        </h3>
      );

    case 'heading4':
      return (
        <h4 className={className} tw="font-bold mt-7 mb-2 md:(mt-14 mb-3)">
          {children}
        </h4>
      );

    case 'paragraph':
      return (
        <p className={className} css={postGutterBottom}>
          {children}
        </p>
      );

    default:
      return null;
  }
}

export default PostRichText;
