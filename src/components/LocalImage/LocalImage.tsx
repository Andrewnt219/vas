import NextImage, { ImageProps } from 'next/image';
import React, { SyntheticEvent, useRef, VFC } from 'react';
import 'twin.macro';

// For some reasons, using Omit src cause error
type Props = ImageProps & {
	className?: string;
};

/**
 * @description Enhanced local images loading with next-optimized-images
 */
const LocalImage: VFC<Props> = ({ className, src, ...imageProps }) => {
	const lqipRef = useRef<HTMLImageElement | null>(null);
	const fixedSrc = src.startsWith('/') ? src.replace('/', '') : src;

	// Switch display with placeholder
	const handleImageLoad = (ev: SyntheticEvent<HTMLImageElement, Event>) => {
		const placeholderImageEl = lqipRef.current;
		const { currentTarget: imageEl } = ev;

		imageEl.style.opacity = '1';

		if (placeholderImageEl) {
			placeholderImageEl.style.opacity = '0';
		}
	};

	// Show placeholder again
	const handleErrorLoad = (ev: SyntheticEvent<HTMLImageElement, Event>) => {
		const placeholderImageEl = lqipRef.current;
		const { currentTarget: imageEl } = ev;

		imageEl.style.opacity = '0';

		if (placeholderImageEl) {
			placeholderImageEl.style.opacity = '1';
		}
	};

	return (
		<div className={className} tw="relative">
			<img
				tw="h-full w-full object-cover absolute top-0 left-0 opacity-100 duration-300 "
				aria-hidden="true"
				alt=""
				ref={lqipRef}
				src={require(`images/${fixedSrc}?lqip`)}
			/>
			<NextImage
				tw="opacity-0 transition-opacity duration-500 delay-200"
				src={require(`images/${fixedSrc}`)}
				onLoad={handleImageLoad}
				onError={handleErrorLoad}
				{...imageProps}
			/>
		</div>
	);
};

export default LocalImage;
