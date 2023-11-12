import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { useDiscordServers } from "./DiscordServersProvider";

type providerType = {
	stripeConnections: Prisma.StripeConnectionSelect[];
	paypalConnections: Prisma.PaypalConnectionSelect[];
};
const ProcessorContext = React.createContext({
	stripeConnections: [],
	paypalConnections: [],
} as providerType);

let setStripeConnections: React.Dispatch<React.SetStateAction<any[]>>;
let setPaypalConnections: React.Dispatch<React.SetStateAction<any[]>>;

export function useStripeProcessors(): [
	Prisma.StripeConnectionSelect[],
	React.Dispatch<React.SetStateAction<any[]>>
] {
	return [useContext(ProcessorContext).stripeConnections, setStripeConnections];
}

export function usePaypalProcessors(): [
	Prisma.PaypalConnectionSelect[],
	React.Dispatch<React.SetStateAction<any[]>>
] {
	return [useContext(ProcessorContext).paypalConnections, setPaypalConnections];
}

export default function PaymentProcessorsProvider({ children }) {
	let paypalConnections, stripeConnections;

	[paypalConnections, setPaypalConnections] = useState([]);
	[stripeConnections, setStripeConnections] = useState([]);
	const [discordServers] = useDiscordServers();

	useEffect(() => {
		async function setServers() {
			// const { data } = await axios.get("/api/payments/getPaymentProcessors");
			const stripeConnections = discordServers
				.map((server) => server.stripe)
				.filter(Boolean);
			const paypalConnections = discordServers
				.map((server) => server.paypal)
				.filter(Boolean);
			// setPaypalConnections(data.paypalConnections);
			// setStripeConnections(data.stripeConnections);
			setPaypalConnections(paypalConnections);
			setStripeConnections(stripeConnections);
		}
		setServers();
	}, [discordServers]);

	return (
		<ProcessorContext.Provider value={{ paypalConnections, stripeConnections }}>
			{children}
		</ProcessorContext.Provider>
	);
}
