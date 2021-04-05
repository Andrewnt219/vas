import { Asset } from "@prismic-types";
import { RichTextBlock } from "prismic-reactjs";

export type HashtagModel = {
  uid: string;
  title: RichTextBlock[];
  description: string;
  thumbnail: Asset;
};
