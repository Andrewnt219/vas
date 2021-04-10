import { Asset, Document } from '@prismic-types';
import { RichTextBlock } from 'prismic-reactjs';

export type HashtagModel = {
	uid: string;
	title: string;
	description: RichTextBlock[] | null;
	thumbnail: Asset;
};

export type HashtagDocument = Document<HashtagModel>;

export const hashtagQuery = `{
  hashtag {
    ...hashtagFields
  }
}`;
