import { Slice } from '@prismic-slices';
import React from 'react';
import 'twin.macro';
import ImageWithCaptionSlice from '../ImageWithCaptionSlice/ImageWithCaptionSlice';
import QuoteSlice from '../QuoteSlice/QuoteSlice';
import TextSlice from '../TextSlice/TextSlice';

type Props = { className?: string; slice: Slice };

function SliceZone({ className, slice }: Props) {
	switch (slice.slice_type) {
		case 'text':
			return <TextSlice slice={slice} />;

		case 'quote':
			return <QuoteSlice slice={slice} />;

		case 'image_with_caption':
			return <ImageWithCaptionSlice slice={slice} />;

		default:
			return <p tw="text-primary text-8xl">This slice is not supported</p>;
	}
}

export default SliceZone;
