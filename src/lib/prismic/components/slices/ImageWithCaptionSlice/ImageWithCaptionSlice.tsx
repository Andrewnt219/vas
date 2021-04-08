import type { ImageWithCaptionSlice as ImageWithCaptionSliceProps } from '@prismic-slices';
import { useImageSwap } from '@src/hooks/useImageSwap';
import { getLqip, getSrcSet } from '@utils/imgix-utils';
import React from 'react';
import 'twin.macro';

type Props = { className?: string; slice: ImageWithCaptionSliceProps };

// TODO maybe add config (label) in prismic for full-width or not, so we can set the sizes accordingly
function ImageWithCaptionSlice({ className, slice }: Props) {
	const data = slice.primary;
	const imgRef = useImageSwap();

	return (
		<figure
			className={className}
			tw="my-9 flex flex-col items-center justify-center rounded overflow-hidden md:my-12"
		>
			<img
				data-srcset={getSrcSet(data.image.url)}
				data-src={data.image.url}
				src={getLqip(data.image.url)}
				srcSet={getLqip(data.image.url)}
				ref={imgRef}
				width={data.image.dimensions.width}
				height={data.image.dimensions.height}
				alt={data.image.alt ?? 'Missing alt'}
				sizes="(min-width: 65ch) 65ch, 100vw"
			/>
			<figcaption tw="mx-auto text-smaller mt-2 text-gray-200 text-center">
				{data.caption}
			</figcaption>
		</figure>
	);
}

export default ImageWithCaptionSlice;
