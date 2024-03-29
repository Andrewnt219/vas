import { Asset, Document, LinkedData } from '@prismic-types';
import { RichTextBlock } from 'prismic-reactjs';
import { CategoryModel } from '../category/CategoryModel';
import { HashtagModel } from '../hashtag/HashtagModel';
import { MemberModel } from '../member/MemberModel';
import { PostSlice } from './slice/PostSliceZone/PostSliceZone';

export type PostModel = {
	title: string;
	author: LinkedData<MemberModel>;
	categories: [{ category: LinkedData<CategoryModel> }];
	hashtags: [{ hashtag: LinkedData<HashtagModel> }];
	body: PostSlice[];
	from_date: string | null;
	to_date: string | null;
	location: string | null;
	thumbnail: Asset;
	snippet: RichTextBlock[];
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
