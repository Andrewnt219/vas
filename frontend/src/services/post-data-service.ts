import axios from 'axios';

export class PostDataService {
	public static async increaseViews(slug: string): Promise<number | undefined> {
		const { data } = await axios.patch<number | undefined>(
			'/api/posts/increaseViews',
			{
				slug,
			}
		);

		return data;
	}
	public static async getPost(slug: string): Promise<any | undefined> {
		const { data } = await axios.get<any | undefined>(`/api/posts/${slug}`);

		return data;
	}
}
