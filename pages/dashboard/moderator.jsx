import { getSession, useSession } from "next-auth/react";
import { GetUserByEmail, GetAllUsersGuilds } from "../api/prisma";
import DashboardNavbar from "../../components/navbarDashboard";
import CheckAuthentication from "../api/auth/authChecker";
import { GetDiscordServers } from "../api/getDiscordServers";
import { Tab } from "@headlessui/react";
import { DashboardBreadcrumb } from "../../components/breadcrumb";
import DashboardProvider from "@utils/contexts/DashboardProvider";
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Moderator({ discordServers }) {
	return (
		// <DashboardProvider>
		// 	{" "}
		<div className="w-full">
			<Tab.Group>
				<Tab.List className="flex p-1 space-x-1 bg-slate-300 rounded-xl">
					<Tab
						className={({ selected }) =>
							classNames(
								"transition-all duration-100 w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg",
								"focus:outline-none focus:ring-2 ring-offset-2 ring-offset-orange-300 ring-white ring-opacity-10",
								selected
									? "bg-white shadow text-slate-900"
									: " hover:bg-slate-400/100 hover:text-white"
							)
						}
					>
						Embeds
					</Tab>
					<Tab
						className={({ selected }) =>
							classNames(
								"transition-all duration-100 w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg",
								"focus:outline-none focus:ring-2 ring-offset-2 ring-offset-orange-300 ring-white ring-opacity-10",
								selected
									? "bg-white shadow text-slate-900"
									: " hover:bg-slate-400/100 hover:text-white"
							)
						}
					>
						Staff
					</Tab>
					<Tab
						className={({ selected }) =>
							classNames(
								"transition-all duration-100 w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg",
								"focus:outline-none focus:ring-2 ring-offset-2 ring-offset-orange-300 ring-white ring-opacity-10",
								selected
									? "bg-white shadow text-slate-900"
									: " hover:bg-slate-400/100 hover:text-white"
							)
						}
					>
						Reports
					</Tab>
					<Tab
						className={({ selected }) =>
							classNames(
								"transition-all duration-100 w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg",
								"focus:outline-none focus:ring-2 ring-offset-2 ring-offset-orange-300 ring-white ring-opacity-10",
								selected
									? "bg-white shadow text-slate-900"
									: " hover:bg-slate-400/100 hover:text-white"
							)
						}
					>
						Commands
					</Tab>
				</Tab.List>
				<Tab.Panels className="mt-2">
					<Tab.Panel
						className={classNames(
							"bg-white rounded-xl p-3",
							"focus:outline-none focus:ring-2 ring-offset-2 ring-offset-orange-400 ring-white ring-opacity-60"
						)}
					>
						<h1>Send Custom Embeds</h1>
						<h1>Edit Embeds for Roles, Kick, Ban, Moderation</h1>
					</Tab.Panel>
					<Tab.Panel
						className={classNames(
							"bg-white rounded-xl p-3",
							"focus:outline-none focus:ring-2 ring-offset-2 ring-offset-orange-400 ring-white ring-opacity-60"
						)}
					>
						<h1>Staff DB</h1>
						<h1>Message Counter + Staff Activity</h1>
						<h1>Affiliate Invite counter</h1>
					</Tab.Panel>
					<Tab.Panel
						className={classNames(
							"bg-white rounded-xl p-3",
							"focus:outline-none focus:ring-2 ring-offset-2 ring-offset-orange-400 ring-white ring-opacity-60"
						)}
					>
						<h1>Accounting</h1>
						<h1>Member activity</h1>
						<h1>Members that dont pay and etc</h1>
					</Tab.Panel>
					<Tab.Panel
						className={classNames(
							"bg-white rounded-xl p-3",
							"focus:outline-none focus:ring-2 ring-offset-2 ring-offset-orange-400 ring-white ring-opacity-60"
						)}
					>
						<h1>what commands are there</h1>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
		// </DashboardProvider>
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
