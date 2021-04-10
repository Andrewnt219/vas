import { QuoteSlice as QuoteSliceProps } from '@prismic-slices';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import tw, { styled } from 'twin.macro';

type Props = { className?: string; slice: QuoteSliceProps };
const QuoteSlice = ({ slice }: Props) => (
	<figure>
		<StyledBlockquote>{RichText.asText(slice.primary.quote)}</StyledBlockquote>

		<figcaption tw="text-gray-200  text-center uppercase">
			{RichText.render(slice.primary.name_of_the_author)}
		</figcaption>
	</figure>
);

const StyledBlockquote = styled.blockquote`
	${tw`relative  font-medium  text-center leading-snug`}
	${tw`text-2xl my-7 pt-3 px-2`}
	${tw`md:(text-4xl my-10 pt-5 px-10)`}

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
export default QuoteSlice;
