import { useRouter } from "next/router";
import Link from "next/link";
import { setCookies, getCookie, checkCookies } from "cookies-next";
import { state } from "./serverDropdown";
import copy from "copy-to-clipboard";
import { isBrowser, isMobile } from "react-device-detect";
import { useDiscordServer } from "@utils/contexts/DiscordServerProvider";
export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const DashboardBreadcrumb = () => {
	const [server] = useDiscordServer();
	const serverName = server && server.name;
	const serverImage = server && server.image;
	const serverID = server && server.id;

	// if (checkCookies("selectedServerName")) {
	// 	serverName = getCookie("selectedServerName");
	// 	serverImage = getCookie("selectedServerIcon");
	// 	serverID = getCookie("selectedServerId");
	// }

	const router = useRouter();

	const linkPath = router.pathname;
	var paths = linkPath.split("/");
	var data;
	paths.forEach((element) => {
		if (element != "dashboard" && element != "/" && element != "") {
			element = capitalizeFirstLetter(element);
			data = ` / ${element}`;
		}
	});

	return (
		<>
			<div id="breadcrumb" className="mb-1">
				<span>
					<Link href="/dashboard">
						<button className="text-blue-600 text-sm sm:text-base hover:text-blue-900">
							Dashboard
						</button>
					</Link>
					{data}
				</span>
			</div>
			<div
				id="header"
				className="mb-6 flex flex-row items-center justify-evenly md:justify-between flex-wrap"
			>
				<div className="flex flex-row items-center">
					<img alt="" className="h-8 rounded-full" src={serverImage} />
					<span className="ml-2 text-xs sm:text-base md:font-bold">
						{serverName}
					</span>
				</div>
				<div className="flex justify-evenly flex-wrap gap-2">
					<button
						onClick={() =>
							copy(serverID, { message: "Server ID copied to clipboard." })
						}
						className=" bg-gray-300 hover:bg-gray-400 transition-all uppercase duration-100 py-2 px-4 rounded-sm shadow-sm text-xs font-semibold"
					>
						{isMobile ? "ID" : "Copy Server Id"}
					</button>
					<button
						onClick={() =>
							copy(baseURL + "/" + serverID, {
								message: "Server ID copied to clipboard.",
							})
						}
						className=" bg-gray-300 hover:bg-gray-400 transition-all uppercase duration-100 py-2 px-4 rounded-sm shadow-sm text-xs font-semibold"
					>
						{isMobile ? "Store" : "Copy Store Checkout URL"}
					</button>
				</div>
			</div>
		</>
	);
};
