declare module '@prismic-slices' {
	import { Asset } from '@prismic-types';
	import { RichTextBlock } from 'prismic-reactjs';

	export type Slice = QuoteSlice | TextSlice | ImageWithCaptionSlice;

	type TextSlice = {
		slice_type: 'text';
		slice_label: null;
		items: unknown[];
		primary: {
			text: RichTextBlock[];
		};
	};

	type ImageWithCaptionSlice = {
		slice_type: 'image_with_caption';
		slice_label: null;
		items: unknown[];
		primary: {
			image: Asset;
			caption: string;
		};
	};

	type QuoteSlice = {
		slice_type: 'quote';
		slice_label: null;
		items: unknown[];
		primary: {
			quote: RichTextBlock[];
			name_of_the_author: RichTextBlock[];
			portrait_author: Asset;
		};
	};
}
