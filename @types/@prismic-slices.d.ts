declare module "@prismic-slices" {
  import { Asset, RichText } from "@prismic-types";
  type TextSlice = {
    slice_type: "text";
    slice_label: null;
    items: unknown[];
    primary: {
      text: RichText[];
    };
  };

  type QuoteSlice = {
    slice_type: "quote";
    slice_label: null;
    items: unknown[];
    primary: {
      quote: RichText[];
      name_of_the_author: RichText[];
      portrait_author: Asset;
    };
  };
}
