import prismaClient from "../prismaClient";

const { stripeConnection } = prismaClient;

// account is string
//user_id is string

export default async function createStripeConnectionInDB({
	discord_server_db_id,
	account_id,
}) {
	return await stripeConnection.create({
		data: {
			discord_server_db_id,
			account: account_id,
		},
	});
}
