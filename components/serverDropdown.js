/* eslint-disable jsx-a11y/alt-text */
import { useState, Fragment, useLayoutEffect, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { setCookies, getCookie, checkCookies } from "cookies-next";
import { useDiscordServer } from "@utils/contexts/DiscordServerProvider";
import { useDiscordServers } from "@utils/contexts/DiscordServersProvider";

function DropdownServer({}) {
	let [discordServers] = useDiscordServers();
	const [selected, setDiscordServer] = useDiscordServer();
	// const [selected, setDiscordServer] = useState(discordServers[0]);
	// console.log(getCookie("selectedServerName"));
	// console.log(getCookie("selectedServerIcon"));
	// console.log(getCookie("selectedServerId"));

	return (
		<div className="w-full">
			<Listbox
				value={selected}
				onChange={(event) => {
					if (event) {
						setDiscordServer(
							discordServers.find((server) => server.id === event.id)
						);
					}

					// setCookies("selectedServerName", event.name, {
					// 	maxAge: 60 * 60 * 24,
					// 	sameSite: true,
					// 	secure: false,
					// });
					// setCookies("selectedServerIcon", event.image, {
					// 	maxAge: 60 * 60 * 24,
					// 	sameSite: true,
					// 	secure: false,
					// });
					// setCookies("selectedServerId", event.id, {
					// 	maxAge: 60 * 60 * 24,
					// 	sameSite: true,
					// 	secure: false,
					// });
				}}
			>
				<div className="relative mt-1">
					<Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-orange-500 text-sm md:text-base ">
						<div className="flex flex-row items-center">
							<img
								className="h-4 md:h-5 rounded-full  mr-1 md:mr-2"
								src={selected && selected.icon}
							/>
							<span className="block truncate text-xs md:text-sm">
								{selected && selected.name}
							</span>
						</div>
						<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
							<SelectorIcon
								className="w-5 h-5 text-gray-400"
								aria-hidden="true"
							/>
						</span>
					</Listbox.Button>
					<Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-sm md:text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{discordServers.map &&
							discordServers.map((server, serverIdx) => (
								<ListBoxOption key={serverIdx} server={server} />
							))}
					</Listbox.Options>
				</div>
			</Listbox>
		</div>
	);
}

function ListBoxOption({ server }) {
	const [selected] = useDiscordServer();
	const isSelected = selected && selected.id === server.id;
	return (
		<Listbox.Option
			className={({ active }) =>
				`${
					active
						? // isSelected
						  "text-slate-900 bg-orange-100 opacity-100"
						: "text-slate-800 opacity-80"
				}
						cursor-default select-none relative py-2 pl-2 md:pl-10 pr-4`
			}
			value={server}
		>
			{({ active }) => {
				// const isSelected = selected.id === server.id;
				return (
					<>
						<div className="flex flex-row items-center">
							<img
								className="h-4 md:h-5 rounded-full mr-2"
								src={server.image}
							/>
							<span
								className={`${
									isSelected ? "font-medium" : "font-normal"
								} block truncate`}
							>
								{server.name}
							</span>
						</div>
						{isSelected ? (
							<span
								className={`${active ? "text-orange-600" : "text-orange-600"}
							hidden md:absolute inset-y-0 left-0 md:flex items-center pl-1 md:pl-3`}
							>
								<CheckIcon className="w-5 h-5" aria-hidden="true" />
							</span>
						) : null}
					</>
				);
			}}
		</Listbox.Option>
	);
}

export default DropdownServer;
