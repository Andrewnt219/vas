import { Response } from '@api-response';
import { PostWihMeta } from '@common';
import { CategorySlug } from '@lib/sanity/models/CategoryModel';
import { PostModel } from '@lib/sanity/models/PostModel';
import { LocaleDataService } from '@services/locale-data-service';
import { PostDataService } from '@services/post-data-service';
import { GetStaticPaths, GetStaticProps } from 'next';
import { isValidCategorySlug } from './validate-utils';

type StaticPostProps = Response<{
	post: PostWihMeta;
	relatedPosts: PostModel[];
}>;
type StaticPostParams = {
	slug: string;
};
export const getStaticPost: GetStaticProps<
	StaticPostProps,
	StaticPostParams
> = async ({ params, locale }) => {
	if (!params?.slug) {
		return {
			props: {
				data: null,
				error: { message: 'Missing slug' },
			},
		};
	}

	LocaleDataService.setLocale(locale);
	const post = await PostDataService.getPostBySlug(params.slug);

	if (!post) {
		return {
			props: {
				data: null,
				error: { message: 'Post not found' },
			},
		};
	}

	const fsPost = await PostDataService.getFsPost(post.slug);

	let relatedPosts: PostModel[] = [];
	const categorySlug = post.categories[0]?.slug;

	if (isValidCategorySlug(categorySlug)) {
		relatedPosts = await PostDataService.getPostsByCategory(categorySlug);
	}

	return {
		props: {
			data: {
				post: { ...post, ...fsPost },
				relatedPosts,
			},
			error: null,
		},
		revalidate: 60,
	};
};

export const getStaticPostsPathsByCategory: (
	categorySlug: CategorySlug
) => GetStaticPaths<StaticPostParams> = (categorySlug) => async () => {
	const slugs = await PostDataService.getPostSlugsByCategory(categorySlug);

	const paths = slugs.map(({ slug }) => ({ params: { slug } }));

	return {
		paths,
		fallback: true,
	};
};
