import prisma from "../prismaClient";

const { user } = prisma;

export default async function getUserDiscordServerCustomizations(userId) {
	const userResult = await user.findUnique({
		where: {
			id: userId,
		},
		include: {
			servers: {
				where: {},
				include: {
					customization: {},
				},
			},
		},
	});
	return userResult.servers.map((server) => server.customization);
}
