import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Joi from "joi";
import { Prisma } from "@prisma/client";
import prismaClient from "@utils/db/prismaClient";
const { user, product, discordServer } = prismaClient;

export default async function getCustomers(
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

	const products = await product.findMany({
		where: {
			discord_server_db_id,
		},
	});
	const productIds = products.map((product) => product.id);
	const customers = await getCustomers();
	async function getCustomers() {
		return await user.findMany({
			where: {
				paypalOrders: {
					some: {
						productId: {
							in: productIds,
						},
					},
				},
				stripeOrders: {
					some: {
						product_id: {
							in: productIds,
						},
					},
				},
				stripeProductSubscriptions: {
					some: {
						product_id: {
							in: productIds,
						},
					},
				},
			},
			include: {
				paypalOrders: {
					where: {
						productId: {
							in: productIds,
						},
					},
				},
				stripeOrders: {
					where: {
						product_id: {
							in: productIds,
						},
					},
				},
				stripeProductSubscriptions: {
					where: {
						product_id: {
							in: productIds,
						},
					},
				},
			},
		});
	}

	const [discord_server] = await Promise.all([getDiscordServer()]);

	if (!discord_server.users.length) return res.status(401).send("Unauthorized");
	const newCustomers = customers.map((customer) => {
		const orders =
			customer.paypalOrders.length +
			customer.stripeOrders.length +
			customer.stripeProductSubscriptions.length;
		return {
			name: customer.name,
			email: customer.email,
			id: customer.id,
			orders,
		};
	});

	return res.status(200).json(newCustomers);
}
