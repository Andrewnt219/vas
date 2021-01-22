import { PrismaClient } from '@prisma/client';

export class Db {
	private static client: PrismaClient = new PrismaClient();

	public static handleService<T>(
		main: () => Promise<T>
	): Promise<T | undefined> {
		return main()
			.catch((error) => {
				console.error(error);
				return undefined;
			})
			.finally(async () => {
				await Db.client.$disconnect();
			});
	}

	public static get() {
		return this.client;
	}
}
