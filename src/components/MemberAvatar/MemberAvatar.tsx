import Image from '@components/Image/Image';
import { Asset } from '@prismic-types';
import React from 'react';

type Props = {
	className?: string;
	// TODO so close ComponentType<ComponentProps<typeof EnhancedImage>>
	imageData: Asset;
};

function MemberAvatar({ className, imageData }: Props) {
	return (
		<div tw="relative pb-full" className={className}>
			<Image
				tw="img-absolute absolute!"
				imgSrc={imageData.url}
				alt={imageData.alt ?? 'Missing alt text'}
			/>
		</div>
	);
}

export default MemberAvatar;
