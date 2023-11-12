import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Joi from "joi";
import { prisma, Prisma } from "@prisma/client";
import prismaClient from "@utils/db/prismaClient";
import addNewProduct from "@utils/db/product/addNew";
const { product } = prismaClient;

export default async function deleteProduct2(
	req: NextApiRequest,
	res: NextApiResponse
) {
	//check for auth
	const session = await getSession({ req });
	if (!session) return res.status(401).send("Unauthorized");

	// extract data for req
	const data = req.body as Prisma.ProductSelect;
	const productId = req.query.id;
	const { error, value } = schema.validate(data);
	if (error) {
		let resToSend = error.details.map((d) => d.message).join(". ");
		return res.status(400).send(resToSend);
	}

	let existingProduct = await product.findFirst({
		where: {
			discord_server_db_id: data.discord_server_db_id as unknown as string,
			id: Number(productId),
		},
		include: {
			discord_server: {
				include: {
					users: {
						where: {
							email: session.user.email,
						},
					},
				},
			},
		},
	});
	if (!existingProduct || !existingProduct.discord_server.users.length) {
		return res.status(400).send("Product not found");
	}
	await deleteProduct({ id: productId });

	return res.status(200).send("");
}

const schema = Joi.object({
	discord_server_db_id: Joi.string().required(),
});

async function deleteProduct({ id }) {
	return await product.delete({
		where: {
			// discord_server_db_id: data.discord_server_db_id,
			id: Number(id),
		},
	});
}
