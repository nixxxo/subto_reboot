import React, { useState, useMemo } from "react";
import Toast from "./toasts";

import Modal from "./Modal";
import UpsertProduct from "./UpsertProduct";
import Table from "./Table";

const columns = [
	{
		Header: "Id",
		accessor: "id",
	},
	{
		Header: "Name",
		accessor: "name",
	},
	{
		Header: "Visibility",
		// accessor: "visibility",
		id: "visible",
		accessor: (d) => (d.visibility ? "Visble" : "Hidden"),
	},
	{
		Header: "Price",
		accessor: "price",
	},
	{
		Header: "Billing Frequency",
		accessor: "billingFrequency",
	},
	{
		Header: "Gross Earnings",
		accessor: "grossEarnings",
	},
	{
		Header: "Net Earnings",
		accessor: "netEarnings",
	},
	{
		Header: "Active",
		accessor: (d) => (d.active ? "Active" : "Inactive"),

		id: "active",
	},
	{
		Header: "Cancelling",
		accessor: "cancelling",
	},
	{
		Header: "Cancelled",
		accessor: "cancelled",
	},
];

const ProductsTable = ({ products, setProducts }) => {
	products = useMemo(() => products, [products]);
	const [activeRow, setActiveRow] = useState(null);

	return (
		<div>
			<Table
				onClickRow={setActiveRow}
				data={products}
				columns={columns}
				setData={setProducts}
			/>
			<Modal open={Boolean(activeRow)} onClose={() => setActiveRow(null)}>
				{activeRow && (
					<UpsertProduct
						closeModal={() => setActiveRow(null)}
						setProducts={setProducts}
						id={activeRow.id}
						initialBillingFrequency={activeRow.billingFrequency}
						initialName={activeRow.name}
						initialPrice={activeRow.price}
						initialVisibility={activeRow.visibility}
					></UpsertProduct>
				)}
			</Modal>
			<Toast />
		</div>
	);
};

export default ProductsTable;
