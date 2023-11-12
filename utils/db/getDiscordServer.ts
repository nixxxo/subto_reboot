import { Prisma } from "@prisma/client";
import prisma from "./prismaClient";

const { discordServer } = prisma;

export default async function getDiscordServer({
	id,
	include,
}: {
	id: string;
	include?: Prisma.DiscordServerInclude;
}) {
	const server = await discordServer.findUnique({
		where: {
			id,
		},
		include,
	});
	return server;
}
