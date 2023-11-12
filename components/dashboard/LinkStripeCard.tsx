import { useDiscordServer } from "@utils/contexts/DiscordServerProvider";
import axios from "axios";
import React, { useState } from "react";
import LinkCard from "./LinkCard";
import Toast, { launchErrorToast } from "@components/toasts";
import LoadingScreen from "@components/progress/LoadingScreen";
import { useStripeProcessor } from "@utils/contexts/PaymentProcessorProvider";

import { useDiscordServers } from "@utils/contexts/DiscordServersProvider";
import { Prisma } from "@prisma/client";

export default function LinkStripeCard({}) {
	const [gettingLink, setGettingLink] = useState(false);
	const [discordServer] = useDiscordServer();
	const [, setDiscordServers] = useDiscordServers();
	const stripeConnection = useStripeProcessor();

	let details_submitted;
	let charges_enabled;
	let enabled;
	if (stripeConnection) {
		let sc = stripeConnection;
		details_submitted = sc.details_submitted;
		charges_enabled = sc.charges_enabled;
		enabled = sc.enabled;
	}

	const [updatingProcessor, setUpdatingProcessor] = useState(false);
	function onClickLink() {
		setGettingLink(true);
		axios
			.post("/api/payments/link-stripe", {
				discordServerId: discordServer.id,
			})
			.then((res) => {
				window.open(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setGettingLink(false);
			});
	}
	function conClickUnlink() {
		setGettingLink(true);
		axios
			.post("/api/payments/unlink-processor", {
				processor: "stripe",
				discordServerId: discordServer.id,
			})
			.then((res) => {
				// setStripeProcessors((connections) => {
				// 	const newConnections = connections.filter(
				// 		(connection) => connection.discord_server_db_id !== discordServer.id
				// 	);
				// 	return newConnections;
				// });
				setDiscordServers((servers) => {
					let serverToModify;
					const newServers = servers.filter((server) => {
						if (server.id === discordServer.id) {
							serverToModify = { ...server };
							server.stripe = null;
						}
						return server.id !== discordServer.id;
					});
					return [...newServers, serverToModify];
				});
			})
			.catch((err) => {
				launchErrorToast(
					"Something went wrong. Please try again later or contact support."
				);
			})
			.finally(() => {
				setGettingLink(false);
			});
	}
	function onChangeEnabled(enabled) {
		setUpdatingProcessor(true);
		axios
			.post("/api/payments/updatePaymentProcessor", {
				processor: "stripe",
				enabled,
				discordServerId: discordServer.id,
			})
			.then(() => {
				// setStripeProcessors((connections) => {
				// 	const newConnections = connections.map((connection) => {
				// 		if (connection.discord_server_db_id === discordServer.id) {
				// 			connection.enabled = enabled;
				// 		}
				// 		return connection;
				// 	});
				// 	return newConnections;
				// });
				setDiscordServers((servers) => {
					let serverToModify;
					const newServers = servers.filter((server) => {
						if (server.id === discordServer.id) {
							serverToModify = { ...server };
							if (server.stripe) {
								(server.stripe as Prisma.StripeConnectionSelect).enabled =
									enabled;
							}
						}
						return server.id !== discordServer.id;
					});
					return [...newServers, serverToModify];
				});
			})
			.catch((err) => {
				launchErrorToast(err.response.data);
			})
			.finally(() => {
				setUpdatingProcessor(false);
			});
	}

	return (
		<>
			<Toast />;
			<LinkCard
				onClickUnlink={conClickUnlink}
				enabled={Boolean(enabled)}
				onChangeEnabled={onChangeEnabled}
				loading={gettingLink}
				onClickLink={onClickLink}
				linked={details_submitted && charges_enabled}
				warning={
					!charges_enabled &&
					details_submitted &&
					"Please complete your business information on Stripe to receive payments"
				}
				gatewayName={"Stripe"}
			>
				Connect to Stripe to have access to full discord payment automation for
				credit card and debit cards. Complete with dozens of features such as
				free trials, coupons, referral rewards and user tracking, paid trials,
				limited role quantities, a full drop shipping solution and more!
			</LinkCard>
			{(updatingProcessor || gettingLink) && <LoadingScreen></LoadingScreen>}
		</>
	);
}
