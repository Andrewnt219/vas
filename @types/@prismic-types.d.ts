declare module "@prismic-types" {
  import { Language } from "@data/localization-data";
  import { Document } from "@prismicio/client/types/documents";

  type CustomType = "post" | "member" | "category" | "hashtag";

  type LinkedItem = Pick<Document, "id" | "tags" | "slug" | "uid"> & {
    type: CustomType;
    lang: Language;
    link_type: "Document";
    isBroken: boolean;
  };

  type LinkedData<T> = LinkedItem & {
    data: T;
  };

  type Asset = {
    dimensions: {
      width: number;
      height: number;
    };
    alt: string | null;
    copyright: string | null;
    url: string;
  };

  type Document<T> = Omit<Document, "data"> & {
    data: T;
  };
}
