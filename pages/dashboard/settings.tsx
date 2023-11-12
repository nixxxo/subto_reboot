// import DashboardNavbar from "../../components/navbarDashboard";
import { getSession } from "next-auth/react";
import { GetUserByEmail } from "../api/prisma";
// import CheckAuthentication from "../api/auth/authChecker";
// import { GetDiscordServers } from "../api/getDiscordServers";
import { DashboardBreadcrumb } from "../../components/breadcrumb";
import { Tab } from "@headlessui/react";
import { getCookie } from "cookies-next";
import DashboardProvider from "@utils/contexts/DashboardProvider";
import CInputField from "@components/InputField";
import getUserDiscordServerCustomizations from "@utils/db/discord-customizations/getUserDiscordServerCustomizations";
import { TabList, TabItem, TabPanel } from "@components/Tabs";
import { Prisma } from "@prisma/client";
import { useDiscordServer } from "@utils/contexts/DiscordServerProvider";
import StoreSettings from "@components/dashboard/StoreSettings";
import { useState } from "react";

interface ISettings {
	customizations: Prisma.DiscordServerCustomizationSelect[];
	initialCustomizations: Prisma.DiscordServerCustomizationSelect[];
}

export default function Settings({
	customizations,
	initialCustomizations,
}: ISettings) {
	const [selectedDiscordServer] = useDiscordServer();
	const [savedCustomizations, setSavedCustomizations] = useState(
		initialCustomizations
	);
	let setCustomizations;
	[customizations, setCustomizations] = useState(customizations);
	if (!selectedDiscordServer) return <h1>No server seelected!</h1>;

	// console.log("Rerendering settings");
	let customization = customizations.find((customization) => {
		return (
			customization &&
			customization.discordServerId === selectedDiscordServer.id
		);
	});
	if (!customization) {
		customization = {
			discordServerId: selectedDiscordServer.id,
		} as Prisma.DiscordServerCustomizationSelect;
		setSavedCustomizations((c) => [...c, customization]);
		// initialCustomizations.push(customization);
		setCustomizations((customizations) => {
			customizations = customizations.filter((c) => c);
			return [...customizations, customization];
		});
	}
	// console.log(customization);
	let initialCustomizationState = savedCustomizations.find(
		(cust) => cust && cust.discordServerId === customization.discordServerId
	);

	return (
		<div>
			<Tab.Group>
				<TabList>
					<TabItem>Store</TabItem>
					<TabItem>Discord</TabItem>
				</TabList>
				<Tab.Panels className="mt-2">
					<TabPanel>
						<StoreSettings
							initialState={initialCustomizationState ?? {}}
							setCustomizations={setCustomizations}
							customization={customization}
							setSavedCustomizations={setSavedCustomizations}
						/>
					</TabPanel>
					<TabPanel>
						<div></div>
					</TabPanel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);
	let customizations = [];
	let initialCustomizations = [];
	if (session) {
		const userEmail = session.user.email;
		const user = await GetUserByEmail(userEmail);
		customizations = await getUserDiscordServerCustomizations(user.id);
		initialCustomizations = customizations.filter((c) => c);
		// console.log(initialCustomizations);
		initialCustomizations = JSON.parse(
			JSON.stringify(initialCustomizations) as any
		);
	}

	return {
		props: {
			customizations,
			initialCustomizations,
		},
	};
}
