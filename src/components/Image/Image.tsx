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
type Props = HtmlImageProps & {
	className?: string;
	imgSrc: string;
	alt: string;
};

function Image({ className, imgSrc, alt, ...imgProps }: Props) {
	const imgRef = useImageSwap();

	return (
		<img
			ref={imgRef}
			srcSet={getLqip(imgSrc)}
			src={getLqip(imgSrc)}
			data-srcset={getSrcSet(imgSrc)}
			data-src={imgSrc}
			tw="w-full rounded"
			className={className}
			alt={alt}
			{...imgProps}
		/>
	);
}

export default Image;
