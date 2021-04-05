import { Asset } from "@prismic-types";
import { RichTextBlock } from "prismic-reactjs";

export type MemberModel = {
  uid: string;
  is_active: boolean;
  title: RichTextBlock[];
  positions: [{ position: string }];
  thumbnail: Asset;
};
