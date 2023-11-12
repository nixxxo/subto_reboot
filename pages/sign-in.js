/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Head from "next/head";
import Swal from "sweetalert2";
import React, { useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";

const SignIn = () => {
	return (
		<div className="bg-white">
			<div className="m-auto my-10 py-6 px-6 w-96 flex flex-col bg-gray-100 rounded-md items-center">
				<img className="w-60" src="/logo_main.png" />
				<ActionBox />
			</div>
		</div>
	);
};

const ActionBox = () => {
	const { data: session } = useSession();
	if (session) {
		return (
			<div className="flex flex-col items-center mt-4">
				<img
					className="transition-all duration-300 hover:scale-105 h-20 rounded-full border-2 border-orange-500"
					src={session.user.image}
				/>
				<h2 className="text-xl mb-4 text-gray-800 font-semibold">
					Hello{" "}
					<span className="font-bold transition-all duration-300 hover:scale-105 hover:text-orange-500">
						{session.user.name}
					</span>
					!
				</h2>
				<h2 className="text-center">You seem to be logged in.</h2>
				<h2 className="text-center mb-8">
					You can start managing your servers from the Dashboard.
				</h2>
				<div className="flex flex-row">
					<button
						className="text-lg font-bold px-6 p-1.5 m-4 ml-2 text-white rounded-md 
            bg-gradient-to-r from-red-500 via-orange-500 to-orange-400
            transition-all duration-300 hover:scale-105"
					>
						<Link href="/dashboard">Dashboard</Link>
					</button>
					<button
						className="transition-all duration-300 text-base hover:scale-105 hover:text-orange-600"
						onClick={() => signOut({ callbackUrl: "/sign-in" })}
					>
						{" "}
						Or Sign Out
					</button>
				</div>
			</div>
		);
	} else {
		return (
			<button
				className="mt-6 text-base font-semibold w-7/8 px-6 p-1.5 py-2.5 m-4 ml-2 text-white rounded-xl
      hover:bg-indigo-700 bg-indigo-600
      transition-all duration-300 hover:scale-105"
				onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
			>
				Sign In With Discord
			</button>
		);
	}
};

const InputField = ({ label_text, name, control, type, placeholder }) => {
	return (
		<div>
			<label className="transition-all duration-500 font-neo font-normal text-lg hover:text-orange-400">
				{label_text}
			</label>
			<input
				control={control}
				className="text-sm p-2 m-1 ring ring-transparent rounded-xl focus:outline-none focus:ring-orange-400"
				type={type}
				name={name}
				placeholder={placeholder}
				required
			/>
		</div>
	);
};

export default SignIn;
