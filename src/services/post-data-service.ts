import {
	GetPostResponse as GetPostMetaResponse,
	IncreaseViewResponse,
} from '@api-response';
import { SanityClient } from '@sanity/client';
import { PostModel, postModelQuery } from '@src/models/PostModel';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

type Languages = 'en-US' | 'vi-VN';

export class PostDataService {
	private static api: AxiosInstance = axios.create({
		baseURL: '/api/posts/',
	});

	private static client: SanityClient | null = null;
	private static language: Languages = 'en-US';

	public static switchLanguage(lang: Languages) {
		this.language = lang;
	}
	public static async getPostBySlug(slug: string) {
		return this.withFetch<PostModel | null>(
			`*[_type == 'post' && slug.current == $slug && _lang == $lang   ] ${postModelQuery}[0]`,
			{ slug, lang: this.language }
		);
	}

	public static async getPosts() {
		return this.withFetch<PostModel[]>(
			`*[_type == 'post' && _lang == $lang] ${postModelQuery}`,
			{ lang: this.language }
		);
	}

	public static async getPostSlugs() {
		return this.withFetch<{ slug: string }[]>(
			`*[_type == 'post' && _lang = $lang] {
					"slug": slug.current
			}`,
			{ lang: this.language }
		);
	}

	public static increaseViews(
		slug: string
	): Promise<AxiosResponse<IncreaseViewResponse>> {
		return this.api.patch<IncreaseViewResponse>('/increaseView', {
			slug: slug,
		});
	}

	public static getPostMeta(
		slug: string
	): Promise<AxiosResponse<GetPostMetaResponse>> {
		return this.api.get<GetPostMetaResponse>(`/${slug}`);
	}

	//#region private helpers
	// dynamically import the client (reduce initial bundle)
	private static async setup() {
		try {
			PostDataService.client = (
				await import('@lib/sanity')
			).localizedSanityClient;
		} catch (error) {
			console.error('Fail to import sanity client');
		}
	}

	// Wrapper for services
	private static async withFetch<T>(
		query: string,
		params: Record<string, any> = {}
	): Promise<T> {
		const client = await PostDataService.getClient();

		if (!client) {
			throw new Error('Sanity client is not set up!');
		}

		return client.fetch<T>(query, params);
	}

	// return the sanity client
	private static async getClient() {
		if (!PostDataService.client) {
			await PostDataService.setup();
		}

		return PostDataService.client;
	}
	//#endregion
}
