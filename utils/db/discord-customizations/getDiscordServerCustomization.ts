import prisma from "../prismaClient";

const { discordServerCustomization } = prisma;

export default async function getDiscordServerCustomization(
	discordServerId: string
) {
	const customization = await discordServerCustomization.findFirst({
		where: {
			discordServerId,
		},
	});
	return customization;
}

export async function getDiscordServerCustomizationFromId(id: string) {
	const customization = await discordServerCustomization.findFirst({
		where: {
			id,
		},
	});
	return customization;
}
