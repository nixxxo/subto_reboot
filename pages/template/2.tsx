import Product from "@components/Product";
import { Prisma } from "@prisma/client";
import React from "react";
import GlobeBtn from "../../components/GlobeBtn";

interface ITemplateTwo {
	customization: Prisma.DiscordServerCustomizationSelect;
	products: Prisma.ProductSelect[];
	onClickProduct(product: Prisma.ProductSelect): any;
}

export default function TempalteTwo({
	customization = {},
	products,
	onClickProduct,
}: ITemplateTwo) {
	const { mainColor, secColor, video, website } = customization;

	return (
		<div className="scale-90 origin-top my-5 md:my-10 ">
			<div className="max-w-[1050px] mx-auto aspect-[16/9] relative   ">
				<video
					autoPlay
					muted
					loop
					controls
					src={video as unknown as string}
					className="bg-gray-300 w-full h-full"
				></video>

				{/* <Video /> */}
				<div className="absolute left-[50%] -translate-x-[50%] translate-y-[50%] bottom-0">
					<GlobeBtn
						mainColor={mainColor}
						secColor={secColor}
						href={website}
					></GlobeBtn>
				</div>
			</div>
			<div className="mt-16 mb-24 justify-center  mx-auto flex gap-12 flex-wrap max-w-[1130px]">
				{!products &&
					Array(6)
						.fill(0)
						.map((item, index) => {
							return (
								<Product
									mainColor={mainColor as unknown as string}
									secColor={secColor as unknown as string}
									key={index}
								/>
							);
						})}
				{products &&
					products.map((product, index) => {
						return (
							<Product
								onClickUpgrade={onClickProduct}
								product={product}
								mainColor={mainColor as unknown as string}
								secColor={secColor as unknown as string}
								key={index}
							/>
						);
					})}
			</div>
		</div>
	);
}
