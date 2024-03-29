import { margin } from '@styles/spacing';
import { fonts } from '@styles/_typographyStyles';
import { RichTextBlock } from 'prismic-reactjs';
import { ReactNode } from 'react';
import { TwStyle } from 'twin.macro';

type Props = {
  className?: string;
  data: RichTextBlock;
  children: ReactNode;
  config?: {
    h1?: TwStyle;
    h2?: TwStyle;
    h3?: TwStyle;
    h4?: TwStyle;
    h5?: TwStyle;
    h6?: TwStyle;
    p?: TwStyle;
  };
};

function RichTextSerializer({ className, data, children, config }: Props) {
  switch (data.type) {
    case 'heading2':
      return (
        <h2
          className={className}
          css={[fonts.h2, config?.h2]}
          tw=" mb-4 mt-7 xl:( mt-14 mb-8)"
        >
          {children}
        </h2>
      );

    case 'heading3':
      return (
        <h3
          className={className}
          css={[config?.h3]}
          tw="font-bold mt-7 mb-2 text-larger md:(mt-14 mb-5 text-3xl)"
        >
          {children}
        </h3>
      );

    case 'heading4':
      return (
        <h4
          className={className}
          css={[config?.h4]}
          tw="font-bold mt-7 mb-2 md:(mt-14 mb-3)"
        >
          {children}
        </h4>
      );

    case 'paragraph':
      return (
        <p className={className} css={[margin.gutterBottom, config?.p]}>
          {children}
        </p>
      );

    default:
      return null;
  }
}

export default RichTextSerializer;
