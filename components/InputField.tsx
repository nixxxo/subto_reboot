import { ChangeEvent } from "react";
import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	type?: HTMLInputTypeAttribute;
	value?: string | undefined | number;
	placeholder?: string;
	className?: string;
	defaultValue?: string | undefined | number;
	onChange?(e: ChangeEvent<HTMLInputElement>): any;
	error?: String;
	required?: boolean;
}

export default function InputField({
	className,
	label,
	type = "text",
	placeholder = "",
	value,
	error,
	required,
	onChange,
	defaultValue,
	...rest
}: IInputField) {
	// console.log(value, typeof value);

	value = value === "undefined" ? "" : value;
	return (
		<div className={"flex relative  flex-col my-2 md:my-2 " + className}>
			{label && (
				<label
					className={`ml-1 mb-0.5 text-xs md:text-sm text-slate-400 ${
						error && "text-red-400"
					}`}
				>
					{label}
				</label>
			)}
			<input
				{...rest}
				defaultValue={defaultValue}
				onChange={onChange}
				className={`rounded-lg p-1.5 outline-1 outline-slate-400 transition-all focus:ring-2 focus:ring-orange-300 duration-100 text-sm md:text-base ${
					error && "border-red-500 outline-red-500"
				}`}
				required={required}
				type={type}
				value={value ?? ""}
				placeholder={placeholder}
			/>
			{error && <div className="text-red-600  ">{error}</div>}
		</div>
	);
}
