import { getSession } from "next-auth/react";
import { GetUserByEmail, GetAllUsersGuilds } from "../../api/prisma";
import getPaypalConnectionFromDB from "@utils/db/paypal/getPaypalConnection";

// import DashboardNavbar from "@components/navbarDashboard";
// import CheckAuthentication from "../../api/auth/authChecker";
import { GetDiscordServers } from "../../api/getDiscordServers";
// import { useState } from "react";
// import LinkCard from "@components/dashboard/LinkCard";
import { Tab } from "@headlessui/react";
import { TabItem, TabPanel } from "@components/Tabs";
import LinkStripeCard from "@components/dashboard/LinkStripeCard";
// import getStripeConnection from "@utils/db/getStripeConnection";
import updateStripeConnection from "@utils/db/stripe/updateStripeConnection";
import { DashboardBreadcrumb } from "@components/breadcrumb";
import { retrieveStripeConnectionAccount } from "@utils/stripe";
/** @jsxImportSource @emotion/react */
// import SelectedDiscordServerProvider from "@utils/contexts/DiscordServerProvider";
// import DiscordServersProvider from "@utils/contexts/DiscordServersProvider";
import DashboardProvider from "@utils/contexts/DashboardProvider";
import getStripeConnections from "@utils/db/stripe/getStripeConnections";
import { useDiscordServer } from "@utils/contexts/DiscordServerProvider";
import LinkPaypalCard from "@components/dashboard/LinkPaypalCard";
import getMerchantOnboardingStatusFromPaypal from "@utils/paypal/getMerchantOnboardingStatus";
import getPaypalConnectionsForUserDiscordServers from "@utils/db/paypal/getPaypalConnections";
import updatePaypalConnection from "@utils/db/paypal/updatePaypalConnection";
import { useState } from "react";

export default function Payments({}) {
	return (
		<div>
			<Tab.Group>
				<Tab.List className="overflow-auto my-2 flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
					<TabItem>Config</TabItem>
					<TabItem>Coupons</TabItem>
					<TabItem>Invoices</TabItem>
				</Tab.List>
				<Tab.Panels className="mt-2">
					<TabPanel>
						<div className="gap-5 items-center xl:items-start flex-col flex">
							<div className="flex  gap-5 items-center xl:items-start xl:justify-start flex-col xl:flex-row relative">
								<LinkStripeCard></LinkStripeCard>
								<LinkPaypalCard></LinkPaypalCard>
							</div>
						</div>
					</TabPanel>
					<TabPanel>
						<h1>Coupons</h1>
					</TabPanel>
					<TabPanel>
						<h1>Invoices</h1>
					</TabPanel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);

	if (session != null) {
		const userEmail = session.user.email;
		const user = await GetUserByEmail(userEmail);
		const guilds = await GetAllUsersGuilds(user.id);
		let discordServers = await GetDiscordServers(guilds);
		let serverIds = discordServers.map((server) => server.id);

		let [stripeConnections, paypalConnections] = await Promise.all([
			getStripeConnections(serverIds),
			getPaypalConnectionsForUserDiscordServers(serverIds),
		]);

		await Promise.all([
			checkForPaypalConnection(ctx, paypalConnections),
			checkForStripeConnection(ctx, stripeConnections),
		]);

		// console.log(discordServers);
		return {
			props: {
				discordServers,
				paypalConnections,
				stripeConnections,
			},
		};
	} else {
		return {
			props: {},
		};
	}
}

async function checkForStripeConnection(ctx, stripeConnections) {
	if ("stripe-details-submitted" in ctx.query) {
		let { discord_server_db_id } = ctx.query;

		if (discord_server_db_id) {
			let stripeConnection = stripeConnections.find(
				(connection) => connection.discord_server_db_id === discord_server_db_id
			);
			if (stripeConnection && stripeConnection.account) {
				//retreive from stripe
				const stripeAccount = await retrieveStripeConnectionAccount(
					stripeConnection.account
				);
				const { charges_enabled, details_submitted } = stripeAccount;
				if (charges_enabled || details_submitted) {
					stripeConnection = await updateStripeConnection(
						discord_server_db_id,
						{
							charges_enabled,
							details_submitted,
						}
					);
					stripeConnections.find((connection) => {
						if (connection.id === stripeConnection.id) {
							for (let prop in connection) {
								connection[prop] = stripeConnection[prop];
							}
						}
						return connection.id === stripeConnection.id;
					});
				}
			}
		}
	}
}

async function checkForPaypalConnection(ctx, paypalConnections) {
	let paypalConnection;
	if ("paypal-details-submitted" in ctx.query) {
		let tracking_id = ctx.query["paypal-details-submitted"];
		let seller_merchant_id = ctx.query["merchantIdInPayPal"];
		if (tracking_id) {
			// get From Paypal Server
			const onboarding_status = await getMerchantOnboardingStatusFromPaypal({
				seller_merchant_id,
			});
			const { merchant_id, payments_receivable, primary_email_confirmed } =
				onboarding_status;
			if (payments_receivable || primary_email_confirmed) {
				// update in DB
				paypalConnection = await updatePaypalConnection({
					tracking_id,
					updates: {
						payments_receivable,
						primary_email_confirmed,
						merchant_id,
					},
				});
			}
			paypalConnections.find((connection) => {
				if (connection.id === paypalConnection.id) {
					for (let prop in connection) {
						connection[prop] = paypalConnection[prop];
					}
				}
				return connection.id === paypalConnection.id;
			});
		}
	}
}
