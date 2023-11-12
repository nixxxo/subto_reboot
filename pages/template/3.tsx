import Product from "@components/Product";
import { Prisma } from "@prisma/client";
import React from "react";
import GlobeBtn from "../../components/GlobeBtn";

interface ITemplateThree {
	customization: Prisma.DiscordServerCustomizationSelect;
	products: Prisma.ProductSelect[];
	onClickProduct(product: Prisma.ProductSelect): any;
}

export default function TempalteThree({
	customization = {},
	products,
	onClickProduct,
}: ITemplateThree) {
	const { mainColor, perks, cover, secColor, website } = customization;
	return (
		<div className="scale-90 origin-top my-10  items-start justify-center mx-auto flex gap-24	px-2	 flex-wrap">
			<div
				style={{
					backgroundColor: mainColor as unknown as string,
					height: "875px",
					width: "min(612px, 95%)",
				}}
				className=" p-2  relative py-8 md:py-16  md:p-5 flex flex-col items-center gap-10  rounded-lg  bg-gray-400"
			>
				<div
					className=" bg-gray-300 bg-center bg-no-repeat bg-cover grid place-items-center p-10 rounded-lg"
					style={{
						backgroundImage: `url('${cover}')` as unknown as string,
						height: "300px",
						width: "90%",
					}}
				></div>
				<h4 className="text-center text-[16px] md:text-[27px]  text-white">
					{perks}
					{/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab
					laudantium sequi, reprehenderit, laboriosam, sunt sapiente vero quam
					id quisquam nihil tempora ea tenetur ratione laborum necessitatibus
					commodi deleniti. Necessitatibus expedita laboriosam doloremque! Eum
					cumque eaque vel quas iure odit exercitationem? Aliquid, laborum omnis
					quas natus porro error tempora maiores modi reiciendis, quam quo rem?
					Exercitationem, assumenda quibusdam enim corrupti asperiores facilis
					saepe deserunt voluptate tenetur qui dolor? Voluptate architecto
					minusminus */}
				</h4>
				<div className="absolute -bottom-0 translate-y-[50%]">
					<GlobeBtn
						mainColor={mainColor}
						secColor={secColor}
						href={website}
					></GlobeBtn>
				</div>
			</div>
			<div
				style={{ height: "875px", overflow: "auto" }}
				className=" flex-col  justify-between  flex gap-7  max-w-[1130px]"
			>
				{!products &&
					Array(3)
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
