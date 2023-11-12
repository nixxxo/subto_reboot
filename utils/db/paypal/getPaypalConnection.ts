import prisma from "../prismaClient";

const { paypalConnection } = prisma;

export default async function getPaypalConnection({ discord_server_db_id }) {
	if (!discord_server_db_id) return Promise.reject("No user id provided");
	let connection = await paypalConnection.findUnique({
		where: {
			discord_server_db_id,
		},
	});
	return connection;
}
