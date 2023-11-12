import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma, Prisma } from "@prisma/client";
import prismaClient from "@utils/db/prismaClient";
import addNewProduct from "@utils/db/product/addNew";
const { product } = prismaClient;
import Stripe from "stripe";
import productSchema from "@utils/validators/productSchema";

export default async function updateProduct2(
	req: NextApiRequest,
	res: NextApiResponse
) {
	//check for auth
	const session = await getSession({ req });
	if (!session) return res.status(401).send("Unauthorized");

	// extract data for req
	const data = req.body as Prisma.ProductSelect;
	const productId = req.query.id;
	const { error, value } = productSchema.validate(data);
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
					stripe: true,
				},
			},
		},
	});
	const { discord_server } = existingProduct;
	if (!existingProduct || !discord_server.users.length) {
		return res.status(400).send("Product not found");
	}

	const updatedProduct = await updateProduct({ id: productId, data });

	return res.status(200).json(updatedProduct);
}

async function updateProduct({ id, data }) {
	return await product.update({
		where: {
			// discord_server_db_id: data.discord_server_db_id,
			id: Number(id),
		},
		data,
	});
}
