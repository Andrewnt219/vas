import { Response } from '@api-response';
import { PostWihMeta } from '@common';
import { DEFAULT_LANGUAGE } from '@data/localization-data';
import { CategorySlug } from '@lib/sanity/models/CategoryModel';
import { PostModel } from '@lib/sanity/models/PostModel';
import { PostDataService } from '@services/post-data-service';
import {
	GetStaticPaths,
	GetStaticProps,
	NextApiRequest,
	NextApiResponse,
} from 'next';
import { isValidCategorySlug, isValidLocale } from './validate-utils';

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

	const post = await PostDataService.getPostBySlug(params.slug);
	if (!post) {
		return {
			props: {
				data: null,
				error: { message: 'Post not found' },
			},
		};
	}

	const categorySlug = post.categories[0]?.slug;
	if (!isValidCategorySlug(categorySlug)) {
		return {
			props: {
				data: null,
				error: { message: 'Unknown category' },
			},
		};
	}

	const fsPost = await PostDataService.getFsPost(post.slug);
	const relatedPosts = await PostDataService.getRelatedPost(
		post.slug,
		isValidLocale(locale) ? locale : DEFAULT_LANGUAGE
	);

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
) => GetStaticPaths<StaticPostParams> = (categorySlug) => async ({
	defaultLocale,
}) => {
	if (!isValidLocale(defaultLocale)) {
		return {
			paths: [],
			fallback: true,
		};
	}

	const slugs = await PostDataService.getPostSlugsByCategory(
		categorySlug,
		defaultLocale
	);

	const paths = slugs.map(({ slug }) => ({ params: { slug } }));

	return {
		paths,
		fallback: true,
	};
};

export function runMiddleware(
	req: NextApiRequest,
	res: NextApiResponse,
	fn: any
) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: unknown) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}
