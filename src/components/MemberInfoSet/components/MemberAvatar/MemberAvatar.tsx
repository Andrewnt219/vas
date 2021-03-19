import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import { ImageModel } from '@lib/sanity/models/ImageModel';
import React from 'react';
import tw, { styled } from 'twin.macro';

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
		<Container className={className}>
			<EnhancedImage
				tw="absolute-cover all:object-cover bg-no-repeat bg-cover bg-center"
				src={url}
				lqip={lqip}
				alt={alt ?? "A VAS's member avatar"}
				layout="fill"
			/>
		</Container>
	);
}

const Container = styled.div`
	${tw` rounded-lg overflow-hidden relative pb-full xl:rounded-4xl `}//TODO put border around imgs
`;

export default MemberAvatar;
