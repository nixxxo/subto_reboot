import { Tab } from "@headlessui/react";
import React, { useState, useRef, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import classNames from "@utils/classNames";
// export function Tabs({ className, selectedIndex, css, children, onChange }) {
// 	const [selected, setSelected] = useState(selectedIndex ?? 0);
// 	const tabsRef = useRef();
// 	useEffect(() => {
// 		const tabsContainer = tabsRef.current;
// 		function handleTabClick(e) {
// 			const index = parseInt(e.target.dataset.value);
// 			// setSelected();
// 			onChange && onChange(index);
// 		}
// 		const tabs = tabsContainer.querySelectorAll(".tab-root");
// 		tabs.forEach((tab) => {
// 			tab.addEventListener("click", handleTabClick);
// 		});
// 		return () => {
// 			tabs.forEach((tab) => {
// 				tab.removeEventListener("click", handleTabClick);
// 			});
// 		};
// 	}, [onChange]);
// 	return (
// 		<div
// 			css={css}
// 			ref={tabsRef}
// 			className={
// 				"py-1 box-content whitespace-nowrap overflow-auto max-w-[100%] " +
// 				className
// 			}
// 		>
// 			{children}
// 		</div>
// 	);
// }
// export function Tab({ children, selected, value }) {
// 	selected = selected !== undefined && selected === value;
// 	return (
// 		<div
// 			className={`relative  tab-root inline-grid place-items-center px-3 py-2 cursor-pointer text-lg font-bold transition-all duration-150 hover:text-primary whitespace-nowrap  ${
// 				selected ? "text-primary " : ""
// 			}  `}
// 			data-value={value}
// 		>
// 			{children || "Unnamed"}
// 			{selected && (
// 				<div
// 					data-value={value}
// 					className="absolute bottom-0 w-full left-0 h-[2px] bg-primary"
// 				></div>
// 			)}
// 		</div>
// 	);
// }

export function TabItem({ children }) {
	return (
		<Tab
			className={({ selected }) =>
				classNames(
					"transition-all duration-100 min-w-[150px] w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg",
					"focus:outline-none focus:ring-2 ring-offset-2 ring-offset-orange-300 ring-white ring-opacity-10",
					selected
						? "bg-white shadow text-slate-900"
						: " hover:bg-slate-400/100 hover:text-white"
				)
			}
		>
			{children}
		</Tab>
	);
}

export function TabPanel({ children }) {
	return (
		<Tab.Panel
			className={classNames(
				"bg-white rounded-xl p-3",
				"focus:outline-none focus:ring-2 ring-offset-2 ring-offset-orange-400 ring-white ring-opacity-60"
			)}
		>
			{children}
		</Tab.Panel>
	);
}
export function TabList({ children }) {
	return (
		<Tab.List className="overflow-auto flex p-1 space-x-1 bg-slate-300 rounded-xl">
			{children}
		</Tab.List>
	);
}
