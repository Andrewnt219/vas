import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import React, { ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	className?: string;
	data: {
		/**
		 * Path inside dir images/
		 */
		imgSrc: string;
		imgLqip: string;
		title: ReactNode;
		subtitle: ReactNode;
	};
};

function PageBanner({ className, data }: Props) {
	const { title, subtitle, imgSrc, imgLqip } = data;

	return (
		<header
			className={className}
			tw="relative col-span-full pb-2xs mb-10 md:mb-20 xl:grid-p-sm"
		>
			<CustomLocalImage src={imgSrc} lqip={imgLqip} sizes="83vw" />
			<div
				tw="absolute z-10 w-full h-full flex flex-col items-center justify-center text-white"
				style={{
					background:
						'linear-gradient(180deg, rgba(0, 0, 0, 0.088) 0%, rgba(0, 0, 0, 0.4) 100%)',
				}}
			>
				<h1 tw="font-bold text-2xl md:text-h1">{title}</h1>
				<p tw="hidden md:(block text-center text-subtitle mt-5 max-w-md font-medium)">
					{subtitle}
				</p>
			</div>
		</header>
	);
}

// Workaround weird typechecking of next-images
const CustomLocalImage = styled(EnhancedImage).attrs({ layout: 'fill' })`
	${tw`absolute-cover`}

	img {
		${tw`object-cover`}
	}
`;

export default PageBanner;
