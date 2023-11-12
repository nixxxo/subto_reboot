import { Prisma } from "@prisma/client";
import React from "react";
import Button from "./Button";
/** @jsxImportSource @emotion/react */

interface IProduct {
	product?: Prisma.ProductSelect | any;
	mainColor?: string;
	secColor?: string;
	onClickUpgrade?(prodcut: Prisma.ProductSelect): any;
}

export default function Product({
	mainColor,
	secColor,
	product = {},
	onClickUpgrade,
}: IProduct) {
	return (
		<div
			style={{ backgroundColor: mainColor }}
			className="bg-gray-400 w-[280px] md:w-[320px] inline-flex flex-col gap-5  md:gap-8 text-center py-4  md:py-6 p-4  rounded-2xl shadow-lg"
		>
			<div>
				<h3 className="uppercase ">{product.name || "Product name"}</h3>

				<hr className="border-slate-900 mt-2" />
			</div>
			<div>
				<h2 className="lg:text-[36px]">
					{(product.price as unknown as number) / 100 || 0} USD
				</h2>
				<h5 className="lg:text-[21.5px]">
					{(product.billingFrequency as unknown as string) === "onetime"
						? "One-time"
						: "per month"}
				</h5>
			</div>
			<div className=" self-center">
				<Button
					onClick={() => onClickUpgrade(product)}
					css={{
						backgroundColor: secColor,
						"*": {
							backgroundColor: secColor,
						},
					}}
					bgColor="bg-slate-600"
					className=""
				>
					Upgrade
				</Button>
			</div>
		</div>
	);
}
