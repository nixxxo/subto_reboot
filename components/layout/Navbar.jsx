import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import NavLink from "@components/layout/NavLink";
import { AiOutlineMenu } from "react-icons/ai";
import IconButton from "@components/IconButton";
import NavigationDrawer from "@components/layout/NavigationDrawer";
import Button from "../Button";

const Navbar = ({ maxWidth }) => {
	const [drawerOpen, setDrawerState] = useState(false);

	return (
		<div className="bg-gray-100 z-50 flex items-center sticky top-0 left-0 shadow-lg h-20">
			<div
				style={{ width: `min(100%, ${maxWidth}px)` }}
				className="flex h-full flex-row items-center mx-auto justify-between p-1 gap-3"
			>
				<div className="flex flex-shrink gap-2 h-full items-center">
					<div className="basis-0 md:hidden">
						<IconButton onClick={() => setDrawerState(true)}>
							<AiOutlineMenu />
						</IconButton>
						{drawerOpen && (
							<NavigationDrawer onClose={() => setDrawerState(false)} />
						)}
					</div>
					<button className="max-w-[120px] md:w-[100px] flex-shrink   md:min-w-[140px] transition-all duration-300 h-full md:p-2  hover:scale-105">
						<Link href="/">
							<img
								alt="Logo"
								className="object-contain h-full"
								src="/logo_main.png"
							/>
						</Link>
					</button>
				</div>
				<div className="flex flex-row items-center justify-end md:w-3/4">
					<nav className="md:flex hidden font-bold   items-center justify-between ">
						<NavLink href="/#features">Features</NavLink>
						<NavLink href="/templates">Templates</NavLink>
						<NavLink href="/#pricing">Pricing</NavLink>
						<NavLink href="/support">Support</NavLink>
					</nav>
					<SignInButton />
				</div>
			</div>
		</div>
	);
};

const SignInButton = () => {
	const { data: session } = useSession();

	return (
		<div className="basis-0 md:ml-8">
			<Button
				className="bg-primaryGradient flex-shrink"
				href={session ? "dashboard" : "/sign-up"}
			>
				{session ? "Dashboard" : "Sign Up"}
			</Button>
		</div>
	);
};

export default Navbar;
