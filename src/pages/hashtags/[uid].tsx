/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */

import { Result } from "@common";
import MainLayout from "@components/pages/MainLayout";
import { HashtagDocument } from "@lib/prismic/component-types/hashtag/HashtagModel";
import { PrismicResult } from "@lib/prismic/prismic-service";
import {
  createStaticError,
  createStaticProps,
  errorStatcPropsHandler,
} from "@src/server/utils/page-utils";
import { wrapper } from "@styles/spacing";
import { tryParseLocale } from "@utils/validate-utils";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import PagePostCards from "@components/lists/PagePostCards/PagePostCards";
import { HashtagDataService } from "@src/server/services/hashtag-data-service";
import { Post, PostService } from "@src/server/services/post-service";
import { fonts } from "@styles/_typographyStyles";
import PageBanner from "@components/common/PageBanner/PageBanner";

type Data = {
  postResults: PrismicResult<Post>;
  hashtagUID: string;
  hashtagDoc: HashtagDocument;
};

type StaticProps = Result<Data>;

type Params = {
  uid: string;
};

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
  locale,
  params,
  previewData = {},
}) => {
  try {
    const { ref = "" } = previewData as { ref: string | undefined };
    const lang = tryParseLocale(locale);
    const hashtagUID = params?.uid;
    if (!hashtagUID) {
      return createStaticError("Hashtag Uid is missing");
    }
    const hashtagDoc = await HashtagDataService.getHashtagByUID(
      hashtagUID,
      lang,
      {
        ref,
      }
    );

    if (!hashtagDoc) {
      return createStaticError("Hashtag is missing");
    }
    const postResults = await PostService.getPostsByHashtagID(
      hashtagDoc.id,
      lang,
      {
        ref,
      }
    );

    return createStaticProps({ hashtagUID, hashtagDoc, postResults });
  } catch (error) {
    return errorStatcPropsHandler(error);
  }
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const hashtagDocs = await HashtagDataService.getHashtags("en-us");

  const paths = hashtagDocs.map((doc) => ({
    params: { uid: doc.uid ?? "" },
    locale: doc.lang,
  }));

  return {
    paths,
    fallback: true,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function HashtagUID({ data, error }: Props) {
  if (error) {
    return <h1>{error?.message}</h1>;
  }

  if (!data) {
    return <h1>Fetching posts...</h1>;
  }
  const { hashtagDoc, postResults } = data;
  return (

    <MainLayout title={hashtagDoc.data.title} tw="">

    {postResults.results.length == 0 ? (
      <h1 tw="grid-p-sm">Come back later for interesting articles</h1>
    ) : (
      <section tw="grid-p-sm">
        <h1 css={fonts.h3} tw="text-center mb-6">{hashtagDoc.data.title}</h1>
        <PagePostCards posts={postResults.results} />
      </section>
    )}
  </MainLayout>
  );
}

export default HashtagUID;
