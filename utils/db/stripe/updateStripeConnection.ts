import prismaClient from "../prismaClient";

const { stripeConnection } = prismaClient;

export default async function getStripeConnection(
	discord_server_db_id,
	updates
) {
	return await stripeConnection.update({
		where: {
			discord_server_db_id,
		},
		data: {
			...updates,
		},
	});
}
