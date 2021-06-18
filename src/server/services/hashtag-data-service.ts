import { Language } from "@data/localization-data";
import firestore from "@lib/firestore/firestore";
import {
  HashtagDocument,
  hashtagQuery,
} from "@lib/prismic/component-types/hashtag/HashtagModel";
import {
  defaultQueryOptionsFactory,
  Predicates,
} from "@lib/prismic/prismic-helpers";
import { QueryOptions } from "@prismicio/client/types/ResolvedApi";
import { PMclient } from "@root/prismic-configuration";

export class HashtagDataService {
  private static collection = firestore.collection("hashtags");
  private static cms = PMclient;

  public static async getHashtags(lang: Language): Promise<HashtagDocument[]> {
    const query = Predicates.at("document.type", "hashtag");
    const options = getDefaultQuery(lang);

    return (await this.cms.query(query, options)).results as HashtagDocument[];
  }

  public static async getHashtagByUID(
    hashtagUID: string,
    lang: Language,
    options: QueryOptions = { ref: '' }
  ): Promise<HashtagDocument | null> {
    const hashtagDocs: HashtagDocument[] = await this.getHashtagsByUIDs(
      [hashtagUID],
      lang,
      options
    );

    return hashtagDocs[0] ?? null;
  }

  public static async getHashtagsByUIDs(
    hashtagUIDs: string[],
    lang: Language,
    options: QueryOptions = { ref: '' }
  ): Promise<HashtagDocument[]> {
    const queryOptions = getDefaultQuery(lang, options);
    const query = Predicates.in('my.hashtag.uid', hashtagUIDs);

    const hashtagDocs: HashtagDocument[] = (
      await this.cms.query(query, queryOptions)
    ).results;


    if (hashtagDocs.length !== hashtagUIDs.length) {
      throw new Error("Mismatch results' size and search's size");
    }

    return hashtagDocs;
  }
}

const getDefaultQuery = defaultQueryOptionsFactory(hashtagQuery);
