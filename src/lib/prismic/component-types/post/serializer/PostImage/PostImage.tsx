import Image from '@components/Image/Image';
import { Asset } from '@prismic-types';
import React from 'react';
import 'twin.macro';

type Props = { className?: string; data: Asset };

function PostImage({ className, data }: Props) {
	const imgSrc = `${data.url}&fm=webp`;

	return (
		<Image
			imgSrc={imgSrc}
			sizes="(min-width: 65ch) 65ch, 100vw"
			tw="w-full my-9 flex flex-col items-center justify-center rounded-sm overflow-hidden md:my-12"
			className={className}
			alt={data.alt ?? 'Missing alternative text'}
			width={data.dimensions.width}
			height={data.dimensions.height}
		/>
	);
}

export default PostImage;
