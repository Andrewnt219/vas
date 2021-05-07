import { Language } from '@data/localization-data';
import firestore from '@lib/firestore/firestore';
import {
  CategoryDocument,
  categoryQuery,
} from '@lib/prismic/component-types/category/CategoryModel';
import {
  defaultQueryOptionsFactory,
  LanguageOption,
  Predicates,
} from '@lib/prismic/prismic-helpers';
import { QueryOptions } from '@prismicio/client/types/ResolvedApi';
import { PMclient } from '@root/prismic-configuration';
import { Post, PostService } from './post-service';

export class CategoryService {
  private static readonly collection = firestore.collection('categories');
  private static readonly cms = PMclient;

  /* -------------------------------------------------------------------------- */

  public static async getCategories(
    lang: LanguageOption
  ): Promise<CategoryDocument[]> {
    const options = getQueryOptions(lang);
    const query = Predicates.at('document.type', 'category');

    return (await this.cms.query(query, options)).results as CategoryDocument[];
  }

  public static async getCategoryByUID(
    categoryUID: string,
    lang: Language,
    options: QueryOptions = { ref: '' }
  ): Promise<CategoryDocument | null> {
    const categoryDocs: CategoryDocument[] = await this.getCategoriesByUIDs(
      [categoryUID],
      lang,
      options
    );

    return categoryDocs[0] ?? null;
  }

  public static async getCategoriesByUIDs(
    categoryUIDs: string[],
    lang: Language,
    options: QueryOptions = { ref: '' }
  ): Promise<CategoryDocument[]> {
    const queryOptions = getQueryOptions(lang, options);
    const query = Predicates.in('my.category.uid', categoryUIDs);

    const categoryDocs: CategoryDocument[] = (
      await this.cms.query(query, queryOptions)
    ).results;

    if (categoryDocs.length !== categoryUIDs.length) {
      throw new Error("Mismatch results' size and search's size");
    }

    return categoryDocs;
  }

  public static async getCategoriesWithPosts(
    lang: Language
  ): Promise<CategoryWithPosts[]> {
    const categoryDocs = await this.getCategories(lang);

    const getCategoryWithPosts = async (
      categoryDoc: CategoryDocument
    ): Promise<CategoryWithPosts> => {
      const posts = await PostService.getPostsByCategoryID(
        categoryDoc.id,
        lang
      );

      return { ...categoryDoc, posts };
    };

    return Promise.all(categoryDocs.map(getCategoryWithPosts));
  }
}

export type CategoryWithPosts = CategoryDocument & { posts: Post[] };
const getQueryOptions = defaultQueryOptionsFactory(categoryQuery);
