import Image from '@components/Image/Image';
import { Asset } from '@prismic-types';
import React from 'react';
import 'twin.macro';

type Props = { className?: string; data: Asset };

function AboutUsImage({ className, data }: Props) {
	const imgSrc = `${data.url}&fm=webp`;

	return (
		<Image
			sizes="(min-width: 1280px) 50vw, 80vw"
			imgSrc={imgSrc}
			tw="my-7 md:my-14 rounded-sm overflow-hidden "
			className={className}
			alt={data.alt ?? 'Missing alternative text'}
			width={data.dimensions.width}
			height={data.dimensions.height}
		/>
	);
}

export default AboutUsImage;
