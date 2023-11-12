import React, { useState } from "react";
import Button from "@components/Button";
import Switch from "../Switch";
import { BsCheck2Circle } from "react-icons/bs";
import { FaSave } from "react-icons/fa";

export default function DefaultCurrencyCard({ gatewayName, linked, children }) {
	const [selectedCurrency, setSelectedCurrency] = useState(0);
	return (
		<div
			style={{ width: "min(600px, 100%)" }}
			className="bg-white shadow-lg inline-block px-3 py-2"
		>
			<div className="flex  my-1 rounded-lg bg-gray-200 px-3 py-2 ">
				<div className="text-xl font-bold  my-1 min-w-[40px]">
					<BsCheck2Circle />
				</div>
				<div className="">
					<h6 className="mb-1">Default Currency</h6>
					<p>
						{children ??
							"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id tempore magni est assumenda fuga distinctio? Id tempore magni empore magni est assumenda fuga di Eum unde maiores perferendis aut."}
					</p>
				</div>
			</div>

			<div>
				<select
					onChange={(e) => setSelectedCurrency(e.target.value)}
					className="w-full my-2"
					value={selectedCurrency}
					name=""
					id=""
				>
					<option value="1">Currency One</option>
					<option value="2">Currency Two</option>
					<option value="3">Currency Three</option>
					<option value="4">Currency Four</option>
					<option value="5">Currency Five</option>
					<option value="6">Currency Six</option>
				</select>
			</div>
			<div className="flex flex-col items-stretch">
				{" "}
				<Button>
					<div className="mx-2">
						<FaSave />
					</div>{" "}
					Save Currency
				</Button>
			</div>
		</div>
	);
}
