import Button from "@components/Button";
import InputField from "@components/InputField";
import Modal from "@components/Modal";
import ProductsTable from "@components/ProductsTable";
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
import UpsertProduct from "@components/UpsertProduct";

export default function Products({}) {
	const [newProductDialogOpen, setNewProductDialog] = useState(false);
	const [discordServer] = useDiscordServer();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		function fetchProducts() {
			const url = `/api/dashboard/products/getProducts?db_id=${discordServer.id}`;
			axios
				.get(url)
				.then((res) => {
					setProducts(res.data);
				})
				.catch((err) => {
					console.log(err);
					launchErrorToast("Something went wrong while fetching products!");
				});
		}
		if (discordServer && discordServer.id) fetchProducts();
	}, [discordServer]);
	if (!discordServer) return <h2>Not discord server selected</h2>;
	return (
		<div className="bg-white p-3">
			<div className="flex gap-2 items-center justify-evenly flex-wrap sm:justify-between">
				<h2>Products</h2>
				<Button bgColor="bg-primary" onClick={() => setNewProductDialog(true)}>
					New Product
				</Button>
				<Modal
					open={newProductDialogOpen}
					onClose={() => setNewProductDialog(false)}
				>
					<UpsertProduct
						closeModal={() => setNewProductDialog(false)}
						setProducts={setProducts}
					/>
				</Modal>
			</div>
			<ProductsTable setProducts={setProducts} products={products} />
		</div>
	);
}
