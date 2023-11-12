export async function GetDiscordServers(guilds) {
	var discordServers = [];

	guilds.forEach((guild) => {
		discordServers.push({
			id: guild.id,
			name: guild.name,
			unavailable: "false",
			image: guild.icon,
		});
	});

	return discordServers;
}
