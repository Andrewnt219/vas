import React, { ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	className?: string;
	// TODO so close ComponentType<ComponentProps<typeof EnhancedImage>>
	children: ReactNode;
};

function MemberAvatar({ className, children }: Props) {
	return <Container className={className}>{children}</Container>;
}

const Container = styled.div`
	${tw` rounded-lg overflow-hidden relative pb-full xl:rounded-4xl `}//TODO put border around imgs
`;

export default MemberAvatar;
