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

const { paypalConnection, stripeConnection, discordServer, user } = prisma;

export default async function updatePaymentProcessor(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });
	if (!session) return res.status(401).send("Unauthorized");

	const { discordServerId, enabled, processor } = req.body;
	// const userResult = await user.findFirst({
	// 		where: {
	// 			email: session.user.email,
	// 			servers: {
	// 				some: {
	// 					id: discordServerId,
	// 				},
	// 			},
	// 		},
	// });
	const discord_server = await discordServer.findFirst({
		where: {
			id: discordServerId,
			users: {
				some: {
					email: session.user.email,
				},
			},
		},
		include: {
			paypal: true,
			stripe: true,
		},
	});
	if (!discord_server)
		return res.status(400).send("User or discord server not found");
	// console.log(user);
	const { paypal, stripe } = discord_server;

	switch (processor) {
		case "paypal":
			if (!paypal)
				return res
					.status(400)
					.send("Paypal needs to be linked before it is enabled for checked");
			await paypalConnection.update({
				where: {
					discord_server_db_id: discordServerId,
				},
				data: {
					enabled,
				},
			});
			return res.status(200).send("");
			break;
		case "stripe":
			if (!stripe)
				return res
					.status(400)
					.send("Stripe needs to be linked before it is enabled for checked");
			await stripeConnection.update({
				where: {
					discord_server_db_id: discordServerId,
				},
				data: {
					enabled,
				},
			});
			return res.status(200).send("");
			break;
		default:
			break;
	}
}
