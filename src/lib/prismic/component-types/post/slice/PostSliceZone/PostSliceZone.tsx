import { SliceProps } from '@utils';
import React from 'react';
import 'twin.macro';
import PostImageWithCaptionSlice from '../PostImageWithCaptionSlice/PostImageWithCaptionSlice';
import PostQuoteSlice from '../PostQuoteSlice/PostQuoteSlice';
import PostTextSlice from '../PostTextSlice/PostTextSlice';

export type PostSlice =
	| SliceProps<typeof PostTextSlice>
	| SliceProps<typeof PostQuoteSlice>
	| SliceProps<typeof PostImageWithCaptionSlice>;
type Props = { className?: string; slice: PostSlice };

function PostSliceZone({ className, slice }: Props) {
	switch (slice.slice_type) {
		case 'text':
			return <PostTextSlice slice={slice} />;

		case 'quote':
			return <PostQuoteSlice slice={slice} />;

		case 'image_with_caption':
			return <PostImageWithCaptionSlice slice={slice} />;

		default:
			return <p tw="text-primary text-8xl">This slice is not supported</p>;
	}
}

export default PostSliceZone;
