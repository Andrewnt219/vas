import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import React, { ReactNode } from 'react';
import 'twin.macro';
type Props = {
	className?: string;
	data: {
		/**
		 * Path inside dir images/
		 */
		imgSrc: string;
		imgLqip: string;
		imgAlt: string;
		title: ReactNode;
		subtitle?: ReactNode;
	};
};

function PageBanner({ className, data }: Props) {
	const { title, subtitle, imgSrc, imgLqip, imgAlt } = data;

	return (
		<header
			key={data.imgSrc}
			className={className}
			tw="relative col-span-full pb-2xs mb-10 md:mb-20 xl:grid-p-sm"
		>
			<EnhancedImage
				tw="img-absolute"
				layout="fill"
				src={imgSrc}
				lqip={imgLqip}
				alt={imgAlt}
				sizes="83vw"
			/>
			<div
				tw="absolute z-10 w-full h-full flex flex-col items-center justify-center text-white"
				css="background: linear-gradient(180deg, rgba(0, 0, 0, 0.088) 0%, rgba(0, 0, 0, 0.4) 100%)"
			>
				<h1 tw="font-bold text-h1-variants">{title}</h1>
				<p tw="hidden md:(block text-center text-subtitle mt-5 max-w-md font-medium)">
					{subtitle}
				</p>
			</div>
		</header>
	);
}

export default PageBanner;
