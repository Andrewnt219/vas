import Image from '@components/Image/Image';
import { Asset } from '@prismic-types';
import React from 'react';
import 'twin.macro';

type Props = { className?: string; data: Asset };

// TODO preview image on click
function PostImage({ className, data }: Props) {
	const imgSrc = `${data.url}`;

	return (
		<Image
			imgSrc={imgSrc}
			sizes="(min-width: 65ch) 65ch, 100vw"
			tw="w-full mb-4 rounded-sm overflow-hidden"
			className={className}
			alt={data.alt ?? 'Missing alternative text'}
			width={data.dimensions.width}
			height={data.dimensions.height}
		/>
	);
}

export default PostImage;
