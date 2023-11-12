import React from "react";
import Accordion from "../components/Accordion";
import Link from "next/link";

export default function faq() {
	return (
		<div>
			<Background></Background>
			<div
				className="flex drop-shadow-sm  flex-col  mx-auto gap-6 mb-10  -mt-10"
				style={{ width: "min(95%, 750px)" }}
			>
				<Accordion />
				<Accordion />
				<Accordion />
				<Accordion />
				<Accordion />
			</div>
		</div>
	);
}

function Background() {
	return (
		<div className="relative">
			<Bg></Bg>
			<div className="-z-10 w-screen top-0 absolute left-[50%] -translate-x-[50%] h-full bg-primaryGradient"></div>
		</div>
	);
}

function Bg() {
	return (
		<div className="relative w-full h-52 md:h-72 lg:h-96  grid place-items-center ">
			<h1 className="text-white text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl ">
				Frequently asked questions
			</h1>
		</div>
	);
}
