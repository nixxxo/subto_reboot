import prisma from "../prismaClient";

const { stripeConnection } = prisma;

export default async function getStripeConnectionsForUserDiscordServers(
	discord_server_ids
) {
	// if (!discord_server_db_id) return Promise.reject("No user id provided");
	return await stripeConnection.findMany({
		where: {
			discord_server_db_id: { in: discord_server_ids },
		},
	});
}
