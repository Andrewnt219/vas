import { QuoteSlice as QuoteSliceProps } from '@prismic-slices';
import { RichText } from 'prismic-reactjs';
import React from 'react';

type Props = { className?: string; slice: QuoteSliceProps };
const QuoteSlice = ({ slice }: Props) => (
	<figure>
		<blockquote>{RichText.asText(slice.primary.quote)}</blockquote>
		<figcaption>{RichText.asText(slice.primary.name_of_the_author)}</figcaption>
	</figure>
);

export default QuoteSlice;
