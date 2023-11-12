import { useEffect } from "react";
import gsap from "gsap";
import NavLink from "./NavLink";
import IconButton from "../IconButton";
import { AiOutlineClose } from "react-icons/ai";

export default function NavigationDrawer({ onClose: onCloseFunc }) {
	const animationDuration = 0.25;

	function onClose() {
		const elemWidth = document.querySelector("#nav-drawer-list").offsetWidth;
		gsap.to("#nav-drawer-list", {
			x: -elemWidth,
			duration: animationDuration,
			ease: "Power1.easeInOut",
		});

		gsap.to("#nav-drawer-black-bg", {
			x: -window.innerWidth,
			duration: 0,
		});
		setTimeout(() => {
			onCloseFunc();
		}, animationDuration * 1000);
	}

	useEffect(() => {
		gsap.to("#nav-drawer-list", {
			x: 0,
			duration: animationDuration,
			ease: "Power1.easeOut",
		});
	}, []);
	return (
		<div
			style={{ zIndex: 100 }}
			className="fixed top-0 left-0 w-screen h-screen "
			onClick={onClose}
		>
			<div
				style={{ zIndex: -2 }}
				id="nav-drawer-black-bg"
				className="bg-black opacity-70 absolute top-0 left-0 h-full w-full"
			></div>
			<div
				id="nav-drawer-list"
				className="bg-white p-3 md:p-5  flex flex-col h-full -translate-x-full"
				style={{ width: "min(300px, 90%)" }}
			>
				<div className="self-end">
					<IconButton>
						<AiOutlineClose />
					</IconButton>
				</div>
				<hr className=" my-2 border-b-1 border-black self-stretch" />

				<div className=" flex-col my-3  flex items-center  ">
					<NavLink href="/#features">Features</NavLink>
					<NavLink href="/templates">Templates</NavLink>
					<NavLink href="/#pricing">Pricing</NavLink>
					<NavLink href="/support">Support</NavLink>
				</div>
			</div>
		</div>
	);
}
