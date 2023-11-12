import { PrismaClient } from "@prisma/client";

function getPrismaClient(): PrismaClient {
	if (process.env.NODE_ENV === "production") {
		return new PrismaClient();
	} else {
		if (!global.prisma) {
			global.prisma = new PrismaClient();
		}

		return global.prisma;
	}
}
const prismaClient = getPrismaClient();

export default prismaClient;
