import React from "react";
import Button from "@components/Button";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export default function StorePlan({
	onClickBtn = null,
	color,
	price,
	planName,
	features,
	href = "/sign-up",
}) {
	return (
		<div className="pt-12 shadow-lg border-primary border-2 rounded-lg flex flex-col items-stretch max-w-[100%] min-w-[75%] sm:min-w-[55%] hover:shadow-xl md:min-w-0 duration-150">
			<div
				// style={{ width: "min(320px, 90%)" }}
				className="flex-wrap px-6 justify-evenly md:px-12 xl:px-16  flex flex-row gap-9 pb-5 items-center   "
			>
				<div className="flex gap-9 flex-col">
					<h1
						className={
							"text-center pointer-events-none " +
							(color === "primary" ? `text-primary` : "text-primaryGradient")
						}
					>
						{planName}
					</h1>
					<div className="text-center pointer-events-none">
						<h1>{price} %</h1>
						<p style={{ fontSize: "7px" }}>
							*fee on top of merchant processing
						</p>
					</div>
				</div>
				<div className="flex flex-col pointer-events-none gap-1">
					{(() => {
						let featureComponents = [];
						for (let feature in features) {
							featureComponents.push(
								<Feature
									feature={feature}
									available={features[feature]}
									key={feature}
								/>
							);
						}
						return featureComponents;
					})()}
				</div>
			</div>
			<div className="mb-3 mt-7 self-center flex items-center ">
				<Button
					onClick={onClickBtn}
					href={href}
					type="button"
					bgColor={color === "primary" ? "bg-primary" : "bg-primaryGradient"}
				>
					One Click Sign Up!
				</Button>
			</div>
		</div>
	);
}
function Feature({ feature, available }) {
	return (
		<div className="flex text-sm  items-center flex-row  gap-1">
			{available ? (
				<AiOutlineCheck color="green" />
			) : (
				<AiOutlineClose color="red" />
			)}
			<p className="align-middle">{feature}</p>
		</div>
	);
}
