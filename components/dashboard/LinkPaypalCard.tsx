import LoadingScreen from "@components/progress/LoadingScreen";
import Toast, { launchErrorToast } from "@components/toasts";
import { Prisma } from "@prisma/client";
import { useDiscordServer } from "@utils/contexts/DiscordServerProvider";
import { useDiscordServers } from "@utils/contexts/DiscordServersProvider";
import { usePaypalProcessor } from "@utils/contexts/PaymentProcessorProvider";
import axios from "axios";
import React, { useState } from "react";
import LinkCard from "./LinkCard";

export default function LinkPaypalCard({}) {
	const [gettingLink, setGettingLink] = useState(false);
	const [discordServer] = useDiscordServer();
	const [, setDiscordServers] = useDiscordServers();
	const paypalConnection = usePaypalProcessor();
	let { payments_receivable, enabled } = paypalConnection ?? {};
	const [updatingProcessor, setUpdatingProcessor] = useState(false);

	// console.log(paypalConnection);
	function onClickLink() {
		setGettingLink(true);
		axios
			.post("/api/payments/link-paypal", {
				discordServerId: discordServer.id,
			})
			.then((res) => {
				window.open(res.data);
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

	function conClickUnlink() {
		setGettingLink(true);
		axios
			.post("/api/payments/unlink-processor", {
				processor: "paypal",
				discordServerId: discordServer.id,
			})
			.then((res) => {
				setDiscordServers((servers) => {
					let serverToModify;
					const newServers = servers.filter((server) => {
						if (server.id === discordServer.id) {
							server.paypal = null;
							serverToModify = { ...server };
						}
						return server.id !== discordServer.id;
					});
					return [...newServers, serverToModify];
				});
				// setPaypalProcessors((connections) => {
				// 	const newConnections = connections.filter(
				// 		(connection) => connection.discord_server_db_id !== discordServer.id
				// 	);
				// 	return newConnections;
				// });
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
				processor: "paypal",
				enabled,
				discordServerId: discordServer.id,
			})
			.then(() => {
				// setPaypalProcessors((connections) => {
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
							if (server.paypal) {
								(server.paypal as Prisma.PaypalConnectionSelect).enabled =
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
			<Toast />

			<LinkCard
				onClickUnlink={conClickUnlink}
				enabled={Boolean(enabled)}
				onChangeEnabled={onChangeEnabled}
				loading={gettingLink}
				onClickLink={onClickLink}
				linked={payments_receivable}
				// warning={
				// 	(!primary_email_confirmed || !payments_receivable) &&
				// 	"Please verify your email and/ or complete your account setup on Paypal to receive Payments"
				// }
				warning={undefined}
				gatewayName={"Paypal"}
			>
				Connect to PayPal to gain access to one time and subscription based
				billing for over 200+ countries with access to over 325 Million PayPal
				users. One of the most widely accepted payment methods.
			</LinkCard>
			{(updatingProcessor || gettingLink) && <LoadingScreen></LoadingScreen>}
		</>
	);
}
