import React, { useState, useMemo } from "react";
import Toast from "./toasts";

import Modal from "./Modal";
import UpsertProduct from "./UpsertProduct";
import Table from "./Table";

const onetimeColumns = [
	{
		Header: "Order Id",
		accessor: "id",
	},
	{
		Header: "Product Name",
		accessor: "product_name",
	},
	{
		Header: "Amount",
		accessor: "amount",
	},
	{
		Header: "Customer Id",
		// accessor: "visibility",
		accessor: "user_id",
	},
	{
		Header: "Product Id",
		accessor: "product_id",
	},
	{
		Header: "Payment Gateway",
		accessor: "payment_gateway",
	},
];
const subscriptionsColumns = [
	{
		Header: "Order Id",
		accessor: "id",
	},
	{
		Header: "Product Name",
		accessor: "product_name",
	},
	// {
	// 	Header: "Amount",
	// 	accessor: "amount",
	// },
	{
		Header: "Customer Id",
		// accessor: "visibility",
		accessor: "user_id",
	},
	{
		Header: "Product Id",
		accessor: "product_id",
	},
	{
		Header: "Payment Gateway",
		accessor: "payment_gateway",
	},
	{
		Header: "Status",
		accessor: "status",
	},
];

const OrdersTable = ({ subscriptions, orders, setOrders }) => {
	orders = useMemo(() => orders, [orders]);
	// const [activeRow, setActiveRow] = useState(null);

	return (
		<div className="py-3">
			<h3>Ontime payments</h3>
			<Table data={orders} columns={onetimeColumns} setData={setOrders} />
			<hr className="border-4" />
			<h3 className="mt-5">Subscriptions</h3>

			<Table
				data={subscriptions}
				columns={subscriptionsColumns}
				// setData={setOrders}
			/>
		</div>
	);
};

export default OrdersTable;
