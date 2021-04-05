import { htmlSerializer } from '@lib/prismic/prismic-helpers';
import { TextSlice as TextSliceProps } from '@prismic-slices';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import 'twin.macro';

type Props = { className?: string; slice: TextSliceProps };

function TextSlice({ className, slice }: Props) {
	return (
		<RichText render={slice.primary.text} htmlSerializer={htmlSerializer} />
	);
}

export default TextSlice;
