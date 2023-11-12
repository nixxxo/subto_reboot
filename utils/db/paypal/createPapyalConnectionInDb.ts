import prisma from "../prismaClient";

const { paypalConnection } = prisma;

export default async function createPapyalConnectionInDb({
	discord_server_db_id,
	tracking_id,
}) {
	return await paypalConnection.create({
		data: {
			discord_server_db_id: String(discord_server_db_id),
			tracking_id: String(tracking_id),
		},
	});
}
