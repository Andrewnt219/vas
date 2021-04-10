import Image from '@components/Image/Image';
import { Asset } from '@prismic-types';
import React from 'react';
import 'twin.macro';

type Props = { className?: string; data: Asset };

function ImageSerializer({ className, data }: Props) {
	const imgSrc = `${data.url}&fm=webp`;

	return (
		<Image
			imgSrc={imgSrc}
			sizes="(min-width: 65ch) 65ch, 100vw"
			tw="w-full rounded"
			className={className}
			alt={data.alt ?? 'Missing alternative text'}
			width={data.dimensions.width}
			height={data.dimensions.height}
		/>
	);
}

export default ImageSerializer;
