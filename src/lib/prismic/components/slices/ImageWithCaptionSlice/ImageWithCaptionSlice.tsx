import type { ImageWithCaptionSlice as ImageWithCaptionSliceProps } from '@prismic-slices';
import React from 'react';
import 'twin.macro';

type Props = { className?: string; slice: ImageWithCaptionSliceProps };

function ImageWithCaptionSlice({ className, slice }: Props) {
	const data = slice.primary;

	return (
		<figure>
			<img
				src={data.image.url}
				width={data.image.dimensions.width}
				height={data.image.dimensions.height}
				alt={data.image.alt ?? 'Missing alt'}
			/>
			<figcaption>{data.caption}</figcaption>
		</figure>
	);
}

export default ImageWithCaptionSlice;
