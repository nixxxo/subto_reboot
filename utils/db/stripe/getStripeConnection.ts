import prisma from "../prismaClient";

const { stripeConnection } = prisma;

export default async function getStripeConnection(discord_server_db_id) {
	if (!discord_server_db_id) return Promise.reject("No user id provided");
	return await stripeConnection.findUnique({
		where: {
			discord_server_db_id,
		},
	});
}
