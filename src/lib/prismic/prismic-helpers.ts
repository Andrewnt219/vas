import { Result } from "@api-response";
import { Document } from "@prismicio/client/types/documents";
import { PMclient } from "@root/prismic-configuration";
import axios from "axios";

export const linkResolver = (doc: Document) => {
  // TODO add doc.data.category
  if (doc.type === "post") {
    return `/post/${doc.uid}`;
  }

  return "/";
};

/* -------------------------------------------------------------------------- */

export const prismicFetch = async <T>(
  query: string,
  options: { previewData?: any; variables?: Record<string, any> } = {}
): Promise<Result<T>> => {
  try {
    const prismicAPI = await PMclient.getApi();
    const res = await axios.get<{ data: T }>(
      `https://vasseneca.prismic.io/graphql?query=${query}&variables=${JSON.stringify(
        options.variables
      )}`,
      {
        headers: {
          "Prismic-Ref": options.previewData?.ref || prismicAPI.masterRef.ref,
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.PRISMIC_VAS_ACCESS_TOKEN}`,
        },
      }
    );

    return { data: res.data.data, error: null };
  } catch (error) {
    console.log(error);

    return { data: null, error: { message: "Fail to fetch" } };
  }
};
