import Button from "@components/Button";
import CInputField from "@components/InputField";
import Toast, {
	lanuchSuccessToast,
	launchErrorToast,
} from "@components/toasts";
Templates;
import { Prisma } from "@prisma/client";
import deepEqual from "@utils/deepEqual";
import axios from "axios";
import { getCookie } from "cookies-next";
import { FormEvent, useEffect, useState } from "react";
import Templates from "./settings/Templates";
import Plan from "@components/home/Plan";
import plans from "../../data/plans.json";
import LoadingScreen from "@components/progress/LoadingScreen";
import { useDiscordServer } from "@utils/contexts/DiscordServerProvider";
import { useDiscordServers } from "@utils/contexts/DiscordServersProvider";
import StorePlan from "./settings/StorePlan";

interface IStoreSettings {
	customization: Prisma.DiscordServerCustomizationSelect;
	setCustomizations(...args: any[]): any;
	initialState: any;
	setSavedCustomizations(...args: any[]): any;
}

enum EserverRes {
	"success",
	"error",
	"null",
}

interface ICustomizationState {
	customization: Prisma.DiscordServerCustomizationSelect;
	setCustomization(...args: any[]): any;
}
launchErrorToast;
export default function StoreSettings({
	customization,
	setCustomizations,
	initialState: initialCustomization,
	setSavedCustomizations,
}: IStoreSettings) {
	const [discordServers] = useDiscordServers();

	const [discordServer] = useDiscordServer();

	const [portalSessionUrl, setPortalSessionURL] = useState(null);
	// console.log(discordServer.plan, typeof discordServer.plan);
	const [saving, setSaving] = useState(false);
	const [serverRes, setServerRes] = useState(EserverRes.null);
	const [gettingLinkForPlanUpgrade, setGettingLinkForPlanUpgrade] =
		useState(false);
	useEffect(() => {
		async function namedFunction() {
			if ((Number(discordServer.plan) as unknown as number) !== 1) return;
			if (discordServers.length === 0) return;
			const url = `/api/merchant-subscription/create-portal-session?discord_server_id=${discordServer.id}`;
			let sessionURL;
			await axios
				.get(url)
				.then((res) => {
					setPortalSessionURL(res.data);
				})
				.catch((err) => {
					console.log("Error");
					launchErrorToast(
						"Something went wrong while setting up billing managmement"
					);
				});
		}
		namedFunction();
	}, [discordServer, discordServers]);

	let setCustomization = function (func) {
		setCustomizations((customizations) => {
			let customizationLocal = customizations.find(
				(customizationLocal: typeof customization) => {
					if (!customizationLocal) return false;
					return (
						customizationLocal.discordServerId === customization.discordServerId
					);
				}
			);
			customizationLocal =
				typeof func === "function"
					? func(customizationLocal)
					: customizationLocal;
			customizations = customizations.filter(
				(customization) =>
					customization &&
					customization.discordServerId !== customizationLocal.discordServerId
			);
			const newCustomizations = [...customizations, customizationLocal];
			return newCustomizations;
		});
	};

	function onClickSave(e: FormEvent) {
		e.preventDefault();
		setSaving(true);
		// console.log(customization);
		axios
			.post("/api/dashboard/updateDiscordServerCustomization", customization)
			.then((res) => {
				// console.log(res);
				setServerRes(EserverRes.success);
				// setSuccessServerMsg("Successfully updated customizations");
				lanuchSuccessToast("Successfully updated customizations");

				setSavedCustomizations((customizations) => {
					let newCustomizations = customizations.filter((c) => {
						return customization.discordServerId !== c.discordServerId;
					});
					return [...newCustomizations, res.data];
				});
				setCustomization((c) => ({ ...c, ...res.data }));
			})
			.catch((err) => {
				setServerRes(EserverRes.error);
				// setErrorServerMsg(err.response.data);
				launchErrorToast(err.response.data ?? "Somethign went wrong");
			})
			.finally(() => {
				setSaving(false);
			});
	}

	function onClickPlanUpgrage() {
		setGettingLinkForPlanUpgrade(true);
		const url = `/api/merchant-subscription/create-checkout-session?discord_server_id=${discordServer.id}`;
		axios
			.get(url)
			.then((res) => {
				window.open(res.data, "_self");
			})
			.catch((err) => {
				launchErrorToast(
					"Something went wrong. Please try again later or contact support."
				);
				// launchErrorToast(err.response.data);
			})
			.finally(() => {
				setGettingLinkForPlanUpgrade(false);
			});
	}
	return (
		<form onSubmit={onClickSave}>
			<h1 className="text-xl md:text-3xl text-center">
				Store Checkout Page Settings
			</h1>
			<div className=" relative my-3">
				{gettingLinkForPlanUpgrade && <LoadingScreen></LoadingScreen>}
				{(Number(discordServer.plan) as unknown as number) !== 1 ? (
					<StorePlan
						onClickBtn={onClickPlanUpgrage}
						price={3}
						href={null}
						planName={"ALL IN"}
						features={plans.allIn}
						color="primaryGradient"
					></StorePlan>
				) : (
					<div className="flex w-full justify-center my-5">
						<Button
							disabled={!portalSessionUrl}
							type="button"
							href={portalSessionUrl}
						>
							Manage Subscription and Billing
						</Button>
					</div>
				)}
			</div>
			<div className="flex gap-10 flex-col md:flex-row w-full justify-around">
				<Info
					customization={customization}
					setCustomization={setCustomization}
				/>
				<Links
					customization={customization}
					setCustomization={setCustomization}
				/>
			</div>
			<Templates
				customization={customization}
				setCustomization={setCustomization}
			/>
			<div className="flex justify-center my-2">
				<Button
					// onClick={onClickSave}
					disabled={deepEqual(initialCustomization, customization)}
					loading={saving}
				>
					Save
				</Button>
			</div>
			<Toast />
		</form>
	);
}

function Info({ customization, setCustomization }: ICustomizationState) {
	return (
		<div className="w-full md:w-6/12">
			<h2 className="text-slate-800 border-b-2 text-lg">Information</h2>
			<div className="flex flex-col">
				<CInputField
					onChange={(e) =>
						setCustomization((c) => ({ ...c, accountName: e.target.value }))
					}
					required
					label="Account Name"
					placeholder={"Account Name"}
					value={customization.accountName as unknown as string}
				/>
				<CInputField
					onChange={(e) =>
						setCustomization((c) => ({ ...c, tagline: e.target.value }))
					}
					value={customization.tagline as unknown as string}
					label="Tagline"
					placeholder="Tagline"
				/>
				<div className="flex flex-col my-1 md:my-1.5">
					<label className="ml-1 mb-0.5 text-xs md:text-sm text-slate-400">
						Terms of Service
					</label>
					<textarea
						onChange={(e) =>
							setCustomization((c) => ({ ...c, terms: e.target.value }))
						}
						required
						value={(customization.terms as unknown as string) ?? ""}
						className="rounded-lg p-1.5 outline-1 outline-slate-400 text-sm md:text-base"
						placeholder={"Terms of Service"}
					/>
				</div>
			</div>
		</div>
	);
}

function Links({ customization, setCustomization }: ICustomizationState) {
	return (
		<div className="w-full md:w-6/12">
			<h2 className="text-slate-800 border-b-2 text-lg">Links</h2>
			<CInputField
				onChange={(e) =>
					setCustomization((c) => ({ ...c, storeLink: e.target.value }))
				}
				label="Subto URL (https://subto.xyz/[your link here])"
				value={customization.storeLink as unknown as string}
				placeholder={String(getCookie("selectedServerId"))}
			/>
			<CInputField
				required
				onChange={(e) =>
					setCustomization((c) => ({ ...c, redirect: e.target.value }))
				}
				value={customization.redirect as unknown as string}
				label="Redirect URL"
				placeholder="Redirect URL"
			/>
			<CInputField
				required
				onChange={(e) =>
					setCustomization((c) => ({ ...c, website: e.target.value }))
				}
				value={customization.website as unknown as string}
				label="Website"
				placeholder="Website"
			/>
		</div>
	);
}
