import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Prisma } from "@prisma/client";
import createStripeConnectionInDB from "@utils/db/stripe/createStripeConnection";
import prismaClient from "@utils/db/prismaClient";

import createOrder from "@utils/paypal/createOrder";
import createSubscription from "@utils/paypal/createSubscription";
import createPlan from "@utils/paypal/createPlan";
import createProduct from "@utils/paypal/createProduct";
const { product, paypalOrder } = prismaClient;

export default async function createSubscription2(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// const session = await getSession({ req });
	// if (!session) return res.status(401).send("Unauthorized");

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
	console.log("About to create product");
	const createdProduct = await createProduct({
		merchant_id,
		product_name: productDetails.name,
		request_id: Date.now(),
	});
	console.log({ createdProduct });
	console.log("About to create plan");

	const createdPlan = await createPlan({
		merchant_id,
		planName: productDetails.name,
		request_id: Date.now(),
		product_id: createdProduct.id,
	});
	console.log({ createdPlan });

	const createdSubscription = await createSubscription({
		cancel_url: "https://facebook.com/cancel",
		merchant_id,
		return_url: "https://meowchat.club",
		price: productDetails.price,
		request_id: Date.now(),
		plan_id: createdPlan.id,
	});

	// console.log({ createdSubscription });
	const { links } = createdSubscription;
	const link = links.find((link) => link.rel === "approve");
	return res.status(200).send(link.href);
}
