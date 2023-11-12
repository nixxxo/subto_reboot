import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { GetUserByEmail } from "../prisma";
import prisma from "@utils/db/prismaClient";
const { stripeConnection, paypalConnection } = prisma;

export default async function unlinkProcessor(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });
	if (!session) return res.status(401).send("Unauthorized");

	const user = await prisma.user.findUnique({
		where: {
			email: session.user.email,
		},
		include: {
			servers: {
				include: {
					stripe: true,
					paypal: true,
				},
			},
		},
	});

	let stripeConnections = user.servers
		.map((server) => server.stripe)
		.filter(Boolean);
	let paypalConnections = user.servers
		.map((server) => server.paypal)
		.filter(Boolean);

	return res.status(200).send({ stripeConnections, paypalConnections });
}
