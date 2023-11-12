import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import getStripeConnection from "@utils/db/stripe/getStripeConnection";
import {
	createStripeConnectionAccount,
	getStripeAccountLink,
} from "@utils/stripe";
import { GetUserByEmail } from "../prisma";
import createStripeConnectionInDB from "@utils/db/stripe/createStripeConnection";
import prisma from "@utils/db/prismaClient";
export default async function linkStripe(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });
	if (!session) return res.status(401).send("Unauthorized");

	const { discordServerId } = req.body;
	const user = await GetUserByEmail(session.user.email);
	// console.log(user);
	const discordServer = await getDiscordServer(discordServerId, user.id);
	if (!discordServer || discordServer.users.length === 0) {
		return res.status(400).send("No discord server found");
	}

	const userId = user.id;
	const stripeConnection = await getStripeConnection(discordServer.id);
	if (stripeConnection && stripeConnection.details_submitted) {
		return res.status(400).send("Already established connection with Stripe");
	} else {
		console.log(stripeConnection);
		let account =
			(stripeConnection && stripeConnection.account) ||
			(await createStripeConnectionAccount(user.email)).id;
		if (!stripeConnection) {
			await createStripeConnectionInDB({
				discord_server_db_id: discordServer.id,
				account_id: account,
			});
		}

		const link = await getStripeAccountLink({
			account,
			discord_server_db_id: discordServer.id,
		});
		return res.status(200).send(link);
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
