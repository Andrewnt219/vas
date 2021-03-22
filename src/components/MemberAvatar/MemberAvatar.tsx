import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import { ImageModel } from '@lib/sanity/models/ImageModel';
import React from 'react';

type Props = {
	className?: string;
	// TODO so close ComponentType<ComponentProps<typeof EnhancedImage>>
	imageData: ImageModel;
};

function MemberAvatar({ className, imageData }: Props) {
	const {
		metadata: { lqip },
		alt,
		url,
	} = imageData;
	return (
		<div tw="relative pb-full" className={className}>
			<EnhancedImage
				tw="img-absolute"
				src={url}
				lqip={lqip}
				alt={alt ?? "A VAS's member avatar"}
				layout="fill"
			/>
		</div>
	);
}

export default MemberAvatar;
