declare module '@prismic-types' {
	import { Language } from '@data/localization-data';
	import { Document } from '@prismicio/client/types/documents';
	import { RichTextBlock } from 'prismic-reactjs';
	type CustomType =
		| 'post'
		| 'member'
		| 'category'
		| 'hashtag'
		| 'page'
		| 'about-us';

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

	type LinkEmbed = {
		type: 'link';
		embed_url: string;
		prover_name: string;
		thumbnail_url: string;
		version: string;
		url: string;
		html: string;
	};

	type VideoEmbed = {
		type: 'video';
		embed_url: string;
		provider_name: string;
		thumbnail_url: string;
		provider_url: string;
		author_name: string;
		author_url: string;
		height: number;
		width: number;
		version: string;
		thumbnail_height: number;
		thumbnail_width: number;
		html: string;
	};

	type RichEmbed = {
		type: 'rich';
		embed_url: string;
		title: string | null;
		provider_name: string; // Spotify
		thumbnail_url: string;
		provider_url: string;
		html: string;
		width: number;
		height: number;
		version: string;
		thumbnail_width: number;
		thumbnail_height: number;
		author_name?: string;
	};

	type Embed = {
		type: 'embed';
		oembed: RichEmbed | LinkEmbed | VideoEmbed;
	};

	type OList = RichTextBlock;
	type UList = RichTextBlock;

	type List = OList | UList;

	type OListItem = RichTextBlock;
	type UListItem = RichTextBlock;

	type ListItem = OListItem | UListItem;
}
