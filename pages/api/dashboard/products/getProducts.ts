import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Joi from "joi";
import { Prisma } from "@prisma/client";
import prismaClient from "@utils/db/prismaClient";
import addNewProduct from "@utils/db/product/addNew";
const { product, user } = prismaClient;

export default async function addNewProduct2(
	req: NextApiRequest,
	res: NextApiResponse
) {
	//check for auth
	const session = await getSession({ req });
	if (!session) return res.status(401).send("Unauthorized");

	// extract data for req
	const discord_server_db_id = req.query.db_id;
	if (!discord_server_db_id) return res.status(400).send("");
	const userResult = await user.findUnique({
		where: {
			email: session.user.email,
		},

		include: {
			servers: {
				where: {
					id: discord_server_db_id as string,
				},

				include: {
					prodcuts: {},
				},
			},
		},
	});
	if (!userResult.servers[0]) return res.status(400).send("Server not found!");
	const products = userResult.servers[0].prodcuts;
	return res.status(200).json(products);
}
