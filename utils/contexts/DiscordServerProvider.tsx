import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { getCookie, setCookies } from "cookies-next";
import { useDiscordServers } from "./DiscordServersProvider";
import DashboardNavbar from "@components/navbarDashboard";
import { Prisma } from "@prisma/client";
import { DashboardBreadcrumb } from "@components/breadcrumb";

interface ISelectedDiscordServerProvider {
	children: any;
	discordServers?: any[];
}

let discordServerTemp = {
	name: getCookie("selectedServerName"),
	image: getCookie("selectedServerIcon"),
	id: getCookie("selectedServerId"),
};

const SelectedDiscordServerContext = React.createContext(
	undefined as Prisma.DiscordServerSelect
);

let setDiscordServerObj = { func: null as any };

// type returnType = (Prisma.DiscordServerSelect | ((a: any) => any))[];
type returnType = [Prisma.DiscordServerSelect, (a: any) => any];

export function useDiscordServer(): returnType {
	return [useContext(SelectedDiscordServerContext), setDiscordServer];
}

export default function DiscordServerProvider(
	props: ISelectedDiscordServerProvider
) {
	const { children } = props;
	const [discordServers] = useDiscordServers();
	let [discordServer, setDiscordServerInner] = useState(
		discordServers.find((server) => server.id === discordServerTemp.id)
	);

	useEffect(() => {
		if (!discordServer && discordServerTemp.id && discordServers.length) {
			setDiscordServer(
				discordServers.find((server) => server.id === discordServerTemp.id)
			);
		} else if (!discordServer && discordServers[0]) {
			setDiscordServer(discordServers[0]);
		}
	}, [discordServer, setDiscordServerInner, discordServers]);

	setDiscordServerObj.func = setDiscordServerInner;

	return (
		<SelectedDiscordServerContext.Provider value={discordServer}>
			{children}
		</SelectedDiscordServerContext.Provider>
	);
}

function setDiscordServer(newDiscordServer: Prisma.DiscordServerSelect) {
	if (!newDiscordServer) return;
	setCookies("selectedServerName", newDiscordServer.name, {
		maxAge: 60 * 60 * 24,
		sameSite: true,
		secure: false,
	});
	setCookies("selectedServerIcon", newDiscordServer.icon, {
		maxAge: 60 * 60 * 24,
		sameSite: true,
		secure: false,
	});
	setCookies("selectedServerId", newDiscordServer.id, {
		maxAge: 60 * 60 * 24,
		sameSite: true,
		secure: false,
	});
	if (typeof setDiscordServerObj.func === "function") {
		setDiscordServerObj.func(newDiscordServer);
	}
}
