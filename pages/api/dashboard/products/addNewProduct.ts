import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Prisma } from "@prisma/client";
import prismaClient from "@utils/db/prismaClient";
import addNewProduct from "@utils/db/product/addNew";
import productSchema from "@utils/validators/productSchema";

const { discordServer } = prismaClient;

export default async function addNewProduct2(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });
	if (!session) return res.status(401).send("Unauthorized");

	// extract data for req
	const data = req.body as Prisma.ProductSelect;
	const { error, value } = productSchema.validate(data);
	if (error) {
		let resToSend = error.details.map((d) => d.message).join(". ");
		return res.status(400).send(resToSend);
	}

	const userDiscordServer = await discordServer.findUnique({
		where: {
			id: data.discord_server_db_id as unknown as string,
		},
		include: {
			stripe: true,
		},
	});

	if (!userDiscordServer)
		return res.status(400).send("Discord server not found");

	const newProduct = await addNewProduct(data);

	return res.status(200).json(newProduct);
}
