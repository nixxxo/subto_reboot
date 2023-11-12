import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { CSVLink } from "react-csv";
import { AiOutlineDownload } from "react-icons/ai";
import Tooltip from "rc-tooltip";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
/** @jsx jsx */

function convertToCSV(arr) {
	const array = [Object.keys(arr[0])].concat(arr);

	return array
		.map((it) => {
			return Object.values(it).toString();
		})
		.join("\n");
}

import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";
import Button from "./Button";
import { GlobalFilter } from "./GlobalFilter";
import Pagination from "./Pagination";
import "rc-tooltip/assets/bootstrap_white.css";

interface ITable {
	columns: any;
	data: any;
	setData?(...args: any[]): any;
	onClickRow?(...args: any[]): any;
}

const Table = ({ onClickRow, columns, data = [], setData }: ITable) => {
	data = useMemo(() => data, [data]);
	columns = useMemo(() => columns, [columns]);
	// const [activeRow, setActiveRow] = useState(null);
	const tableInstance = useTable(
		{ data, columns, initialState: { pageIndex: 0 } },
		useGlobalFilter,
		useSortBy,
		usePagination
	);
	const {
		getTableProps,
		pageOptions,
		state: { pageIndex, pageSize },
		canPreviousPage,
		canNextPage,
		pageCount,

		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		preGlobalFilteredRows,
		setGlobalFilter,
		state,
		getTableBodyProps,
		headerGroups,
		rows,
		page,
		prepareRow,
	} = tableInstance;

	return (
		<div className="w-full max-w-full px-2 py-2  my-3 mx-auto overflow-hidden">
			<div className="flex flex-wrap items-center justify-evenly my-3 sm:justify-between">
				<GlobalFilter
					preGlobalFilteredRows={preGlobalFilteredRows}
					setGlobalFilter={setGlobalFilter}
					globalFilter={state.globalFilter}
				/>
				{data[0] && (
					<CSVLink data={convertToCSV(data)}>
						<Tooltip
							overlay={<span>Download CSV</span>}
							// onMouseLeave={() => ReactTooltip.hide()}

							placement="top"
						>
							<div
								css={{
									"*": {
										padding: "2px 3.5px !important",
									},
								}}
							>
								<Button bgColor="bg-primary">
									<AiOutlineDownload fontSize={28} fontWeight={"bold"} />
								</Button>
							</div>
						</Tooltip>
						{/* </Tooltip> */}
					</CSVLink>
				)}
			</div>
			<div className="flex justify-center">
				<table
					className="mb-10 inline-block shadow-xl max-w-full mx-auto rounded-xl  p-2 border-2    overflow-auto"
					{...getTableProps}
				>
					<thead className=" rounded-xl  p-2 border  bg-slate-200 ">
						{headerGroups.map((headerGroup, index) => {
							return (
								<tr
									className=" p-1 rounded-xl "
									key={index}
									{...headerGroup.getHeaderGroupProps()}
								>
									{headerGroup.headers.map((column, index) => {
										return (
											<th
												className="p-2 border  select-none"
												key={index}
												{...column.getHeaderProps(
													(column as any).getSortByToggleProps()
												)}
											>
												{column.render("Header")}
												{column.isSorted
													? column.isSortedDesc
														? "⬇️"
														: "⬆️"
													: ""}
											</th>
										);
									})}
								</tr>
							);
						})}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row, index) => {
							prepareRow(row);
							// console.log(row.original);
							return (
								<tr
									onClick={onClickRow && (() => onClickRow(row.original))}
									className={`cursor-pointer hover:bg-orange-100  border ${
										index % 2 === 1 ? "bg-slate-100" : ""
									}`}
									key={index}
								>
									{row.cells.map((cell, index) => {
										return (
											<td
												className={`p-2  `}
												{...cell.getCellProps()}
												key={index}
											>
												{cell.render("Cell")}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<Pagination
				canNextPage={canNextPage}
				canPreviousPage={canPreviousPage}
				gotoPage={gotoPage}
				nextPage={nextPage}
				pageCount={pageCount}
				pageIndex={pageIndex}
				pageOptions={pageOptions}
				pageSize={pageSize}
				previousPage={previousPage}
				setPageSize={setPageSize}
			/>
		</div>
	);
};

export default Table;
