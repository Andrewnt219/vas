import { SliceComponentProps } from '@prismic-slices';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';
import 'twin.macro';
import { PostSerializer } from '../../serializer/PostSerializer/PostSerializer';

type SliceProps = {
	slice_type: 'text';
	slice_label: null;
	items: unknown[];
	primary: {
		text: RichTextBlock[];
	};
};
type Props = SliceComponentProps<SliceProps>;

function PostTextSlice({ slice }: Props) {
	return (
		<RichText render={slice.primary.text} htmlSerializer={PostSerializer} />
	);
}

export default PostTextSlice;
