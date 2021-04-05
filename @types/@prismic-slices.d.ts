declare module '@prismic-slices' {
	import { Asset, RichText } from '@prismic-types';

	export type Slice = QuoteSlice | TextSlice | ImageWithCaptionSlice;

	type TextSlice = {
		slice_type: 'text';
		slice_label: null;
		items: unknown[];
		primary: {
			text: RichText[];
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
			quote: RichText[];
			name_of_the_author: RichText[];
			portrait_author: Asset;
		};
	};
}
