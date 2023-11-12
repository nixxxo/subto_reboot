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
		Header: "Email",
		accessor: "email",
	},
	{
		Header: "Name",
		accessor: "name",
	},
	{
		Header: "Orders",
		// accessor: "visibility",
		accessor: "orders",
	},
];

const CustomersTable = ({ customers }) => {
	customers = useMemo(() => customers, [customers]);

	return (
		<div className="py-3">
			<Table data={customers} columns={columns} />
		</div>
	);
};

export default CustomersTable;
