import { QuoteSlice, TextSlice } from '@prismic-slices';
import { Asset, Document, LinkedData } from '@prismic-types';
import { RichTextBlock } from 'prismic-reactjs';
import { CategoryModel } from './CategoryModel';
import { HashtagModel } from './HashtagModel';
import { MemberModel } from './MemberModel';

export type PostModel = {
	title: RichTextBlock[];
	author: LinkedData<MemberModel>;
	categories: [{ category: LinkedData<CategoryModel> }];
	hashtags: [{ hashtag: LinkedData<HashtagModel> }];
	body: (TextSlice | QuoteSlice)[];
	from_date: string | null;
	to_date: string | null;
	location: string | null;
	thumbnail: Asset;
};

export type PostDocument = Document<PostModel>;

export const postQuery = `{
  post {
    ...postFields
    author {
      ...authorFields
    }
    categories {
      category {
        ...categoryFields
      }
    }
    hashtags {
      hashtag {
        ...hashtagFields
      }
    }
  }
}`;
