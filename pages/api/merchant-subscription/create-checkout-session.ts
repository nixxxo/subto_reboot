import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { GetUserByEmail } from "../prisma";
import prisma from "@utils/db/prismaClient";
import stripe from "@utils/stripe/index";
import Stripe from "stripe";
// import getDiscordServer from "@utils/db/getDiscordServer";
import { Prisma } from "@prisma/client";

const getPriceForSubscription = getPriceForSubscriptionCreator();

export default async function createCheckoutSession(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const sessionAuth = await getSession({ req });
	if (!sessionAuth) return res.status(401).send("Unauthorized");

	const discordServerId = req.query.discord_server_id as string;
	const user = await GetUserByEmail(sessionAuth.user.email);

	console.log(req.query);

	if (!discordServerId) {
		console.log("No discord server Id provided");
		return res.status(400).send("No discord server Id provided");
	}

	// fetch discord server
	const discordServer = await getDiscordServer({
		id: discordServerId,
	});

	if (!discordServer) return res.status(400).send("Discord Server not found");
	// console.log(discordServer.users);

	if (!discordServer.users.some((u) => u.email === user.email)) {
		return res
			.status(401)
			.send("User does not have access to this discord server");
	}
	const { stripeSubscriptionSession } = discordServer;
	if (
		stripeSubscriptionSession &&
		stripeSubscriptionSession.status === "active"
	) {
		console.log("Plan already active");
		return res.status(400).send("Plan already active");
	}
	// const cutsomer = (await createCustomer({ email: sessionAuth.user.email })).id;
	const session = await stripe.checkout.sessions.create({
		billing_address_collection: "auto",
		line_items: [
			{
				// price: prices.data[0].id,
				price: (await getPriceForSubscription()).id,
				// For metered billing, do not pass quantity
				quantity: 1,
			},
		],
		// customer: cutsomer,

		subscription_data: {
			metadata: {
				discord_server_db_id: discordServerId,
				type: "subto_subscription",
			},
		},

		mode: "subscription",
		success_url: `${process.env.BASE_URL}/dashboard/settings?did_set_stripe_connection=true&session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.BASE_URL}/dashboard/settings?did_not_set_stripe_connection=true`,
	});
	// console.log(session);
	// console.log({
	// 	discordServerId,
	// 	customerId: session.customer,
	// 	session_Id: session.id,
	// });

	await Promise.all([
		createStripeSession({
			// customerId: session.customer,
			discord_server_db_id: discordServerId,
			session_Id: session.id,
		}),
		// updateDiscordServerPlan({ id: discordServerId }),
	]);

	// session.
	res.status(200).send(session.url);
	// res.redirect(session.url);
}

function getPriceForSubscriptionCreator() {
	const subscriptionProductId = "subscription-product-id-1234;fkjl";
	const priceLookupKey = "price-lookup-key-12341234";

	let product;
	let price: Stripe.Price | undefined;
	return async function () {
		if (!price) {
			product = await getProduct();
			if (!product) {
				product = await createProduct();
			}
			price = await getPrice();
			if (!price) {
				price = await createPrice(product);
			}
		}
		return price;
	};

	async function getProduct() {
		const products = await stripe.products.list({
			ids: [subscriptionProductId],
		});
		return products[0];
	}

	async function createProduct() {
		const product = await stripe.products.create({
			name: "Subto Subscription",
		});
		return product;
	}
	async function createPrice(product: Stripe.Product) {
		const price = await stripe.prices.create({
			unit_amount: Number(process.env.SUBTO_SUBSCRIPTION_COST),
			lookup_key: priceLookupKey,
			currency: "usd",
			recurring: { interval: "month" },
			product: product.id,
		});
		return price;
	}

	async function getPrice() {
		const prices = await stripe.prices.list({
			lookup_keys: [priceLookupKey],
			// expand: ["data.product"],
		});
		let price = prices.data[0];
		return price;
	}
}

const { discordServer, stripeSubscriptionSession } = prisma;

async function getDiscordServer({ id }: { id: string }) {
	const server = await discordServer.findUnique({
		where: {
			id,
		},
		include: { users: {}, stripeSubscriptionSession: {} },
	});
	return server;
}

async function createStripeSession({
	session_Id,
	discord_server_db_id,
	// customerId,
}) {
	return await stripeSubscriptionSession.upsert({
		where: {
			discord_server_db_id,
		},
		update: {
			discord_server_db_id,
			session_Id,
			// customerId,
		},
		create: {
			discord_server_db_id,
			session_Id,
			// customerId,
		},
	});
}

async function createCustomer({ email }) {
	const customer = await stripe.customers.create({
		email,
	});
	return customer;
}
