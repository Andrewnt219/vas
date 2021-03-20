import BlockContent from '@sanity/block-content-to-react';
import React from 'react';
import tw, { styled } from 'twin.macro';

export const BlockRenderer = (props: any) => {
	let Block: any;

	switch (props.node.style) {
		case 'normal':
			Block = Normal;
			break;

		case 'h2':
			Block = Heading2;
			break;

		case 'h3':
			Block = Heading3;
			break;

		case 'h4':
			Block = Heading4;
			break;

		case 'blockquote':
			Block = Blockquote;
			break;

		// Fall back to default handling
		default:
			return (BlockContent as any).defaultSerializers.types.block(props);
	}

	return <Block>{props.children}</Block>;
};

const Normal = styled.p(() => [tw`mb-6`]);

const Heading2 = styled.h2(() => [tw`text-2xl font-bold  mb-3 mt-12`]);

const Heading3 = styled.h3(() => [tw`mt-10 mb-3 font-bold text-xl`]);

const Heading4 = styled.h4(() => [tw`mt-8 mb-3 font-bold text-lg`]);

const Blockquote = styled.blockquote`
	${tw`font-medium text-2xl text-center leading-snug`}
	${tw`relative my-10 pt-4 px-2`}


	::before {
		${tw`z-0`}
		${tw`text-primary opacity-25`}
		font-size: 7rem;

		content: '\\201c';
		position: absolute;
		top: 0;
		left: 50%;

		transform: translate(-50%, -1rem) rotate(1deg);
		font-family: 'Georgia';
		line-height: initial;
	}

	${tw`xl:px-8`}
`;
