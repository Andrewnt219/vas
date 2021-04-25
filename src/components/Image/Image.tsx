import { useImageSwap } from '@src/hooks/useImageSwap';
import { getLqip, getSrcSet } from '@utils/imgix-utils';
import React, { ImgHTMLAttributes } from 'react';
import 'twin.macro';

type HtmlImageProps = Omit<
	ImgHTMLAttributes<HTMLImageElement>,
	'srcSet' | 'src' | 'ref'
> & {
	'data-srcset'?: never;
	'data-src'?: never;
};
type Props = Omit<HtmlImageProps, 'src' | 'alt'> & {
	className?: string;
	imgSrc: string;
	alt: string | undefined | null;
};

function Image({ className, imgSrc, alt, ...imgProps }: Props) {
	const imgRef = useImageSwap();
	imgSrc += '&fm=webp';

	return (
		<img
			ref={imgRef}
			srcSet={getLqip(imgSrc)}
			src={getLqip(imgSrc)}
			data-srcset={getSrcSet(imgSrc)}
			data-src={imgSrc}
			className={className}
			tw="w-full rounded"
			alt={alt ?? 'Missing alt text'}
			loading="lazy"
			{...imgProps}
		/>
	);
}

export default Image;
