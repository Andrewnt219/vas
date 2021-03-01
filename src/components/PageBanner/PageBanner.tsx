import LocalImage from '@components/LocalImage/LocalImage';
import React, { ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	className?: string;
	data: {
		/**
		 * Path inside dir images/
		 */
		imgPath: string;
		title: ReactNode;
		subtitle: ReactNode;
	};
};

function PageBanner({ className, data }: Props) {
	const { title, subtitle, imgPath } = data;

	return (
		<header className={className} tw="w-full relative pb-2xs">
			<CustomLocalImage src={imgPath} sizes="83vw" />
			<div
				tw="absolute z-10 w-full h-full flex flex-col items-center justify-center text-white"
				style={{
					background:
						'linear-gradient(180deg, rgba(0, 0, 0, 0.088) 0%, rgba(0, 0, 0, 0.4) 100%)',
				}}
			>
				<h1 tw="font-bold text-2xl md:text-h1">{title}</h1>
				<p tw="hidden  md:(block text-center text-subtitle mt-5 max-w-md font-medium)">
					{subtitle}
				</p>
			</div>
		</header>
	);
}

// Workaround weird typechecking of next-images
const CustomLocalImage = styled(LocalImage).attrs({ layout: 'fill' })`
	${tw`absolute-cover`}

	img {
		${tw`object-cover`}
	}
`;

export default PageBanner;
