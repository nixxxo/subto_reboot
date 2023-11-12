import React from "react";
import Spinner from "./Spinner";

export default function LoadingScreen() {
	return (
		<div className="absolute z-30 top-0 left-0 h-full w-full grid place-items-center bg-white opacity-60">
			<Spinner />
		</div>
	);
}
