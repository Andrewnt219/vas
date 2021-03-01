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
		<header
			className={className}
			tw="w-full relative"
			style={{ paddingBottom: '41.7%' }}
		>
			<CustomLocalImage src={imgPath} />
			<div
				tw="absolute z-10 w-full h-full flex flex-col items-center justify-center text-white"
				style={{
					background:
						'linear-gradient(180deg, rgba(0, 0, 0, 0.088) 0%, rgba(0, 0, 0, 0.4) 100%)',
				}}
			>
				<h1 tw="text-h1 font-bold">{title}</h1>
				<p tw="font-medium text-subtitle mt-5 max-w-md text-center">
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
