import prisma from "@utils/db/prismaClient";

// export let prisma;

// if (process.env.NODE_ENV === "production") {
// 	prisma = new PrismaClient();
// } else {
// 	if (!global.prisma) {
// 		global.prisma = new PrismaClient();
// 	}

// 	prisma = global.prisma;
// }

export async function ClearDatabase() {
	await prisma.user.deleteMany({});
	return true;
}

// * GUILD ACTIONS

export async function CheckGuildExist(guild_id) {
	const guild = await prisma.discordServer.findMany({
		where: {
			serverId: String(guild_id),
		},
	});

	return guild;
}

export async function AddGuild(user, guild_id, guild_name, icon_str) {
	var image_link;
	if (icon_str === null) {
		image_link = `https://cdn.discordapp.com/embed/avatars/0.png`;
	} else {
		const format = icon_str.startsWith("a_") ? "gif" : "png";
		image_link = `https://cdn.discordapp.com/icons/${guild_id}/${icon_str}.${format}`;
	}
	const check = await CheckGuildExist(guild_id);
	if (check.length == 0) {
		const guild = await prisma.discordServer.create({
			data: {
				serverId: guild_id,
				name: guild_name,
				users: {
					connect: { id: user.id },
				},
				icon: image_link,
			},
		});
	} else {
		const guild = await prisma.discordServer.update({
			where: { serverId: guild_id },
			data: {
				serverId: guild_id,
				name: guild_name,
				users: {
					connect: { id: user.id },
				},
				icon: image_link,
			},
		});
	}
}

export async function RemoveGuild(user_id, guild_id) {
	const guild = await prisma.discordServer.deleteMany({
		where: {
			serverId: guild_id,
			users: {
				some: {
					id: user_id,
				},
			},
		},
	});
}
export async function RemoveUserFromGuild(user_id, guild_id) {
	const guild = await prisma.discordServer.update({
		where: {
			serverId: guild_id,
			users: {
				some: {
					id: user_id,
				},
			},
		},
		data: {
			users: {
				disconnect: { id: user_id },
			},
		},
	});
}

export async function GetAllUsersGuilds(user_id) {
	const guilds = await prisma.discordServer.findMany({
		where: {
			users: {
				some: {
					id: user_id,
				},
			},
		},
	});

	return guilds;
}

// * GETTING USERS BY CRITERIA

export async function GetUserByEmail(user_email) {
	const user = await prisma.user.findMany({
		where: {
			email: user_email,
		},
	});
	return user[0];
}

export async function GetUserByDiscordID(id) {
	const user = await prisma.account.findUnique({
		where: {
			providerAccountId: id,
		},
	});
	return user;
}
