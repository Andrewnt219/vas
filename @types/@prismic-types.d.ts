declare module '@prismic-types' {
	import { Language } from '@data/localization-data';
	import { Document } from '@prismicio/client/types/documents';

	type CustomType = 'post' | 'member' | 'category' | 'hashtag' | 'page';

	type LinkedItem = Pick<Document, 'id' | 'tags' | 'slug' | 'uid'> & {
		link_type: 'Document';
		type: CustomType;
		lang: Language;
		isBroken: boolean;
	};

	type LinkedData<T> = LinkedItem & {
		data: T;
	};

	type WebHyperlink = {
		link_type: 'Web';
		url: string;
	};
	type MediaHyperlink = {
		link_type: 'Media';
		name: string; // asset's name
		kind: string; // asset's type
		url: string; // link to asset
		size: string; // in kB
		height: string; // just number
		width: string; // just number
	};
	type DocumentHyperlink = LinkedItem;

	type Hyperlink = WebHyperlink | MediaHyperlink | DocumentHyperlink;

	type Asset = {
		dimensions: {
			width: number;
			height: number;
		};
		alt: string | null;
		copyright: string | null;
		url: string;
	};

	type Document<T> = Omit<Document, 'data'> & {
		data: T;
	};
}
