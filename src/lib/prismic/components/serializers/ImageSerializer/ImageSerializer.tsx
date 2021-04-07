import { Asset } from '@prismic-types';
import { useImageSwap } from '@src/hooks/useImageSwap';
import { getLqip, getSrcSet } from '@utils/imgix-utils';
import React from 'react';
import 'twin.macro';

type Props = { className?: string; data: Asset };

function ImageSerializer({ className, data }: Props) {
	const imgSrc = `${data.url}&fm=webp`;
	const imgRef = useImageSwap();

	return (
		<img
			ref={imgRef}
			srcSet={getLqip(imgSrc)}
			src={getLqip(imgSrc)}
			data-srcset={getSrcSet(imgSrc)}
			data-src={imgSrc}
			sizes="(min-width: 65ch) 65ch, 100vw"
			tw="w-full"
			className={className}
			alt={data.alt ?? 'Missing alternative text'}
			width={data.dimensions.width}
			height={data.dimensions.height}
		/>
	);
}

export default ImageSerializer;
