import DashboardNavbar from "../../../components/navbarDashboard";
import { getSession, useSession } from "next-auth/react";
import { GetUserByEmail, GetAllUsersGuilds } from "../../api/prisma";
import CheckAuthentication from "../../api/auth/authChecker";
import { GetDiscordServers } from "../../api/getDiscordServers";

export default function Coupons({ discordServers }) {
	return (
		<CheckAuthentication
			content={
				<DashboardNavbar
					discordServers={discordServers}
					insideStructure={
						<>
							<h1 className="text-5xl text-blue-600">Coupons</h1>
						</>
					}
				></DashboardNavbar>
			}
		/>
	);
}

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);

	if (session != null) {
		const userEmail = session.user.email;
		const user = await GetUserByEmail(userEmail);
		const guilds = await GetAllUsersGuilds(user.id);
		var discordServers = await GetDiscordServers(guilds);
		// console.log(discordServers);
		return {
			props: {
				discordServers: discordServers,
			},
		};
	} else {
		return {
			props: {
				discordServers: "error",
			},
		};
	}
}
