import { Asset } from '@prismic-types';
import React, { useEffect, useRef } from 'react';
import 'twin.macro';

type Props = { className?: string; data: Asset };

function ImageSerializer({ className, data }: Props) {
	const imgSrc = `${data.url}&fm=webp`;
	const imgRef = useRef<HTMLImageElement | null>(null);

	useEffect(() => {
		const imgEl = imgRef.current;

		if (imgEl) {
			const dataSrc = imgEl.getAttribute('data-src') ?? '';
			const dataSrcSet = imgEl.getAttribute('data-srcset') ?? '';
			imgEl.setAttribute('src', dataSrc);
			imgEl.setAttribute('srcset', dataSrcSet);
		}
	}, []);

	// TODO create a utility for srcset and data stuffs
	return (
		<img
			srcSet={`
				${imgSrc}&w=1024&px=16&blur=200 1024w,
				${imgSrc}&w=640&px=16&blur=200 640w,
				${imgSrc}&w=480&px=16&blur=200 480w
			`}
			data-srcSet={`
				${imgSrc}&w=1024 1024w,
				${imgSrc}&w=640 640w,
				${imgSrc}&w=480 480w
			`}
			sizes="(min-width: 36em) 33.3vw, 100vw"
			ref={imgRef}
			tw="w-full"
			className={className}
			alt={data.alt ?? 'Missing alternative text'}
			src={`${imgSrc}&px=16&blur=200`}
			data-src={imgSrc}
			width={data.dimensions.width}
			height={data.dimensions.height}
		/>
	);
}

export default ImageSerializer;
