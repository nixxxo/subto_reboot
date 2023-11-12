import { useState } from "react";
import { Listbox as ListBox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

export function Listbox({ className = "", children, value, onChange }) {
	// const [selectedPerson, setSelectedPerson] = useState(people[0]);

	return (
		<ListBox value={value} onChange={onChange}>
			<div className={"relative z-20 mt-1 " + className}>
				{/* <ListboxButton>{selectedPerson.name}</ListboxButton>
				<ListboxOptions>
					{people.map((person) => (
						<ListboxOption key={person.id} value={person} disabled={false}>
							{person.name}
						</ListboxOption>
					))}
				</ListboxOptions> */}
				{children}
			</div>
		</ListBox>
	);
}

export function ListboxButton({ children }) {
	return (
		<ListBox.Button
			className={
				"relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
			}
		>
			{children}
			<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
				<SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
			</span>
		</ListBox.Button>
	);
}

export function ListboxOption({ value, disabled = false, children }) {
	return (
		<ListBox.Option
			value={value}
			disabled={disabled}
			className={({ active }) =>
				`cursor-default select-none relative py-2 pl-10 pr-4 ${
					active ? "text-amber-900 bg-amber-100" : "text-gray-900"
				}`
			}
		>
			{({ selected }) => (
				<>
					<span
						className={`block truncate ${
							selected ? "font-medium" : "font-normal"
						}`}
					>
						{children}
					</span>
					{selected ? (
						<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
							<CheckIcon className="w-5 h-5" aria-hidden="true" />
						</span>
					) : null}
				</>
			)}
		</ListBox.Option>
	);
}

export function ListboxOptions({ children }) {
	return (
		<ListBox.Options className="absolute w-full py-1 mt-1 overflow-auto z-50 text-base bg-white rounded-md shadow-lg max-h-60 ring-1 translate-x-0 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
			{children}
		</ListBox.Options>
	);
}
