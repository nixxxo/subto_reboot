import prisma from "../prismaClient";

const { paypalConnection } = prisma;

export default async function updatePaypalConnection({ tracking_id, updates }) {
	return await paypalConnection.update({
		where: {
			tracking_id,
		},
		data: {
			...(updates as any),
		},
	});
}
