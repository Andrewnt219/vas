import { Language } from '@data/localization-data';
import firestore from '@lib/firestore/firestore';
import {
  MemberDocument,
  memberQuery,
} from '@lib/prismic/component-types/member/MemberModel';
import {
  defaultQueryOptionsFactory,
  LanguageOption,
  Predicates,
} from '@lib/prismic/prismic-helpers';
import { QueryOptions } from '@prismicio/client/types/ResolvedApi';
import { PMclient } from '@root/prismic-configuration';
export class AuthorDataService {
  private static collection = firestore.collection('authors');
  private static cms = PMclient;

  public static async getAuthors(
    lang: LanguageOption
  ): Promise<MemberDocument[]> {
    const options = getDefaultQuery(lang);
    const query = Predicates.at('document.type', 'member');

    return (await this.cms.query(query, options)).results as MemberDocument[];
  }

  public static async getActiveAuthors(
    lang: Language
  ): Promise<MemberDocument[]> {
    const options = getDefaultQuery(lang);
    const query = [
      Predicates.at('document.type', 'member'),
      Predicates.at('my.member.is_active', true),
    ];

    return (await this.cms.query(query, options)).results as MemberDocument[];
  }

  public static async countAuthors(lang: Language): Promise<number> {
    return (await this.getAuthors(lang)).length;
  }

  public static async getAuthorByUID(
    lang: Language,
    authorUid: string,
    options?:QueryOptions
  ) : Promise<MemberDocument> {
    const queryOptions = getDefaultQuery(lang, options);
    return this.cms.getByUID('member', authorUid, queryOptions);
     
  }

  public static async countActiveAuthors(lang: Language): Promise<number> {
    return (await this.getActiveAuthors(lang)).length;
  }
}

const getDefaultQuery = defaultQueryOptionsFactory(memberQuery);
