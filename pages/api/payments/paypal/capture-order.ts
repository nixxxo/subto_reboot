import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Prisma } from "@prisma/client";
import createStripeConnectionInDB from "@utils/db/stripe/createStripeConnection";
import prismaClient from "@utils/db/prismaClient";

import captureOrder from "@utils/paypal/captureOrder";
import { GetUserByEmail } from "pages/api/prisma";
const { product, paypalOrder } = prismaClient;

export default async function captureOrder2(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });
	if (!session) return res.status(401).send("Unauthorized");
	const data = req.body;
	if (!data || !data.product || !data.paypalOrderId) {
		return res.status(400).send("Not product or order Id received");
	}
	console.log(product, data.paypalOrderId);

	let productId = data.product.id;
	let paypalOrderId = data.paypalOrderId;

	//need to replace tih findUnique
	const order = await paypalOrder.findFirst({
		where: {
			paypalOrderId: paypalOrderId,
		},
	});
	if (!order || !order.id)
		return res.status(400).send("Order or orderId not found");

	const response = await captureOrder({
		orderId_paypal: paypalOrderId,
		orderId_db: order.id,
	});
	await paypalOrder.update({
		where: {
			id: order.id,
		},
		data: {
			status: "captured",
		},
	});

	return res.status(200).send("success");
}
