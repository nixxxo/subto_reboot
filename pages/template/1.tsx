import Product from "@components/Product";
import { Prisma } from "@prisma/client";
import React from "react";
import GlobeBtn from "../../components/GlobeBtn";

interface ITemplateOne {
	customization: Prisma.DiscordServerCustomizationSelect;
	products?: Prisma.ProductSelect[];
	onClickProduct(product: Prisma.ProductSelect): any;
}

export default function TemplateOne({
	customization = {},
	products,
	onClickProduct,
}: ITemplateOne) {
	const { cover, mainColor, secColor, website } = customization;
	return (
		<div className="scale-90 origin-top ">
			<Background
				mainColor={mainColor}
				secColor={secColor}
				website={website}
				cover={cover}
			></Background>
			<div className="my-24 justify-center mx-auto flex gap-10 flex-wrap max-w-[1130px]">
				{!products &&
					Array(6)
						.fill(0)
						.map((item, index) => {
							return (
								<Product
									secColor={secColor as unknown as string}
									mainColor={mainColor as unknown as string}
									key={index}
								/>
							);
						})}
				{products &&
					products.map((product, index) => {
						return (
							<Product
								onClickUpgrade={onClickProduct}
								secColor={secColor as unknown as string}
								mainColor={mainColor as unknown as string}
								product={product}
								key={index}
							/>
						);
					})}
			</div>
		</div>
	);
}

function Background({ mainColor, secColor, cover, website }) {
	return (
		<div className="relative">
			<div className="h-[250px] md:h-[300px] relative grid place-items-center  ">
				<div className="translate-y-[50%] absolute bottom-0 ">
					<GlobeBtn mainColor={mainColor} secColor={secColor} href={website} />
				</div>
			</div>
			<div
				style={{ backgroundImage: `url('${cover}')` }}
				className="bg-center bg-no-repeat bg-cover absolute -z-10 top-0 h-full w-screen left-[50%] -translate-x-[50%] bg-gray-300"
			></div>
		</div>
	);
}
