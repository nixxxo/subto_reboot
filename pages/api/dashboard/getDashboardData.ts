import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Joi from "joi";
import { Prisma } from "@prisma/client";
import prismaClient from "@utils/db/prismaClient";
const {
	paypalOrder,
	stripeOrder,
	user,
	product,
	stripeProductSubscription,
	discordServer,
} = prismaClient;

export default async function getCustomers(
	req: NextApiRequest,
	res: NextApiResponse
) {
	//check for auth
	const session = await getSession({ req });
	if (!session) return res.status(401).send("Unauthorized");

	const userProducts = await product.findMany({
		where: {
			discord_server: {
				users: {
					some: {
						email: session.user.email,
					},
				},
			},
		},
	});
	const productIds = userProducts.map((p) => p.id);

	// extract data for req
	async function getTotalCustomers() {
		return await user.count({
			where: {
				stripeOrders: {
					some: {
						product_id: {
							in: productIds,
						},
					},
				},
				paypalOrders: {
					some: {
						productId: {
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
		});
	}

	async function getTotalSubscriptions() {
		return await stripeProductSubscription.count({
			where: {
				status: "active",
				current_period_end: {
					gt: Math.floor(Date.now() / 1000),
				},
				user: {
					email: session.user.email,
				},
			},
		});
	}

	async function getGrossEarnings() {
		async function getPaypalOrders() {
			return await paypalOrder.findMany({
				where: {
					productId: {
						in: productIds,
					},
				},
			});
		}
		async function getStripeOrders() {
			return await stripeOrder.findMany({
				where: {
					product_id: {
						in: productIds,
					},
				},
			});
		}
		async function getSubscriptions() {
			return await stripeProductSubscription.findMany({
				where: {
					product_id: {
						in: productIds,
					},
				},
			});
		}
		const [paypalOrders, stripeOrders, subscriptions] = await Promise.all([
			getPaypalOrders(),
			getStripeOrders(),
			getSubscriptions(),
		]);
		const paypalEarnings = getArraySum(
			paypalOrders.map((order) => order.grossProductPrice)
		);
		const stripeEarnings = getArraySum(
			stripeOrders.map((order) => order.amount_captured)
		);
		const subsciptionEarnings = getArraySum(
			subscriptions.map((s) => s.total_revenue_generated)
		);
		return paypalEarnings + stripeEarnings + subsciptionEarnings;
	}

	async function getTotalCancels() {
		return await stripeProductSubscription.count({
			where: {
				status: "canceled",
				current_period_end: {
					lt: Math.floor(Date.now() / 1000),
				},
				user: {
					email: session.user.email,
				},
			},
		});
	}

	const [totalCustomers, totalSubscriptions, totalCancels, grossEarnings] =
		await Promise.all([
			getTotalCustomers(),
			getTotalSubscriptions(),
			getTotalCancels(),
			getGrossEarnings(),
		]);

	return res
		.status(200)
		.json({ totalCustomers, totalSubscriptions, totalCancels, grossEarnings });
}

function getArraySum(array: number[]) {
	const sum = array.reduce((partialSum, a) => partialSum + a, 0);
	return sum;
}
