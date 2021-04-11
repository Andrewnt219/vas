import { Asset, Document } from '@prismic-types';
import { RichTextBlock } from 'prismic-reactjs';

export type MemberModel = {
	uid: string;
	is_active: boolean;
	title: string;
	description: RichTextBlock[] | null;
	positions: [{ position: string }];
	thumbnail: Asset;
	linked_in: string | null;
};

export type MemberDocument = Document<MemberModel>;
export const memberQuery = `{
  member {
    ...memberFields
  }
}`;
