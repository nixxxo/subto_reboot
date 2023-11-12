import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import InputField from "./InputField";

export function GlobalFilter({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
}) {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 300);

	return (
		<div className="max-auto flex flex-wrap justify-center items-center">
			<h2 className="  text-xl text-gray-600 mr-3">Search:</h2>
			<InputField
				// className=" h-8 border border-solid border-primary outline-none p-4 rounded-lg"
				value={value || ""}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				placeholder={`${count} records...`}
			/>
		</div>
	);
}
