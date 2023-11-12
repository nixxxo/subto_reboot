/* eslint-disable jsx-a11y/alt-text */
import DashboardNavbar from "../../components/navbarDashboard";
import { getSession, useSession, signOut } from "next-auth/react";
import { GetUserByEmail, GetAllUsersGuilds } from "../api/prisma";
import CheckAuthentication from "../api/auth/authChecker";
import { GetDiscordServers } from "../api/getDiscordServers";
import { DashboardBreadcrumb } from "../../components/breadcrumb";

export default function Account({ discordServers }) {
	const { data: session } = useSession();

	return (
		<div>
			<DashboardBreadcrumb />
			<div className="flex flex-col sm:gap-4 items-center justify-around sm:flex-row w-full">
				<img className="rounded-full h-24 w-24" src={session.user.image} />
				<div className="flex-1 flex flex-col justify-around max-w-lg">
					<div className="my-1 sm:my-1.5 flex flex-col pointer-events-none ">
						<span className="ml-1 text-xs text-gray-400 uppercase">
							username
						</span>
						<span className="border-2 py-1.5 px-2.5 text-sm sm:text-base rounded-lg bg-white text-gray-500">
							{session.user.name}
						</span>
					</div>
					<div className="my-1 sm:my-1.5 flex flex-col pointer-events-none">
						<span className="ml-1 text-xs text-gray-400 uppercase">email</span>
						<span className="border-2 py-1.5 px-2.5 rounded-lg bg-white text-gray-500">
							{session.user.email}
						</span>
					</div>
				</div>
				<button
					className="text-white max-w-max mt-4 sm:m-0 flex-1 font-bold rounded-md text-base lg:text-2xl py-1 px-3 sm:py-1.5 lg:py-1.5 lg:px-6 bg-gradient-to-r from-red-500 via-orange-500 to-orange-400 transition-all duration-300 hover:scale-105"
					onClick={() => signOut({ callbackUrl: "/sign-in" })}
				>
					Sign Out
				</button>
			</div>
		</div>
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
