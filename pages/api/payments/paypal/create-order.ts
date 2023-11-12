import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Prisma } from "@prisma/client";
import createStripeConnectionInDB from "@utils/db/stripe/createStripeConnection";
import prismaClient from "@utils/db/prismaClient";

import createOrder from "@utils/paypal/createOrder";
import { GetUserByEmail } from "pages/api/prisma";
const { product, paypalOrder } = prismaClient;
export default async function linkStripe(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });
	if (!session) return res.status(401).send("Unauthorized");

	const user = await GetUserByEmail(session.user.email);

	const data = req.body;
	if (!data || !data.product) {
		return res.status(400).send("Not product Id received");
	}
	let productId = data.product.id;

	const productDetails = await product.findUnique({
		where: {
			id: productId,
		},
		include: {
			discord_server: {
				include: {
					paypal: true,
				},
			},
		},
	});
	if (!productDetails) return res.status(400).send("Product not found");
	const paypalDetails = productDetails.discord_server.paypal;

	if (!paypalDetails) return res.status(400).send("No paypal account found!");

	const { merchant_id } = paypalDetails;
	const plan = productDetails.discord_server.plan;
	const platformTakeout = plan === 1 ? 3 : 5;
	const platformCharge = Math.ceil(
		(productDetails.price * platformTakeout) / 100
	);

	const createdPaypalOrder = await paypalOrder.create({
		data: {
			grossProductPrice: productDetails.price,
			productId: productDetails.id as any,
			status: "initialized",
			type: productDetails.billingFrequency,
			platformCharge,
			user_id: user.id,
		},
	});

	const id = await createOrder({
		productName: productDetails.name,
		sellerMerchantId: merchant_id,
		platform_fees: platformCharge,
		price: productDetails.price,
		orderId: createdPaypalOrder.id,
	});
	await paypalOrder.update({
		where: {
			id: createdPaypalOrder.id,
		},
		data: {
			paypalOrderId: id,
		},
	});
	return res.status(200).send(id);
}
