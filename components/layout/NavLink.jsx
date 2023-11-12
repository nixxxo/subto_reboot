import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavLink({ href, children }) {
	const router = useRouter();
	const samePageAsLink = router.asPath
		.toLowerCase()
		.includes(children.toLowerCase());
	const className =
		"m-1 p-3 transition-all font-bold uppercase duration-200 hover:text-orange-400 hover:scale-105 text-gray-800 " +
		(samePageAsLink ? "text-orange-400" : "");
	return (
		<span className={className}>
			<Link href={href} className={className}>
				{children}
			</Link>
		</span>
	);
}
