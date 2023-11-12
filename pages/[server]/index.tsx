import getDiscordServerCustomization from "@utils/db/discord-customizations/getDiscordServerCustomization";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Prisma } from "@prisma/client";
import TemplateOne from "pages/template/1";
import TemplateTwo from "pages/template/2";
import TemplateThree from "pages/template/3";
import { useState } from "react";
import Link from "next/link";
import Button from "@components/Button";
import { useSession } from "next-auth/react";
import prismaClient from "@utils/db/prismaClient";
import Modal from "@components/Modal";
import { FaCcPaypal, FaCcStripe } from "react-icons/fa";
import IconButton from "@components/IconButton";
import PayFromPaypal from "@components/PayFromPaypal";
import axios from "axios";
import LoadingScreen from "@components/progress/LoadingScreen";
import Toast, { launchErrorToast } from "@components/toasts";

interface IServerProdcuts {
	customization: Prisma.DiscordServerCustomizationSelect;
	products: Prisma.ProductSelect[];
	paymentInfo: IPaymentInfo;
	serverfound: boolean;
}

export default function ServerProducts({
	customization = {},
	products,
	paymentInfo,
	serverfound,
}: IServerProdcuts) {
	const [selectedProduct, setSelectedProduct] = useState(
		null as Prisma.ProductSelect
	);
	const [gettingStripeUrl, setGettingStripeUrl] = useState(false);
	const [gettingPaypalUrl, setGettingPaypalUrl] = useState(false);
	if (!serverfound) return <h1>404. Server not found.</h1>;
	customization = customization || {};
	const template = customization.template as unknown as number;
	const { logo } = customization;

	function onClickProduct(product: Prisma.ProductSelect) {
		setSelectedProduct(product);
	}
	async function onClickStripe(product: Prisma.ProductSelect) {
		setGettingStripeUrl(true);
		try {
			const res = await axios.post(
				"/api/payments/stripe/create-checkout-session",
				{ product }
			);
			window.open(res.data);
		} catch (err) {
			launchErrorToast("Something went wrong. Please try again later");
			console.log(err);
		} finally {
			setGettingStripeUrl(false);
		}
	}
	async function onClickPaypal() {
		setGettingPaypalUrl(true);
		try {
			const res = await axios.post(
				"/api/payments/paypal/subscription/create-subscription",
				{ product: selectedProduct }
			);
			window.open(res.data);
		} catch (err) {
			launchErrorToast("Something went wrong. Please try again later");
			console.log(err);
		} finally {
			setGettingPaypalUrl(false);
		}
	}

	return (
		<div>
			<div className="fixed left-0 top-0 z-50 w-full">
				<Navbar logo={logo} accountName={customization.accountName} />
			</div>
			{template === 2 && (
				<TemplateTwo
					onClickProduct={onClickProduct}
					products={products}
					customization={customization}
				/>
			)}
			{template === 3 && (
				<TemplateThree
					onClickProduct={onClickProduct}
					products={products}
					customization={customization}
				/>
			)}
			{template !== 3 && template !== 2 && (
				<TemplateOne
					onClickProduct={onClickProduct}
					products={products}
					customization={customization}
				/>
			)}
			<Modal
				open={Boolean(selectedProduct)}
				onClose={() => setSelectedProduct(null)}
			>
				<div className="bg-white rounded-xl p-5 relative">
					<h2 className="text-center mb-3">Pay using</h2>
					<div className="flex justify-evenly text-8xl">
						{paymentInfo.paypalEnabled && (
							<div>
								{(selectedProduct &&
									(selectedProduct.billingFrequency as unknown as string)) ===
								"onetime" ? (
									<PayFromPaypal
										product={selectedProduct}
										merchant_id={paymentInfo.paypalMerchantId}
									/>
								) : (
									<></>
									// <IconButton onClick={onClickPaypal} className="text-8xl">
									// 	<FaCcPaypal color="#0070ba" />
									// </IconButton>
								)}

								{/* */}
							</div>
						)}
						{paymentInfo.stripeEnabled && (
							<IconButton
								onClick={() =>
									onClickStripe(selectedProduct as Prisma.ProductSelect)
								}
								className="text-8xl"
							>
								<FaCcStripe color="#635bff" />
							</IconButton>
						)}
					</div>
					{!paymentInfo.stripeEnabled &&
						(!paymentInfo.paypalEnabled ||
							(selectedProduct &&
								(selectedProduct.billingFrequency as any) ===
									"recurring_monthly")) && (
							<h3 className="text-red-500">
								Unfortunately, the creator is not accepting payments for the
								products right now. Please try again later or contact support.
							</h3>
						)}
				</div>
				{(gettingStripeUrl || gettingPaypalUrl) && <LoadingScreen />}
			</Modal>
			<Toast />
		</div>
	);
}

const Navbar = ({ logo, maxWidth = "1520px", accountName }) => {
	return (
		<div className="bg-gray-100 px-5  md:px-6 w-screen z-50 flex items-center sticky top-0 left-0 shadow-lg h-20">
			<div
				style={{ width: `min(100%, ${maxWidth})` }}
				className="flex h-full flex-row items-center mx-auto justify-between p-1 gap-3"
			>
				<div className="flex flex-shrink gap-2 h-full items-center">
					<button className="max-w-[120px] md:w-[100px] flex-shrink   md:min-w-[140px] transition-all duration-300 h-full md:p-2  hover:scale-105">
						<Link href="/">
							<img
								alt="Logo"
								className="object-contain h-full"
								src="/logo_main.png"
							/>
						</Link>
					</button>
				</div>
				<div className="flex items-center gap-2 md:gap-5">
					<div
						style={{ backgroundImage: `url('${logo}')` }}
						className="h-12 bg-center bg-no-repeat bg-cover w-12 rounded-full bg-slate-300"
					></div>
					{accountName && <h6>{accountName}</h6>}
				</div>
				<div className="flex flex-row items-center justify-end ">
					<SignInButton />
				</div>
			</div>
		</div>
	);
};

const SignInButton = () => {
	const { data: session } = useSession();

	return (
		<div className="basis-0 ">
			<Button
				className="bg-primaryGradient"
				href={session ? "dashboard" : "/sign-up"}
			>
				{session ? "Dashboard" : "Sign Up"}
			</Button>
		</div>
	);
};

interface IPaymentInfo {
	stripeEnabled: boolean;
	paypalEnabled: boolean;
	plan: number;
	paypalMerchantId: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { product, discordServer } = prismaClient;
	const serverId = ctx.query.server;
	const [customization, products, discord_server] = await Promise.all([
		getDiscordServerCustomization(serverId as string),
		getProducts(serverId),
		getDiscordServer(serverId),
	]);
	if (!discord_server) {
		return { props: { serverfound: false } };
	}
	const { plan, stripe, paypal } = discord_server;
	const paymentInfo: IPaymentInfo = {
		stripeEnabled: stripe && stripe.enabled && stripe.charges_enabled,
		paypalEnabled: paypal && paypal.enabled && paypal.payments_receivable,
		plan,
		paypalMerchantId: paypal && paypal.merchant_id,
	};

	async function getDiscordServer(serverId) {
		return await discordServer.findUnique({
			where: {
				id: serverId as string,
			},
			include: {
				stripe: true,
				paypal: true,
			},
		});
	}

	async function getProducts(serverId) {
		return await product.findMany({
			where: {
				discord_server_db_id: serverId as string,
				visibility: true,
			},
		});
	}

	return {
		props: {
			serverfound: true,
			customization,
			products,
			paymentInfo,
		},
	};
};
