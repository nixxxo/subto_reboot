import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Prisma } from "@prisma/client";

interface IDiscordServersProvider {
	children: any;
}

let discordServers: Prisma.DiscordServerSelect[] = [];
let setDiscordServers: React.Dispatch<
	React.SetStateAction<Prisma.DiscordServerSelect[]>
>;

const DiscordServersContext = React.createContext(discordServers);

export function useDiscordServers(): [
	Prisma.DiscordServerSelect[],
	React.Dispatch<React.SetStateAction<Prisma.DiscordServerSelect[]>>
] {
	return [useContext(DiscordServersContext), setDiscordServers];
}

export default function DiscordServersProvider({
	children,
}: IDiscordServersProvider) {
	[discordServers, setDiscordServers] = useState([]);
	useEffect(() => {
		axios
			.get("/api/fetchDiscordServers")
			.then((res) => {
				// console.log(res.data);
				setDiscordServers(res.data);
			})
			.catch((res) => {
				console.log(res);
			});
	}, []);
	return (
		<DiscordServersContext.Provider value={discordServers}>
			{children}
		</DiscordServersContext.Provider>
	);
}
