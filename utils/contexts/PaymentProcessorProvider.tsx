import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Prisma } from "@prisma/client";
import { useDiscordServer } from "./DiscordServerProvider";
import {
	usePaypalProcessors,
	useStripeProcessors,
} from "./PaymentProcessorsProvider";

type providerType = {
	stripeConnection: Prisma.StripeConnectionSelect;
	paypalConnection: Prisma.PaypalConnectionSelect;
};
const ProcessorContext = React.createContext({
	stripeConnection: null,
	paypalConnection: null,
} as providerType);

let setStripeConnection: React.Dispatch<React.SetStateAction<any>>;
let setPaypalConnection: React.Dispatch<React.SetStateAction<any>>;

export function useStripeProcessor() {
	return useContext(ProcessorContext).stripeConnection;
}

export function usePaypalProcessor() {
	return useContext(ProcessorContext).paypalConnection;
}

export default function PaymentProcessorProvider({ children }) {
	let paypalConnection, stripeConnection;
	const [paypalProcessors] = usePaypalProcessors();
	const [stripeProcessors] = useStripeProcessors();
	[paypalConnection, setPaypalConnection] = useState(null);
	[stripeConnection, setStripeConnection] = useState(null);

	const [discordServer] = useDiscordServer();
	useEffect(() => {
		if (discordServer && discordServer.id) {
			const paypalProcessor = paypalProcessors.find(
				(processor) => processor.discord_server_db_id === discordServer.id
			);
			const stripeProcessor = stripeProcessors.find(
				(processor) => processor.discord_server_db_id === discordServer.id
			);
			setStripeConnection(stripeProcessor);
			setPaypalConnection(paypalProcessor);
			// setPaypalConnection(discordServer.paypal);
			// setStripeConnection(discordServer.stripe);
		}
	}, [discordServer, paypalProcessors, stripeProcessors]);

	return (
		<ProcessorContext.Provider value={{ paypalConnection, stripeConnection }}>
			{children}
		</ProcessorContext.Provider>
	);
}
