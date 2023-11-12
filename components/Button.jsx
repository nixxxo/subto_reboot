import Link from "next/link";
import React from "react";
import Spinner from "@components/progress/Spinner";

//if href is provided, wrap the component with link
// className= "bg-primary bg-slate-500 bg-primaryGradient bg-slate-700 hover:scale-105 hover:cursor-default"

export default function Button({ href = undefined, ...props }) {
	return href ? (
		<Link passHref href={href}>
			<a href={href}>
				<Btn {...props}></Btn>
			</a>
		</Link>
	) : (
		<Btn {...props}></Btn>
	);
}

const Btn = React.forwardRef(function Btn(
	{
		onClick,
		disabled,
		loading,
		children,
		css,
		variant,
		bgColor,
		icon,
		className,
		type,
	},
	ref
) {
	function outerClass() {
		let className =
			" rounded-lg  relative   transition-all duration-300 " +
			(disabled ? "bg-slate-200 " : bgColor ?? " bg-primaryGradient ") +
			(!loading && !disabled ? " hover:scale-105 " : "hover:cursor-default") +
			" ";

		return className;
	}
	function innerClass() {
		let className =
			"flex  whitespace-nowrap items-center justify-center text-lg font-bold rounded-lg   px-4 md:px-6 xl:px-8 py-2  ";
		className +=
			variant === "outlined" ? "bg-white text-primary " : "text-white ";
		className += disabled ? "text-slate-400" : "";
		if (variant === "outlined") {
			className += " hover:text-white hover:bg-primaryGradient ";
		}
		return className;
	}
	return (
		<>
			<button
				type={type}
				ref={ref}
				onClick={onClick}
				disabled={loading || disabled}
				className={outerClass() + className}
				style={{ padding: "2px" }}
			>
				<div className={innerClass()}>
					<div className="flex gap-2">
						{loading && <Spinner />}
						{children}
					</div>
				</div>
				{loading && (
					<div className="bg-white left-0 top-0 opacity-30 absolute w-full h-full"></div>
				)}
			</button>
		</>
	);
});
