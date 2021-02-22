import { PrismaClient } from '@prisma/client';

export class Prisma {
	private static client: PrismaClient = new PrismaClient();

	public static wrapper<T>(main: () => Promise<T>): Promise<T | null> {
		return main()
			.catch((error) => {
				console.error(error);
				return null;
			})
			.finally(async () => {
				await Prisma.client.$disconnect();
			});
	}

	public static get() {
		return this.client;
	}
}
