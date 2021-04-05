import { Result } from "@api-response";
import MainLayout from "@layouts/MainLayout";
import {
  PostDocument,
  PostModel,
  postQuery,
} from "@lib/prismic/models/PostModel";
import { Document } from "@prismic-types";
import Prismic from "@prismicio/client";
import { PMclient } from "@root/prismic-configuration";
import { isString, tryParseLocale } from "@utils/validate-utils";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { RichText } from "prismic-reactjs";
import React from "react";
import "twin.macro";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function Post({ data, error, isPreviewMode }: Props) {
  if (error) {
    return <h1>Something went wrong</h1>;
  }

  if (!data) {
    return <h2>Loading</h2>;
  }

  return (
    <MainLayout
      title={RichText.asText(data.data.title)}
      isPreviewMode={isPreviewMode}
    >
      dsad
    </MainLayout>
  );
}

type StaticProps = Result<Document<PostModel>> & {
  isPreviewMode: boolean;
};

type Params = {
  uid: string;
};
export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
  params,
  locale,
  preview,
}) => {
  const uid = params?.uid;
  const isPreviewMode = preview ?? false;

  if (!uid) {
    return {
      props: {
        data: null,
        error: {
          message: "Missing uid",
        },
        isPreviewMode,
      },
    };
  }

  const post = (await PMclient.getByUID("post", uid, {
    graphQuery: postQuery,
    lang: tryParseLocale(locale),
  })) as Document<PostModel>;

  if (!post) {
    return {
      props: {
        data: null,
        error: { message: "Post not found" },
        isPreviewMode,
      },
    };
  }

  return {
    props: {
      data: post,
      error: null,
      isPreviewMode,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const response = await PMclient.query(
    Prismic.Predicates.at("document.type", "post"),
    { graphQuery: postQuery }
  );

  const uids = response.results
    .map((result: PostDocument) => result.uid)
    .filter(isString);
  const paths = uids.map((uid) => ({ params: { uid } }));

  return {
    paths,
    fallback: true,
  };
};
export default Post;
