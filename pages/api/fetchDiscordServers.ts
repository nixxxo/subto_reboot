import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { GetAllUsersGuilds, GetUserByEmail } from "./prisma";
import { GetDiscordServers } from "./getDiscordServers";
import prisma from "@utils/db/prismaClient";

const { discordServer } = prisma;

export default async function fetchDiscordServers(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });

	if (session != null) {
		const userEmail = session.user.email;
		const user = await GetUserByEmail(userEmail);
		const guilds = await discordServer.findMany({
			where: {
				users: {
					some: {
						id: user.id,
					},
				},
			},
			include: {
				paypal: true,
				stripe: true,
			},
		});
		// console.log(guilds, typeof guilds);
		return res.send(guilds);
	}
	return res.status(401).send("Unauthorized");
}
