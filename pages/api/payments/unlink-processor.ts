import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import getStripeConnection from "@utils/db/stripe/getStripeConnection";
import {
	createStripeConnectionAccount,
	getStripeAccountLink,
} from "@utils/stripe";
import { GetUserByEmail } from "../prisma";

import prisma from "@utils/db/prismaClient";

const { stripeConnection, paypalConnection } = prisma;

export default async function unlinkProcessor(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });
	if (!session) return res.status(401).send("Unauthorized");

	const { discordServerId, processor } = req.body;
	const user = await GetUserByEmail(session.user.email);
	// console.log(user);
	const discordServer = await getDiscordServer(discordServerId, user.id);
	if (!discordServer || discordServer.users.length === 0) {
		return res.status(400).send("No discord server found");
	}

	switch (processor) {
		case "paypal":
			await paypalConnection.delete({
				where: {
					discord_server_db_id: discordServerId,
				},
			});
			return res.status(200).send("");
			break;
		case "stripe":
			await stripeConnection.delete({
				where: {
					discord_server_db_id: discordServerId,
				},
			});
			return res.status(200).send("");

			break;
		default:
			return res.status(400).send("invalid paypment processor");
	}
}

async function getDiscordServer(id, user_id) {
	return await prisma.discordServer.findFirst({
		where: {
			id: id,
		},
		include: {
			users: {
				where: {
					id: user_id,
				},
			},
		},
	});
}
