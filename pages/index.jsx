/* eslint-disable jsx-a11y/alt-text */
import Link from "next/link";
import Review from "@components/home/Review";
import Feature from "@components/home/Feature";
import Plan from "@components/home/Plan";
import Button from "@components/Button";
import plans from "../data/plans.json";
import { useRouter } from "next/router";
import features from "../data/features.json";
import reviews from "../data/reviews.json";
import reasonsToSignUp from "../data/reasonsToSingUp.json";
import { FaDiscord } from "react-icons/fa";
import { BsGraphUp, BsFillBrushFill, BsCurrencyDollar } from "react-icons/bs";
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

export default function Home(props) {
	var textColor = "text-gray-800";
	const router = useRouter();
	return (
		<div className="mb-20 flex flex-col items-stretch gap-12 md:gap-20">
			<TopHeroSection />
			<div className="pb-16">
				<WhyUseSubtoSection />
			</div>
			<FeaturesSection />
			<PlansSection />
		</div>
	);
}

function TopHeroSection() {
	return (
		<div
			id="start"
			className="p-5 flex gap-5  items-center 
				justify-center
				md:justify-evenly
				2xl:justify-between
				"
		>
			<div className="md:flex-shrink-0 flex-row md:w-[50%] lg:w-[40%]">
				<div className=" flex-col">
					<h1 className="text-center md:text-left text-gray-800 font-semibold">
						{" "}
						The customizable <br />
						<a className="text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-orange-500 to-orange-400">
							{" "}
							Payments Bot{" "}
						</a>{" "}
						you need.{" "}
					</h1>
					<PhoneImage
						className={
							"h-[300px] bg-contain relative left-1/2 -translate-x-1/2 mx-auto md:hidden "
						}
					/>
					<p className="text-gray-800 mt-3 md:text-left text-center">
						{" "}
						Minimal, fast, reliable and most importantly customizable for your
						special needs. Working with PayPal, Stripe and Crypto. Get
						analytics, organize your pasive income, have happy customers, with
						dozens of features to help you modrerate your server.{" "}
					</p>
				</div>

				<div className="flex-col mt-7 md:mt-20 my-5">
					{/* <div className="grid grid-cols-3 gap-5 w-5/6"> */}
					<div className="justify-center flex-wrap md:justify-start flex gap-5">
						<Button href="/sign-up">Sign Up</Button>
						<Button href="/support" variant="outlined">
							Contact Support
						</Button>
					</div>
				</div>
			</div>
			<PhoneImage
				className={
					"flex-grow-0 max-w-[425px] flex-shrink md:block hidden"
					// + " mr-[100px]"
				}
			/>
		</div>
	);
}

function WhyUseSubtoSection() {
	return (
		<div id="why" className="">
			<div className="mb-10">
				<h2 className=" text-center">
					Why use <span className="text-primaryGradient">subto</span>?{" "}
				</h2>
				<p
					style={{ width: "min(700px, 100%)" }}
					className="text-center my-5 mx-auto"
				>
					Join Hundrets of Business Owners Creating Automated Passive Income
					with subto.xyz using PayPal and Stripe. Accept donations,
					subscriptions, get monthly analysis on your customer growth, get
					custom discord bots, support and grow recurring revenue with ease
					while on full autopilot.
				</p>
			</div>
			<div className="flex mt-12 md:mt-16 lg:mt-24 justify-center relative xl:justify-between flex-wrap-reverse flex-row">
				<div className="relative xl:w-[47%]">
					<div className="gap-5 mt-8 sm:mt-0 sm:gap-14 xl:gap-x-14 justify-items-center xl:justify-items-start grid grid-cols-1 sm:grid-cols-2">
						{reviews.map((review, index) => {
							return (
								// <div key={index} className="inline-block">
								<Review
									className={
										(index + 1) % 2 === 0
											? "sm:justify-self-start "
											: "xl:justify-self-start sm:justify-self-end"
									}
									key={index}
									{...review}
								/>
								// </div>
							);
						})}
					</div>
					<div className="mx-auto text-center mt-10 xl:hidden">
						<Button href={"/sign-up"}>Sign Up Now!</Button>
					</div>
					{/* cloud on top */}
					<img
						className="max-w-[30%] -z-10 absolute md:-top-28 -top-10 md:-left-12"
						src="/clouds/3.png"
						alt="cloud"
					/>
					{/* cloud on bottom */}
					<img
						className="hidden md:block max-w-[30%] -z-10 absolute -bottom-20 left-[20%] "
						src="/clouds/5.png"
						alt="cloud"
					/>
				</div>

				<div className="xl:w-[40%] xl:relative">
					<h2 className="text-center xl:text-left">
						Just a few reasons to sign up right now.
					</h2>
					<ul className="leading-6 items-start text-center my-6 flex-col hidden sm:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1   list-inside sm:list-disc sm:text-left">
						{reasonsToSignUp.map((feature) => {
							return (
								<li key={feature} className="       list-item ">
									{feature}
								</li>
							);
						})}
					</ul>
					<div className={"mt-8 hidden xl:block"}>
						<Button>
							<Link href="/sign-up">Sign Up Now!</Link>
						</Button>
					</div>
					<img
						className="absolute -z-10 right-0 bottom-0"
						src="/clouds/4.png"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
}

function FeaturesSection() {
	return (
		<div className="" id="features">
			<h2 className="text-center">Features</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-12 md:mt-16 justify-items-center items-start content-center justify-center flex-wrap md:gap-20">
				{features.map((item, index) => {
					const icons = [
						<FaDiscord key={0} />,
						<BsGraphUp key={1} />,
						<BsFillBrushFill key={2} />,
						<BsCurrencyDollar key={3} />,
					];
					return (
						<Feature
							className={
								"my-3 md:my-0 xl:justify-self-center " +
								((index + 1) % 2 === 0
									? "md:justify-self-start "
									: "md:justify-self-end ")
							}
							{...item}
							key={index}
						>
							{icons[index]}
						</Feature>
					);
				})}
			</div>
		</div>
	);
}

function PlansSection() {
	return (
		<div className="" id="pricing">
			<h2 className="text-center">Plans</h2>
			<div
				css={{}}
				className="flex !gap-10 md:gap-5 items-center my-10 flex-col-reverse md:flex-row  justify-evenly lg:gap-24 mx-auto lg:justify-center"
			>
				<Plan
					price={5}
					planName={"ALL IN"}
					features={plans.allIn}
					color="primaryGradient"
				></Plan>
				<Plan
					price={6}
					planName={"START-UP"}
					features={plans.startUp}
					color={"primary"}
				></Plan>
			</div>
		</div>
	);
}

function PhoneImage({ className }) {
	return (
		<div className={`inline-block relative ${className}`}>
			<img
				className="object-contain max-h-full md:h-auto"
				src="/Phone with clouds.png"
				alt=""
			/>
		</div>
	);
}
