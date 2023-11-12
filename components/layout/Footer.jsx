import Image from "next/image";
import Link from "next/link";

const Footer = ({ maxWidth }) => {
	var textColor = "text-gray-800";

	return (
		<div
			style={{
				backgroundPositionX: "75%",
				backgroundImage: "url('/footer-background.png')",
				backgroundSize: "cover",
			}}
			className="md:bg-center bg-no-repeat overflow-hidden"
		>
			<div
				style={{ width: `min(100%, ${maxWidth}px)` }}
				className="pb-2 pt-2  overflow-hidden md:pt-20 px-2  flex flex-col items-center mx-auto
        justify-between content-center"
			>
				<div className="flex items-center lg:items-start justify-center lg:justify-start  self-stretch flex-col lg:flex-row text-gray-800">
					<div className="flex my-10 lg:hidden">
						<Navigation />
					</div>
					<About />
				</div>
				{/* Last row below */}
				<div
					style={{ height: "60px" }}
					className="flex-col  self-stretch  mt-3 "
				>
					<div className="flex   h-full items-center lg:justify-between justify-evenly gap-2 content-center">
						<div className="hidden  lg:flex">
							<Navigation />
						</div>

						<img
							alt="payment cards"
							className="object-contain h-[20px] md:h-[25px]   lg:h-[30px]"
							src="/payments.png"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

function About() {
	return (
		<div className="flex flex-col mt-2  md:mt-0 md:w-[350px] h-full  justify-end">
			<img
				alt="Logo"
				className="object-contain max-w-full h-[80px] md:h-[110px] "
				src="/subto2.png"
			/>
		</div>
	);
}

function Navigation() {
	const className =
		"px-1 lg:px-2 text-lg  mb-1 hover:underline font-bold underline-offset-1";
	var listH4 = className;

	return (
		<div className="flex gap-3 uppercase text-center md:text-left items-center md:items-start text-gray-800 flex-col md:flex-row">
			<Link href="/faq" className={listH4}>
				<a className={className}>FAQ</a>
			</Link>
			<Link href="/terms-of-service" className={listH4}>
				<a className={className}>Terms of Service</a>
			</Link>

			<Link href="/privacy-policy" className={listH4}>
				<a className={className}>Privacy Policy</a>
			</Link>
			<Link href="https://discord.gg/ECPqVnJd5V" className={listH4}>
				<a className={className}>Join Discord</a>
			</Link>
		</div>
	);
}

export default Footer;
