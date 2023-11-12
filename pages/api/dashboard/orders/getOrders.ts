import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Joi from "joi";
import { Prisma } from "@prisma/client";
import prismaClient from "@utils/db/prismaClient";
const { paypalOrder, stripeProductSubscription, stripeOrder, discordServer } =
	prismaClient;

export default async function getOrders(
	req: NextApiRequest,
	res: NextApiResponse
) {
	//check for auth
	const session = await getSession({ req });
	if (!session) return res.status(401).send("Unauthorized");

	// extract data for req
	const discord_server_db_id = req.query.db_id as string;
	if (!discord_server_db_id) return res.status(400).send("");

	async function getDiscordServer() {
		return await discordServer.findUnique({
			where: {
				id: discord_server_db_id,
			},
			include: {
				users: {
					where: {
						email: session.user.email,
					},
				},
			},
		});
	}

	async function getPaypalOrders() {
		return await paypalOrder.findMany({
			where: {
				status: "captured",
				product: {
					discord_server_db_id,
				},
			},
			include: {
				product: {
					select: {
						name: true,
					},
				},
			},
		});
	}

	async function getStripeOrders() {
		return await stripeOrder.findMany({
			where: {
				product: {
					discord_server_db_id,
				},
			},
			include: {
				product: {
					select: {
						name: true,
					},
				},
			},
		});
	}
	async function getStripeSubsciptions() {
		return await stripeProductSubscription.findMany({
			where: {
				product: {
					discord_server_db_id,
				},
			},
			include: {
				product: {
					select: {
						name: true,
					},
				},
			},
		});
	}

	const [discord_server, paypalOrderss, stripeOrderss, stripeSubscriptions] =
		await Promise.all([
			getDiscordServer(),
			getPaypalOrders(),
			getStripeOrders(),
			getStripeSubsciptions(),
		]);

	if (!discord_server.users.length) return res.status(401).send("Unauthorized");

	return res.status(200).json({
		paypal: paypalOrderss,
		stripe: stripeOrderss,
		stripeSubscriptions: stripeSubscriptions,
	});
}
