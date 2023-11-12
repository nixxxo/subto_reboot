/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import {
	MdOutlineStore,
	MdArrowForward,
	MdOutlineShield,
	MdOutlineSettingsInputComponent,
	MdOutlineSpaceDashboard,
	MdOutlinePeopleAlt,
	MdOutlinePayment,
	MdOutlineShoppingCart,
} from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { LineBreak } from "./useful";
import { isBrowser, isMobile } from "react-device-detect";
import { useRouter } from "next/router";
import { DashboardBreadcrumb } from "./breadcrumb";
import DropdownServer from "./serverDropdown";
import Head from "next/head";
import { useDiscordServers } from "@utils/contexts/DiscordServersProvider";
export default function DashboardNavbar({
	insideStructure,
	children,
	// discordServers,
}) {
	const [discordServers] = useDiscordServers();
	const [show, setShow] = useState(false);

	const { data: session } = useSession();
	var username = "Error #username";
	var user_image = "Error #image";
	var user_email = "Error #email";
	if (session) {
		username = session.user.name;
		user_image = session.user.image;
		user_email = session.user.email;
	}

	return (
		<div
			id="server-dropdown"
			className="flex flex-col bg-gray-100 min-h-screen m-auto p-0"
		>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<div className="bg-white xl:hidden min-h-min flex text-gray-800  hover:text-black focus:outline-none focus:text-black justify-between w-full p-4 items-center ">
				<button className="transition-all duration-300 h-full hover:scale-105">
					<Link href="/">
						<img className="h-14" src="/subto2.png" />
					</Link>
				</button>
				<div aria-label="toggler" className="flex justify-center items-center">
					<button
						id="open"
						onClick={() => setShow(!show)}
						aria-label="open"
						className={`${
							show ? "" : "hidden"
						} transition-all hover:scale-110 duration-150`}
					>
						<svg
							className="text-gray-800"
							width={24}
							height={24}
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 6H20"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M4 12H20"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M4 18H20"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
					<button
						id="close"
						onClick={() => setShow(!show)}
						aria-label="close"
						className={`${
							show ? "hidden" : ""
						} transition-all hover:scale-110 duration-150`}
					>
						<svg
							className="text-gray-800"
							width={24}
							height={24}
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M18 6L6 18"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M6 6L18 18"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div id="main" className="flex flex-auto flex-row ">
				<div
					id="navigation"
					className={`${
						show ? "-translate-x-full hidden" : "translate-x-0"
					} bg-white transform xl:translate-x-0 ease-in-out transition duration-500 justify-between items-start flex w-44 md:w-64 min-h-full flex-col`}
				>
					<Link href="/">
						<button className="hidden transition-all duration-100 hover:scale-105 xl:flex text-gray-800 hover:text-black focus:outline-none focus:text-black justify-start px-6 pt-6 items-center space-x-3 w-full">
							<img className="h-10" src="/bolt.png" />
							<p className="text-4xl leading-6 ">subto</p>
						</button>
					</Link>
					<div
						id="nav-stats"
						className="mt-3 flex flex-col justify-start items-start px-4 w-full space-y-3 pb-5 "
					>
						<DropdownServer discordServers={discordServers} />
						<NavItem
							icon={<MdOutlineSpaceDashboard size={24} />}
							text="Dashboard"
							link=""
						/>
						<NavItem
							icon={<MdOutlineStore size={24} />}
							text="Products"
							link="/products"
						/>
						<NavItem
							icon={<MdOutlinePeopleAlt size={24} />}
							text="Customers"
							link="/customers"
						/>
						<NavItem
							icon={<MdOutlinePayment size={24} />}
							text="Payments"
							link="/payments"
						/>
						<NavItem
							icon={<MdOutlineShoppingCart size={24} />}
							text="Orders"
							link="/orders"
						/>
					</div>
					<LineBreak />
					<div
						id="nav-settings"
						className="mt-6 flex flex-col justify-start items-start  px-4 w-full space-y-3 pb-5 "
					>
						<NavItem
							icon={<MdOutlineShield size={24} />}
							text="Moderator"
							link="/moderator"
						/>
						<NavItem
							icon={<MdOutlineSettingsInputComponent size={24} />}
							text="Settings"
							link="/settings"
						/>
					</div>
					<LineBreak />
					<div
						id="nav-user"
						className="flex mt-auto self-end bg-orange-600 justify-start space-x-2 items-center py-4 px-3.5 w-full"
					>
						<img
							className="rounded-full w-5 md:w-10"
							src={user_image}
							alt="avatar"
						/>
						<div className="flex flex-col justify-start items-start space-y-2">
							<p className="cursor-pointer text-sm md:text-base leading-4 text-white">
								{username}
							</p>
							<p className="cursor-pointer text-xs leading-3 text-gray-200">
								{user_email}
							</p>
						</div>
						<button
							aria-label="visit"
							className=" text-white focus:ring-2 focus:outline-none p-1 md:p-2.5 bg-orange-600 rounded-full"
						>
							<Link href="/dashboard/account">
								{/* div suppresses forwardRef error */}
								<div>
									<MdArrowForward size={isMobile ? 15 : 28} />
								</div>
							</Link>
						</button>
					</div>
				</div>
				<div
					id="content"
					className={`${
						show ? "w-full" : "w-full"
					} flex-1 min-w-0  transition-all duration-500 container mx-auto py-8 h-full px-3`}
				>
					<div className="w-full min-h-max rounded border-dashed border-2 border-gray-300">
						{/* <DashboardBreadcrumb /> */}
						<>{insideStructure || children}</>
					</div>
				</div>
			</div>
		</div>
	);
}

const NavItem = ({ icon, text, fullLink, link }) => {
	const router = useRouter();
	const path = router.asPath;

	fullLink = fullLink ?? `/dashboard${link}`;

	return (
		<Link href={fullLink}>
			<button
				className={`${
					path == fullLink ? "bg-orange-600 text-white" : " text-gray-600"
				} transition-all focus:outline-none text-sm md:text-base flex jusitfy-start hover:text-white hover:bg-orange-600 rounded py-1.5 md:py-2.5 pl-1 md:pl-4 items-center space-x-6 w-full`}
			>
				<div className="pointer-events-none">{icon}</div>
				<p className={`leading-4 pointer-events-none`}>{text}</p>
			</button>
		</Link>
	);
};
