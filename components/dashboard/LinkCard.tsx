import React from "react";
import Button from "@components/Button";
import Switch from "../Switch";
import { BsCheck2Circle } from "react-icons/bs";
import Spinner from "@components/progress/Spinner";
/** @jsxImportSource @emotion/react */
// import { jsx } from "@emotion/react";

export default function LinkCard({
	gatewayName,
	onClickLink,
	linked,
	children,
	loading,
	warning,
	enabled,
	onChangeEnabled,
	onClickUnlink,
}) {
	// console.log(loading);
	gatewayName = gatewayName ?? "Stripe";
	return (
		<div
			style={{ width: "min(600px, 100%)" }}
			className="bg-white shadow-lg inline-block px-3 py-2"
		>
			<div className="flex  my-1 rounded-lg bg-[#f5cdbc] px-3 py-2 ">
				<div className="text-xl font-bold text-red-700 my-1 min-w-[40px]">
					<BsCheck2Circle />
				</div>
				<div className="">
					<h6 className="mb-1">{gatewayName}</h6>
					<p>
						{children ??
							"Paypal not set up yet. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id tempore magni est assumenda fuga distinctio? Id tempore magni empore magni est assumenda fuga di Eum unde maiores perferendis aut."}
					</p>
				</div>
			</div>

			<div className=" py-2 flex gap-2 items-center flex-col md:flex-row justify-between self-stretch">
				{!linked ? (
					<Button onClick={onClickLink} loading={loading}>
						Link {gatewayName}
					</Button>
				) : (
					<div className="flex flex-row gap-2 items-center">
						<p>Linked {gatewayName}</p>
						<Button
							bgColor="bg-red-500"
							// className="bg-red-500"
							css={{
								backgroundColor: "red !important",
								"&,*": {
									transfrom: "scale(5)",
									backgroundColor: "red !important",
								},
							}}
							onClick={onClickUnlink}
						>
							Unlink
						</Button>
					</div>
				)}

				<div className="flex justify-center self-stretch gap-3 items-center">
					<Switch checked={enabled} onChange={onChangeEnabled} />
					<p>Enable for Checkout</p>
				</div>
			</div>
			{warning}
		</div>
	);
}
