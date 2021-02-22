import { Post } from '@prisma/client';
import { Prisma } from '@src/lib/prisma';

export class PostDataService {
	private static postDt = Prisma.get().post;
	public static increaseViews(slug: string): Promise<Post | null> {
		return Prisma.wrapper(async () => {
			const post = await this.postDt.upsert({
				where: { slug },
				update: { views: { increment: 1 } },
				create: { slug },
			});

			return post;
		});
	}
	public static getPost(slug: string): Promise<Post | null> {
		return Prisma.wrapper(async () => {
			const post = await this.postDt.findFirst({ where: { slug } });

			return post;
		});
	}
}
