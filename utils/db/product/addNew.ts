import prismaClient from "@utils/db/prismaClient";

const { product } = prismaClient;

export default async function addNewProduct(data) {
	return await product.create({
		data,
	});
}
