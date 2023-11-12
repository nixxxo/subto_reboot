import React from "react";

export default function Review({ review, className, reviewer, imgSrc }) {
	return (
		<div
			style={{ backdropFilter: "blur(12px)", width: "min(300px, 100%)" }}
			className={
				"p-4 hover:shadow-lg flex flex-col justify-between rounded-md duration-150 shadow-md  " +
				className
			}
		>
			<p className="text-center md:text-left text-sm pointer-events-none ">
				{review}
			</p>
			<div className="flex items-center justify-between flex-row mt-3">
				<div
					style={{ backgroundImage: `url(${imgSrc})` }}
					className="p-6 bg-no-repeat inline-block rounded-full bg-center bg-cover bg-gray-300"
				></div>
				<p className="font-semibold pointer-events-none">{reviewer}</p>
			</div>
		</div>
	);
}
