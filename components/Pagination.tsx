import React from "react";
import {
	BsChevronLeft,
	BsChevronRight,
	BsChevronDoubleLeft,
	BsChevronDoubleRight,
} from "react-icons/bs";
import IconButton from "./IconButton";
import InputField from "./InputField";
import {
	Listbox,
	ListboxOption,
	ListboxButton,
	ListboxOptions,
} from "./Listbox";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
/** @jsx jsx */
interface IPagination {
	gotoPage: any;
	canPreviousPage: any;
	previousPage: any;
	nextPage: any;
	canNextPage: any;
	pageCount: any;
	setPageSize: any;
	pageIndex: any;
	pageOptions: any;
	pageSize: any;
}

export default function Pagination({
	pageIndex,
	pageOptions,
	pageSize,
	previousPage,
	pageCount,
	setPageSize,
	nextPage,
	gotoPage,
	canNextPage,
	canPreviousPage,
}: IPagination) {
	return (
		<div className="mx-auto flex-wrap items-center my-1 gap-1 flex justify-center ">
			<div className="items-center gap-1 flex justify-center ">
				<IconButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					<BsChevronDoubleLeft />
				</IconButton>{" "}
				<IconButton onClick={() => previousPage()} disabled={!canPreviousPage}>
					<BsChevronLeft></BsChevronLeft>
				</IconButton>{" "}
				<span>
					Page{" "}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{" "}
				</span>
				<IconButton onClick={() => nextPage()} disabled={!canNextPage}>
					<BsChevronRight />
				</IconButton>{" "}
				<IconButton
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}
				>
					<BsChevronDoubleRight />
				</IconButton>{" "}
			</div>
			<span className="flex flex-wrap justify-evenly mx-1 gap-1 items-center">
				<div>Go to page:</div>
				<div css={{ "*": { maxWidth: "100%" } }} className="max-w-full">
					<InputField
						type="number"
						value={pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							gotoPage(page);
						}}
						// style={{ width: "100px" }}
					/>
				</div>
			</span>{" "}
			<Listbox
				value={pageSize}
				onChange={(value) => {
					setPageSize(value);
				}}
			>
				<ListboxButton>Show {pageSize}</ListboxButton>
				<ListboxOptions>
					<ListboxOption value={1}>1</ListboxOption>
					<ListboxOption value={2}>2</ListboxOption>
					<ListboxOption value={5}>5</ListboxOption>
					<ListboxOption value={10}>10</ListboxOption>
					<ListboxOption value={20}>20</ListboxOption>
				</ListboxOptions>
			</Listbox>
		</div>
	);
}
