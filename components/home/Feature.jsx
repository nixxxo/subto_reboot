import React from "react";

export default function Feature({
	children: icon,
	name,
	className,
	imgSrc,
	description,
}) {
	return (
		<div
			className={
				"duration-150 flex gap-3 hover:shadow-md bg-white items-start flex-col p-2 rounded-md " +
				className
			}
			style={{ width: "min(100%, 272px)" }}
		>
			{/* <img src={imgSrc} alt="feature" /> */}
			<div
				// style={{
				// 	backgroundImage: `url('${imgSrc}')`,
				// 	backgroundPosition: "center center",
				// 	backgroundSize: "contain",
				// }}
				className="mx-auto text-white text-5xl md:mx-0 inline-block rounded-md p-3 bg-primaryGradient"
			>
				{icon}
			</div>
			<hr
				style={{ borderTopWidth: 2, borderColor: "black" }}
				className="self-stretch"
			/>
			<h4 className="text-center pointer-events-none self-stretch md:text-left ">{name}</h4>
			<p className="text-center pointer-events-none md:text-left">{description}</p>
		</div>
	);
}
