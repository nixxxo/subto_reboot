import React from "react";
import { MdOutlineLanguage } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";

export default function GlobeBtn({ href, mainColor, secColor }) {
	const router = useRouter();
	return (
		<Link href={href ?? router.asPath}>
			<a>
				<button
					style={{
						backgroundImage:
							mainColor &&
							secColor &&
							`linear-gradient(135deg, ${mainColor} 0%, ${secColor} 100%)`,
					}}
					className="text-white hover:scale-105 duration-150 stroke-white fill-white grid place-items-center text-4xl md:text-5xl font-normal rounded-full bg-primaryGradient h-[60px] w-[60px] md:h-[75px] md:w-[75px]"
				>
					{/* <MdOutlineLanguage /> */}
					<BsGlobe />
				</button>
			</a>
		</Link>
	);
}
