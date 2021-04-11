import { Asset, Document } from '@prismic-types';
import { RichTextBlock } from 'prismic-reactjs';

export type CategoryModel = {
	uid: string;
	title: string;
	description: RichTextBlock[] | null;
	thumbnail: Asset;
};

export const categoryQuery = `{
  category {
    ...categoryFields
  }
}`;

export type CategoryDocument = Document<CategoryModel>;
