import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { GetUserByEmail } from "../prisma";
import prisma from "@utils/db/prismaClient";
import stripe from "@utils/stripe/index";

import { Prisma } from "@prisma/client";
const { discordServer, stripeSubscriptionSession } = prisma;

export default async function linkStripe(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const sessionAuth = await getSession({ req });
	if (!sessionAuth) return res.status(401).send("Unauthorized");

	const discordServerId = req.query.discord_server_id;

	const discordServer = await getDiscordServer({
		id: discordServerId as string,
	});

	if (!discordServer) return res.status(400).send("Discord Server not found");
	// console.log(discordServer.users);

	if (!discordServer.users.some((u) => u.email === sessionAuth.user.email)) {
		return res
			.status(401)
			.send("User does not have access to this discord server");
	}
	const { stripeSubscriptionSession } = discordServer;
	if (!stripeSubscriptionSession || !stripeSubscriptionSession.session_Id) {
		console.log("Session not there");
		return res.status(400).send("Session not there");
	}

	const session_id = stripeSubscriptionSession.session_Id;
	const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

	// This is the url to which the customer will be redirected when they are done
	// managing their billing with the portal.
	const returnUrl = process.env.BASE_URL + "/dashboard/settings";

	const portalSession = await stripe.billingPortal.sessions.create({
		customer: checkoutSession.customer as any,
		return_url: returnUrl,
	});

	res.status(200).send(portalSession.url);
}

async function getDiscordServer({ id }: { id: string }) {
	const server = await discordServer.findUnique({
		where: {
			id,
		},
		include: { users: {}, stripeSubscriptionSession: {} },
	});
	return server;
}
