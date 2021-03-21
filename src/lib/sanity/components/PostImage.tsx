import LoadingIndicator from '@components/LoadingIndicator/LoadingIndicator';
import { lqipBackground } from '@utils/css-utils';
import Image from 'next/image';
import React, { ReactElement, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';
import { ImageModel } from '../models/ImageModel';
import { urlFor } from '../utils/sanity-api-utils';

type Props = {
	node: Omit<ImageModel, 'url'> & {
		asset: any;
	};
	options: {
		imageOptions: any;
	};
};

function PostImage({ node, options }: Props): ReactElement {
	const { width, height, lqip } = node.metadata;
	const imgSrc = urlFor(node.asset).withOptions(options.imageOptions).url();

	let renderContent: ReactNode = <LoadingIndicator />;

	if (imgSrc) {
		renderContent = (
			<Image
				layout="fill"
				src={imgSrc}
				alt={
					node.alt ?? node.caption ?? 'There is no alt text for this picture'
				}
			/>
		);
	}

	return (
		<figure tw="space-y-2 my-8 flex flex-col items-center justify-center rounded-sm overflow-hidden">
			<Picture imgHeight={+height} imgWidth={+width} lqip={lqip}>
				{renderContent}
			</Picture>
			<figcaption tw="mx-auto text-smaller text-gray-200 text-center">
				{node.caption}
			</figcaption>
		</figure>
	);
}

// TODO: zoom on click, brighten on hover
type PictureProps = {
	lqip?: string;
	imgWidth: number;
	imgHeight: number;
};
const Picture = styled.div<PictureProps>`
	${tw` relative`}
	width: 100%;
	padding-bottom: calc(100% / ${(p) => p.imgWidth / p.imgHeight});

	div {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;

		${(p) => p.lqip && lqipBackground(p.lqip)}
	}
`;

export default PostImage;
