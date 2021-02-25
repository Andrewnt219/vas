import NextImage, { ImageProps } from 'next/image';
import React, { useRef, VFC } from 'react';
import 'twin.macro';
type Props = ImageProps & {
	className?: string;
};

// For some reasons, using Omit src cause error
const Image: VFC<Props> = ({ className, src, ...imageProps }) => {
	const lqipRef = useRef<HTMLImageElement | null>(null);

	const handleImageLoad = () => {
		const imageElement = lqipRef.current;
		if (imageElement) {
			imageElement.style.opacity = '0';
		}
	};

	const handleErrorLoad = () => {
		const imageElement = lqipRef.current;

		if (imageElement) {
			imageElement.style.opacity = '1';
		}
	};

	return (
		<div className={className} tw="relative">
			<img
				tw="h-full w-full object-cover absolute top-0 left-0"
				aria-hidden="true"
				alt=""
				ref={lqipRef}
				src={require(`images/${src}?lqip`)}
			/>
			<NextImage
				src={require(`images/${src}`)}
				onLoad={handleImageLoad}
				onError={handleErrorLoad}
				{...imageProps}
			/>
		</div>
	);
};

export default Image;
