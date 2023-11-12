import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "@utils/db/prismaClient";
import updateDiscordServerCustomization from "@utils/db/discord-customizations/updateDiscordServerCustomization";
import { Prisma } from "@prisma/client";
import { GetUserByEmail } from "../prisma";
import getDiscordServerCustomization from "@utils/db/discord-customizations/getDiscordServerCustomization";
import uploadImage from "@utils/cloudinary/uploadImage";

export default async function linkStripe(
	req: NextApiRequest,
	res: NextApiResponse
) {
	//check for auth
	const session = await getSession({ req });
	if (!session) return res.status(401).send("Unauthorized");

	// extract data for req
	const data = req.body as Prisma.DiscordServerCustomizationSelect;

	let isAccountNameAlreadyTakenP = accountNameAlreadyTaken(data.accountName);
	let isStoreLinkAlreadyTakenP = subtoLinkAlreadyTaken(data.storeLink);
	let userDiscordServersP = getUserDiscordServers(session.user.email);
	let [
		// isAccountNameAlreadyTaken,
		userDiscordServers,
		isStoreLinkAlreadyTaken,
	] = await Promise.all([
		// isAccountNameAlreadyTakenP,
		userDiscordServersP,
		isStoreLinkAlreadyTakenP,
	]);
	// if (
	// 	isAccountNameAlreadyTaken &&
	// 	isAccountNameAlreadyTaken.discordServerId !==
	// 		(data.discordServerId as unknown as string)
	// ) {
	// 	return res
	// 		.status(400)
	// 		.send("Account name is already taken. Please choose another ");
	// }
	if (
		isStoreLinkAlreadyTaken &&
		isStoreLinkAlreadyTaken.discordServerId !==
			(data.discordServerId as unknown as string)
	) {
		return res
			.status(400)
			.send("Store link is already taken. Please choose another ");
	}
	if (
		!userDiscordServers.find(
			(server) => server === (data.discordServerId as unknown as string)
		)
	) {
		// console.log(data.discordServerId, userDiscordServers);
		return res.status(400).send("Server not found");
	}
	// console.log(userDiscordServers, data);

	let coverURL, logoURL;

	// insert here (if not already there) so that there exist server and there is no error when uploadImages() function tries to retreive one to get its id
	try {
		await updateDiscordServerCustomization(
			data.discordServerId as unknown as string,
			{ discordServerId: data.discordServerId }
		);
	} catch (err) {}

	try {
		[coverURL, logoURL] = await handleImagesUpload({
			cover: data.cover,
			logo: data.logo,
			discordServerId: data.discordServerId,
			userEmail: session.user.email,
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send(
				"Oops something went wrong especially while uploading images, please try again later "
			);
	}
	try {
		const newCustomization = await updateDiscordServerCustomization(
			data.discordServerId as unknown as string,
			{ ...data, cover: coverURL, logo: logoURL }
		);
		return res.json(newCustomization);
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send(
				"Oops something went wrong especially while writing data to database, please try again later "
			);
	}
}

async function getUserDiscordServers(email) {
	let user = await prisma.user.findFirst({
		where: {
			email,
		},
		include: {
			servers: {},
		},
	});
	// user.servers.map((server) => server.serverId);
	return user.servers.map((server) => server.id);
}

async function accountNameAlreadyTaken(accountName) {
	if (!accountName) return false;
	return await prisma.discordServerCustomization.findFirst({
		where: {
			accountName: accountName,
		},
	});
}
async function subtoLinkAlreadyTaken(storeLink) {
	if (!storeLink) return false;
	return await prisma.discordServerCustomization.findFirst({
		where: {
			storeLink,
		},
	});
}

async function handleImagesUpload({ userEmail, discordServerId, logo, cover }) {
	const [user, discordServerCustomization] = await Promise.all([
		GetUserByEmail(userEmail),
		getDiscordServerCustomization(discordServerId),
	]);
	const userId = user.id;
	const discordServerCustomizationId = discordServerCustomization.id;

	async function uploadLogo() {
		const nameForLogo = `${userId}-${discordServerCustomizationId}-logo`;
		if (logo && logo !== discordServerCustomization.logo) {
			return await uploadImage({ imageStr: logo, public_id: nameForLogo });
		} else {
			return Promise.resolve();
		}
	}
	async function uploadCover() {
		const nameForCover = `${userId}-${discordServerCustomizationId}-cover`;
		if (cover && cover !== discordServerCustomization.cover) {
			return await uploadImage({ imageStr: cover, public_id: nameForCover });
		} else {
			return Promise.resolve();
		}
	}
	return await Promise.all([uploadCover(), uploadLogo()]);
}
export const config = {
	api: {
		bodyParser: {
			sizeLimit: "10mb", // Set desired value here
		},
	},
};
