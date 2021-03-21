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

const Normal = tw.p`mb-7 md:mb-10`;

const Heading2 = tw.h2`font-bold text-2xl mt-10 mb-2 md:(text-4xl mb-8 mt-16)`;

const Heading3 = tw.h3`font-bold mt-7 mb-2 text-larger md:(mt-14 mb-5 text-3xl)`;

const Heading4 = tw.h4`font-bold mt-7 mb-2 md:(mt-14 mb-3 )`;

const Blockquote = styled.blockquote`
	${tw`relative  font-medium  text-center leading-snug`}
	${tw`text-2xl my-10 pt-5 px-2`}
	${tw`md:(text-4xl my-16 pt-7 px-12)`}

	::before {
		${tw`z-0`}
		${tw`text-primary opacity-25`}
		font-size: 10rem;

		content: '\\201c';
		position: absolute;
		top: 0;
		left: 50%;

		transform: translate(-50%, -2rem) rotate(1deg);
		font-family: 'Georgia';
		line-height: initial;
	}

	${tw`xl:px-8`}
`;
