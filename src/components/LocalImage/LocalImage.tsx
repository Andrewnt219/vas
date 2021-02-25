import NextImage, { ImageProps } from 'next/image';
import React, { SyntheticEvent, useRef, VFC } from 'react';
import 'twin.macro';
type Props = ImageProps & {
	className?: string;
};

// For some reasons, using Omit src cause error
const Image: VFC<Props> = ({ className, src, ...imageProps }) => {
	const lqipRef = useRef<HTMLImageElement | null>(null);

	const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
		const imageElement = lqipRef.current;

		if (imageElement) {
			e.currentTarget.style.opacity = '1';
			imageElement.style.opacity = '0';
		}
	};

	const handleErrorLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
		const imageElement = lqipRef.current;

		if (imageElement) {
			imageElement.style.opacity = '1';
			e.currentTarget.style.opacity = '0';
		}
	};

	return (
		<div className={className} tw="relative">
			<img
				tw="h-full w-full object-cover absolute top-0 left-0 opacity-100 duration-300 "
				aria-hidden="true"
				alt=""
				ref={lqipRef}
				src={require(`images/${src}?lqip`)}
			/>
			<NextImage
				tw="opacity-0 transition-opacity duration-500 delay-200"
				src={require(`images/${src}`)}
				onLoad={handleImageLoad}
				onError={handleErrorLoad}
				{...imageProps}
			/>
		</div>
	);
};

export default Image;
