import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Prisma } from "@prisma/client";
import createStripeConnectionInDB from "@utils/db/stripe/createStripeConnection";
import prismaClient from "@utils/db/prismaClient";
// import stripe from "@utils/stripe/index";
import Stripe from "stripe";

import captureOrder from "@utils/paypal/captureOrder";
import { GetUserByEmail } from "pages/api/prisma";
const { product, stripeProductSubscription } = prismaClient;

export default async function captureOrder2(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const sessionAuth = await getSession({ req });
	if (!sessionAuth) return res.status(401).send("Unauthorized");
	const user = await GetUserByEmail(sessionAuth.user.email);

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
					stripe: true,
				},
			},
		},
	});
	if (!productDetails) return res.status(400).send("Product not found");

	const stripeDetails = productDetails.discord_server.stripe;

	if (!stripeDetails) return res.status(400).send("No paypal account found!");

	const plan = productDetails.discord_server.plan;
	const platformTakeout = plan === 1 ? 3 : 5;
	const platformCharge = Math.ceil(
		(productDetails.price * platformTakeout) / 100
	);
	const stripe = new Stripe(process.env.STRIPE_API_PRIVATE_KEY, {
		stripeAccount: stripeDetails.account,
		apiVersion: "2020-08-27",
	});

	const stripeProduct = await stripe.products.create({
		name: productDetails.name,
	});
	const billingFrequency = productDetails.billingFrequency;
	let stripePrice = await stripe.prices.create({
		unit_amount: productDetails.price,
		currency: "usd",
		// recurring: { interval: "month" },
		...(billingFrequency === "recurring_monthly" && {
			recurring: { interval: "month" },
		}),
		product: stripeProduct.id,
	});

	const session = await stripe.checkout.sessions.create(
		{
			line_items: [
				{
					price: stripePrice.id,
					quantity: 1,
				},
			],

			mode: billingFrequency === "onetime" ? "payment" : "subscription",
			success_url: `${process.env.BASE_URL}/${productDetails.discord_server_db_id}?stripe-payment-status=success`,
			cancel_url: `${process.env.BASE_URL}/${productDetails.discord_server_db_id}?stripe-payment-status=failure`,
			...(billingFrequency === "onetime"
				? {
						payment_intent_data: {
							application_fee_amount: platformCharge,
						},
				  }
				: {
						subscription_data: {
							application_fee_percent: platformTakeout,
						},
				  }),

			...(billingFrequency !== "onetime"
				? {
						subscription_data: {
							metadata: {
								productId: productDetails.id,
								type: "product_subscription",
								userId: user.id,
							},
						},
				  }
				: {
						payment_intent_data: {
							metadata: {
								productId: productDetails.id,
								userId: user.id,
								type: "onetime",
							},
						},
				  }),
			// metadata: {
			// 	productId: productDetails.id,
			// },
		},
		{
			stripeAccount: stripeDetails.account,
		}
	);
	if (billingFrequency === "recurring_monthly") {
		await stripeProductSubscription.create({
			data: {
				session_Id: session.id,
				user_id: user.id,
				product_id: productDetails.id,
			},
		});
	}
	console.log(session);

	// console.log(session.payment_intent);
	return res.status(200).send(session.url);
}
