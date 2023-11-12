import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
	AddGuild,
	CheckGuildExist,
	RemoveGuild,
	RemoveUserFromGuild,
	GetAllUsersGuilds,
} from "../prisma";

import prisma from "@utils/db/prismaClient";

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			return true;
		},
	},
	events: {
		async signIn(message) {
			const account = message.account;
			const user = message.user;
			const profile = message.profile;

			const access_token = account.access_token;

			// get user guilds from discord
			const response = await fetch(
				"https://discordapp.com/api/users/@me/guilds",
				{
					headers: {
						Authorization: "Bearer " + access_token,
						"Content-Type": "application/json",
					},
				}
			);
			const myJson = await response.json();

			if (!message.isNewUser) {
				// if the user is not new, delete guilds from database which the user has deleted on his/her discord app.
				const dbUsersServers = await GetAllUsersGuilds(user.id);

				var dbUsersServersIds = [];
				dbUsersServers.forEach((guild) => {
					dbUsersServersIds.push(guild.serverId);
				});

				var userJsonServerIds = [];
				myJson.forEach((guild) => {
					// console.log(guild.id)
					userJsonServerIds.push(guild.id);
				});

				if (dbUsersServersIds.length > userJsonServerIds.length) {
					dbUsersServersIds.forEach((id) => {
						if (userJsonServerIds.includes(id) == false) {
							RemoveUserFromGuild(user.id, id);
						}
					});
				}
			}

			return await Promise.all(
				myJson.map(async (guild) => {
					const check = await CheckGuildExist(user.id, guild.id);
					console.log(check);
					if (check.length == 0) {
						console.log(`# --- # === ${guild.name}`);
						return AddGuild(user, guild.id, guild.name, guild.icon);
					} else {
						return Promise.resolve();
						console.log(`# +++ # === ${guild.name}`);
					}
				})
			);
		},
	},
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			authorization: { params: { scope: "identify guilds email" } },
			profile(profile) {
				// set profile avatar
				if (profile.avatar === null) {
					const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
					profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
				} else {
					const format = profile.avatar.startsWith("a_") ? "gif" : "png";
					profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
				}
				return {
					id: profile.id,
					name: profile.username,
					email: profile.email,
					image: profile.image_url,
				};
			},
		}),
		// ...add more providers here
	],
	database: process.env.DATABASE_URL,
	secret: process.env.SECRET_KEY_OPENSSL,
	debug: false,
});
