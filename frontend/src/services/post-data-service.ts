import { Post } from '@prisma/client';
import { Db } from './db';

export class PostDataService {
	private static table = Db.get().post;
	public static insert(postId: string): Promise<Post | undefined> {
		return Db.handleService(async () => {
			const post = await this.table.create({
				data: { id: postId },
			});

			return post;
		});
	}
	public static increaseViews(postId: string): Promise<number | undefined> {
		return Db.handleService(async () => {
			const post = await this.table.upsert({
				where: { id: postId },
				update: { views: { increment: 1 } },
				create: { id: postId },
			});

			return post.views;
		});
	}
}
