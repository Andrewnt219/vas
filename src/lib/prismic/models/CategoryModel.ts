import { Asset } from "@prismic-types";
import { RichTextBlock } from "prismic-reactjs";

export type CategoryModel = {
  uid: string;
  title: RichTextBlock[];
  description: string;
  thumbnail: Asset;
};
