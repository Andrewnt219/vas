import Image from '@components/Image/Image';
import { Asset } from '@prismic-types';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';
type Props = {
	className?: string;
	data: {
		title: string;
		description: RichTextBlock[];
		thumbnail: Asset;
	};
};

function PageBanner({ className, data }: Props) {
	const { title, description, thumbnail } = data;

	return (
		<header
			key={data.title}
			className={className}
			tw="relative col-span-full pb-2xs mb-10 md:mb-20 xl:grid-p-sm"
		>
			{/* TODO fix sizes */}
			<Image
				tw="img-absolute absolute!"
				imgSrc={thumbnail.url}
				alt={thumbnail.alt ?? 'Missing alternative text'}
				sizes="75vw"
			/>

			<div
				tw="absolute z-10 w-full h-full flex flex-col items-center justify-center text-white"
				css="background: linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.8) 100%)"
			>
				<h1 tw="font-bold text-h1-variants">{title}</h1>

				{description && (
					<div tw="hidden md:(block text-center mt-5 max-w-md font-medium)">
						<RichText render={description} />
					</div>
				)}
			</div>
		</header>
	);
}

export default PageBanner;
