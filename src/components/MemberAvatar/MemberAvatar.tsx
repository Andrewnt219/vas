import Image from '@components/Image/Image';
import { useSizes } from '@contexts/SizesContext';
import { Asset } from '@prismic-types';
import React from 'react';

type Props = {
	className?: string;
	// TODO so close ComponentType<ComponentProps<typeof EnhancedImage>>
	imageData: Asset;
};

function MemberAvatar({ className, imageData }: Props) {
	const imgSrc = imageData.url + '&fm=webp';
	const sizes = useSizes();

	return (
		<div tw="relative pb-full" className={className}>
			<Image
				sizes={sizes}
				tw="img-absolute absolute!"
				imgSrc={imgSrc}
				alt={imageData.alt ?? 'Missing alt text'}
			/>
		</div>
	);
}

export default MemberAvatar;
