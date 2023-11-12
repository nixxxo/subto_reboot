import Layout from "../components/layout/Layout";
import { SessionProvider } from "next-auth/react";
import { GetUserByEmail, GetAllUsersGuilds } from "./api/prisma";
import { GetDiscordServers } from "./api/getDiscordServers";
import dynamic from "next/dynamic";
import "../styles/globals.css";
import { useRouter } from "next/router";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import DiscordServerProvider from "@utils/contexts/DiscordServerProvider";
import DiscordServersProvider from "@utils/contexts/DiscordServerProvider";
import DashboardNavbar from "@components/navbarDashboard";

const pagesWithoutLayout = ["/dashboard"];
const pagesWithDashboard = ["/dashboard"];
// import getAccessToken from "../utils/paypal/getAccessToken";
// import generateSignUpLink from "@utils/paypal/generateSignUpLink";
// import checkOnboardingStatus from "@utils/paypal/checkOnboardingStatus";
import DashboardProvider from "@utils/contexts/DashboardProvider";
// getAccessToken()
// 	.then((res) => console.log(res))
// 	.catch((err) => console.log(err));

// generateSignUpLink("asdfasdfasdfasdf")
// 	.then((res) => console.log(res))
// 	.catch((err) => console.log(err));

// checkOnboardingStatus()
// 	.then((res) => console.log(res))
// 	.catch((err) => console.log(err));

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const router = useRouter();
	return (
		<SessionProvider session={session}>
			<div className="absolute">
				<NextNProgress color="rgba(240, 138, 93, 1)" />
			</div>
			{!pagesWithoutLayout.some((page) => router.asPath.includes(page)) ? (
				<Layout>
					{/* DynamicComponentWithNoSSR  */}
					<Component {...pageProps} />
				</Layout>
			) : pagesWithDashboard.some((page) => router.asPath.includes(page)) ? (
				<DashboardProvider>
					<Component {...pageProps} />
				</DashboardProvider>
			) : (
				// </DashboardProvider>
				<Component {...pageProps} />
			)}
		</SessionProvider>
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

export default MyApp;
