import { Prisma } from "@prisma/client";
import prisma from "@utils/db/prismaClient";
import stripe from "@utils/stripe/index";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import getRawBody from "raw-body";
import Stripe from "stripe";
import { GetUserByEmail } from "../prisma";

const {
	discordServer,
	stripeProductSubscription,
	stripeOrder,
	stripeSubscriptionSession,
} = prisma;

export default async function linkStripe(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const rawBody = await getRawBody(req);
	req.body = rawBody;

	let event = req.body;

	const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

	if (endpointSecret) {
		const signature = req.headers["stripe-signature"];
		try {
			event = stripe.webhooks.constructEvent(
				req.body,
				signature,
				endpointSecret
			);
		} catch (err) {
			console.log(`⚠️  Webhook signature verification failed.`, err.message);
			return res.status(400).send("");
		}
	}

	let subscription: Stripe.Subscription;
	let metadata;

	async function handleSubtoSubscriptionModification() {
		subscription = event.data.object;
		const { discord_server_db_id } = subscription.metadata;
		let stripeSubscriptionSession = await retrieveStripeSubscriptionSession({
			discord_server_db_id,
		});
		const { status, current_period_end, current_period_start } = subscription;
		await updateStripeSubscriptionSession({
			discord_server_db_id,
			data: {
				status,
				current_period_end,
				current_period_start,
			},
		});
		console.log(status);
		if (status === "active") {
			await updateDiscordServerPlan({
				discord_server_db_id: stripeSubscriptionSession.discord_server_db_id,
				plan: 1,
			});
		} else if (status === "canceled") {
			await updateDiscordServerPlan({
				discord_server_db_id: stripeSubscriptionSession.discord_server_db_id,
				plan: 2,
			});
		} else if (status === "past_due") {
			await updateDiscordServerPlan({
				discord_server_db_id: stripeSubscriptionSession.discord_server_db_id,
				plan: 2,
			});
		}
	}

	async function handleProductSubscriptionModification() {
		subscription = event.data.object;
		const { userId, productId } = subscription.metadata;
		const { status, current_period_end, current_period_start } = subscription;

		const priceArray = subscription.items.data.map((item) => {
			return item.price.unit_amount * item.quantity;
		});
		const price = priceArray.reduce((partialSum, a) => partialSum + a, 0);

		// update one
		await stripeProductSubscription.updateMany({
			where: {
				user_id: userId,
				product_id: Number(productId),
			},
			data: {
				total_revenue_generated: {
					increment: price,
				},
				status,
				current_period_end,
				current_period_start,
			},
		});
	}

	function handleSubtoSubsriptionUpdated() {
		handleSubtoSubscriptionModification();
	}
	function handleSubtoSubsriptionCancelled() {
		handleSubtoSubscriptionModification();
	}

	switch (event.type) {
		case "customer.subscription.deleted":
			subscription = event.data.object;
			metadata = subscription.metadata;
			if (metadata.type === "subto_subscription") {
				handleSubtoSubsriptionCancelled();
			} else if (metadata.type === "product_subscription") {
				handleProductSubscriptionModification();
			}

			break;
		case "customer.subscription.created":
			console.log("Subscription created");
			// handleSubsriptionCreated();
			break;
		case "customer.subscription.updated":
			// console.log(event.data.object);
			subscription = event.data.object;
			metadata = subscription.metadata;
			// console.log("Subscription updated!");
			if (metadata.type === "subto_subscription") {
				handleSubtoSubsriptionUpdated();
			} else if (metadata.type === "product_subscription") {
				handleProductSubscriptionModification();
			}
			break;
		case "charge.succeeded":
			console.log("Works for subscriptions as well!");
			// const charge = stripe.charges.list()
			const payment = event.data.object as Stripe.Charge;
			const { type, productId, userId } = payment.metadata;

			const {
				id,
				amount,
				amount_captured,
				application_fee_amount,
				balance_transaction,
				receipt_url,
				captured,
				created,
				customer,
				paid,
				payment_intent,
			} = payment;

			if (type === "onetime") {
				console.log("Onetime payment");
				// update one
				await stripeOrder.create({
					data: {
						user_id: userId,
						product_id: Number(productId),
						payment_intent: payment_intent.toString(),
						stripeId: id,
						amount,
						amount_captured,
						application_fee_amount,
						balance_transaction: balance_transaction.toString() as any,
						receipt_url,
						captured,
						created,
						customer: customer.toString(),
						paid,
					},
				});
			} else {
				console.log("payment of subsciption");
			}

			break;
		case "invoide.paid":
			let invoice = event.data.object as Stripe.Invoice;
			if (invoice && invoice.subscription) {
				metadata = subscription.metadata;
				// console.log("Subscription updated!");
				if (metadata.type === "subto_subscription") {
					handleSubtoSubsriptionUpdated();
				} else if (metadata.type === "product_subscription") {
					handleProductSubscriptionModification();
				}
			}

			break;
		default:
			console.log(`Unhandled event type ${event.type}.`);
	}
	// Return a 200 response to acknowledge receipt of the event
	res.send("");
}

async function updateDiscordServerPlan({
	discord_server_db_id,
	plan,
}: {
	discord_server_db_id: string;
	plan: number;
}) {
	const server = await discordServer.update({
		where: {
			id: discord_server_db_id,
		},
		data: {
			plan,
		},
	});
	console.log("Updated Plan!");
	return server;
}

export const config = {
	api: {
		bodyParser: false,
	},
};

async function retrieveStripeSubscriptionSession({ discord_server_db_id }) {
	return await stripeSubscriptionSession.findUnique({
		where: {
			discord_server_db_id,
		},
	});
}
async function updateStripeSubscriptionSession({
	discord_server_db_id,
	data,
}: {
	data: Prisma.StripeSubscriptionSessionUpdateInput;
	discord_server_db_id: string;
}) {
	return await stripeSubscriptionSession.update({
		where: {
			discord_server_db_id,
		},
		data,
	});
}
