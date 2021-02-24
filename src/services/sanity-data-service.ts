import { SanityClient } from '@sanity/client';
import { PostModel, postModelQuery } from '@src/models/PostModel';

export class SanityDataService {
	private static client: SanityClient | null = null;

	private static async setup() {
		try {
			SanityDataService.client = (await import('@lib/sanity')).sanityClient;
		} catch (error) {
			console.error('Fail to import sanity client');
		}
	}

	private static async withFetch<T>(
		query: string,
		params: Record<string, any> = {}
	): Promise<T> {
		const client = await SanityDataService.getClient();

		if (!client) {
			throw new Error('Sanity client is not set up!');
		}

		return client.fetch<T>(query, params);
	}

	private static async getClient() {
		if (!SanityDataService.client) {
			await SanityDataService.setup();
		}

		return SanityDataService.client;
	}

	public static async getPostByPostId(postId: string) {
		return this.withFetch<PostModel | null>(
			`*[_type == 'post' && _id == $postId ] ${postModelQuery}[0]`,
			{ postId }
		);
	}

	public static async getPostBySlug(slug: string) {
		return this.withFetch<PostModel | null>(
			`*[_type == 'post' && slug.current == $slug ] ${postModelQuery}[0]`,
			{ slug }
		);
	}

	public static async getPosts() {
		return this.withFetch<PostModel[]>(`*[_type == 'post'] ${postModelQuery}`);
	}

	public static async getPostSlugs() {
		return this.withFetch<{ slug: string }[]>(
			`*[_type == 'post'] {
					"slug": slug.current
			}`
		);
	}
}
