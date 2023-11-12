import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { GetUserByEmail } from "../prisma";
import createStripeConnectionInDB from "@utils/db/stripe/createStripeConnection";
import prisma from "@utils/db/prismaClient";
import generateSignUpLink from "@utils/paypal/generateSignUpLink";
import getPaypalConnection from "@utils/db/paypal/getPaypalConnection";
import createPapyalConnectionInDb from "@utils/db/paypal/createPapyalConnectionInDb";
export default async function linkStripe(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });
	console.log(session);
	if (!session) return res.status(401).send("Unauthorized");

	const { discordServerId } = req.body;
	const user = await GetUserByEmail(session.user.email);
	// console.log(user);
	const discordServer = await getDiscordServer(discordServerId, user.id);
	if (!discordServer || discordServer.users.length === 0) {
		return res.status(400).send("No discord server found");
	}

	const userId = user.id;
	let paypalConnection = await getPaypalConnection({
		discord_server_db_id: discordServer.id,
	});
	if (paypalConnection && paypalConnection.payments_receivable) {
		return res.status(400).send("Already established connection with Paypal");
	} else {
		// console.log(stripeConnection);
		const tracking_id = `${userId}-${discordServer.id}`;

		if (!paypalConnection) {
			paypalConnection = await createPapyalConnectionInDb({
				discord_server_db_id: discordServer.id,
				tracking_id,
			});
			console.log(paypalConnection);
		} else {
			console.log("Paypal connection already there");
		}

		const link = await generateSignUpLink({
			tracking_id,
		});
		console.log(link);
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
