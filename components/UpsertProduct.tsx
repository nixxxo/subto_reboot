import { useState, FormEvent, useEffect } from "react";
import {
	Listbox,
	ListboxOptions,
	ListboxOption,
	ListboxButton,
} from "@components/Listbox";
import Switch from "@components/Switch";
import axios from "axios";
import Toast, {
	lanuchSuccessToast,
	launchErrorToast,
} from "@components/toasts";
import LoadingScreen from "@components/progress/LoadingScreen";
import { useDiscordServer } from "@utils/contexts/DiscordServerProvider";
import Button from "@components/Button";
import InputField from "@components/InputField";
import { AiFillDelete } from "react-icons/ai";
import IconButton from "./IconButton";
import Modal from "./Modal";

export default function UpsertProduct({
	initialName = "",
	initialId = "",
	initialPrice = 1,
	initialBillingFrequency = "onetime",
	initialVisibility = true,
	id = null,
	setProducts,
	closeModal,
}) {
	const [productName, setProductName] = useState(initialName);
	const [productId, setProductId] = useState(initialId);
	const [price, setPrice] = useState(initialPrice / 100);
	const [billingFrequency, setBillingFrequency] = useState(
		initialBillingFrequency
	);
	const [visibility, setVisibility] = useState(initialVisibility);
	const [submittingFrom, setSubmittingFrom] = useState(false);
	const [discordServer] = useDiscordServer();
	const [requestDelete, setRequestDelete] = useState(false);
	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setSubmittingFrom(true);
		const data = {
			discord_server_db_id: discordServer.id,
			discord_role_id:parseInt(productId),
			name: productName,
			price: price * 100,
			billingFrequency,
			visibility,
		};
		const url = `/api/dashboard/products/${
			!id ? "addNewProduct" : `updateProduct?id=${id}`
		}`;
		axios
			.post(url, data)
			.then((res) => {
				if (!id) {
					setProducts((p) => [...p, res.data]);
				} else {
					setProducts((products) => {
						const newProducts = products.filter((product) => product.id !== id);
						newProducts.push(res.data);
						return newProducts;
					});
				}
				lanuchSuccessToast("Success!");
				closeModal();
			})
			.catch((err) => {
				console.log(err);
				launchErrorToast(err.response.data);
			})
			.finally(() => {
				setSubmittingFrom(false);
			});
	}

	function onDelete() {
		setSubmittingFrom(true);
		const data = {
			discord_server_db_id: discordServer.id,
		};
		const url = `/api/dashboard/products/deleteProduct?id=${id}`;
		axios
			.post(url, data)
			.then((res) => {
				setProducts((products) => {
					const newProducts = products.filter((product) => product.id !== id);
					return newProducts;
				});

				lanuchSuccessToast("Success deleting!");
				closeModal();
			})
			.catch((err) => {
				console.log(err);
				launchErrorToast("Something went wrong. Please tra again later.");
			})
			.finally(() => {
				setSubmittingFrom(false);
			});
	}

	return (
		<form
			onSubmit={onSubmit}
			className="relative flex flex-col items-stretch gap-5 bg-white p-5 rounded-lg"
		>
			<InputField
				required
				placeholder="Product name"
				value={productName}
				onChange={(e) => setProductName(e.target.value)}
				label="Product name"
			></InputField>
			<InputField
				required
				placeholder="Discord Role Id"
				value={productId}
				onChange={(e) => setProductId(e.target.value)}
				label="RoleId"
			></InputField>
			<InputField
				min={1}
				step={1}
				type="number"
				required
				value={price}
				onChange={(e) =>
					setPrice(isNaN(Number(e.target.value)) ? 0 : Number(e.target.value))
				}
				label="Price (in dollars)"
			></InputField>
			<Listbox
				value={billingFrequency}
				onChange={(value) => setBillingFrequency(value)}
			>
				<ListboxButton>
					Billing Interval - &nbsp;
					{billingFrequency === "onetime" ? "One time" : "Monthly"}
				</ListboxButton>
				<ListboxOptions>
					<ListboxOption value="onetime">One time</ListboxOption>
					<ListboxOption value="recurring_monthly">Monthly</ListboxOption>
				</ListboxOptions>
			</Listbox>
			<div className="flex justify-between my-2">
				<div>Hidden</div>
				<Switch
					checked={!visibility}
					onChange={(checked) => setVisibility(!checked)}
				/>
			</div>
			<div className="flex justify-evenly">
				<Button type="submit"> Save</Button>
				{id && (
					<IconButton onClick={() => setRequestDelete(true)}>
						<AiFillDelete color="red" />
					</IconButton>
				)}
				<Modal open={requestDelete} onClose={() => setRequestDelete(false)}>
					<div className="bg-white text-center  p-5 max-w-[500px]">
						<h2 className="leading-10">
							Are you sure you want to delete this product?
						</h2>
						<div className="my-10 gap-5 flex justify-center">
							<button
								type="button"
								className="p-3 rounded-xl bg-slate-400 text-white"
								onClick={() => setRequestDelete(false)}
							>
								Cancel
							</button>
							<button
								type="button"
								className="text-white rounded-xl p-3 bg-red-500"
								onClick={() => {
									setRequestDelete(false);
									onDelete();
								}}
							>
								Confirm
							</button>
						</div>
					</div>
				</Modal>
			</div>
			<Toast />
			{submittingFrom && <LoadingScreen></LoadingScreen>}
		</form>
	);
}
