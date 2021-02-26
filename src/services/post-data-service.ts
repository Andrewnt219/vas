import { GetPostResponse, IncreaseViewResponse } from '@api-response';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class PostDataService {
	private static postApi: AxiosInstance = axios.create({
		baseURL: '/api/posts/',
	});

	public static increaseViews(
		slug: string
	): Promise<AxiosResponse<IncreaseViewResponse>> {
		return this.postApi.patch<IncreaseViewResponse>('/increaseView', {
			slug: slug,
		});
	}

	public static getPost(slug: string): Promise<AxiosResponse<GetPostResponse>> {
		return this.postApi.get<GetPostResponse>(`/${slug}`);
	}
}
