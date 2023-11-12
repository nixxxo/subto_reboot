import prisma from "../prismaClient";

const { discordServerCustomization } = prisma;

export default async function updateDiscordServerCustomization(
	discordServerId: string,
	updates
) {
	const customization = await discordServerCustomization.upsert({
		where: {
			discordServerId,
		},
		update: {
			...updates,
		},
		create: {
			...updates,
		},
	});
	return customization;
}
