import prisma from "../prismaClient";

const { paypalConnection } = prisma;

export default async function getPaypalConnectionsForUserDiscordServers(
	discord_server_ids
) {
	// if (!discord_server_db_id) return Promise.reject("No user id provided");
	return await paypalConnection.findMany({
		where: {
			discord_server_db_id: { in: discord_server_ids },
		},
	});
}
