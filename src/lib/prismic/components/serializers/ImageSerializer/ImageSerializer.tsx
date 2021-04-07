import { Asset } from '@prismic-types';
import { useImageSwap } from '@src/hooks/useImageSwap';
import React from 'react';
import 'twin.macro';

type Props = { className?: string; data: Asset };

function ImageSerializer({ className, data }: Props) {
	const imgSrc = `${data.url}&fm=webp`;
	const imgRef = useImageSwap();

	// TODO create a utility for srcset and data
	// TODO do we even need responsive blur
	return (
		<img
			srcSet={`${imgSrc}&w=500&px=10&blur=200`}
			src={`${imgSrc}&w=500&px=10&blur=200`}
			data-srcset={`
				${imgSrc}&w=1024 1024w,
				${imgSrc}&w=640 640w,
				${imgSrc}&w=480 480w
			`}
			data-src={imgSrc}
			sizes="(min-width: 36em) 33.3vw, 100vw"
			ref={imgRef}
			tw="w-full"
			className={className}
			alt={data.alt ?? 'Missing alternative text'}
			width={data.dimensions.width}
			height={data.dimensions.height}
		/>
	);
}

export default ImageSerializer;
