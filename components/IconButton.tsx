import React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
/** @jsx jsx */

interface IIconButton {
	className?: string;
	children: any;
	onClick: (...args: any[]) => any;
	disabled?: boolean;
}

export default function IconButton({
	className = "",
	children,
	onClick,
	disabled = false,
}: IIconButton) {
	return (
		<button
			disabled={disabled}
			css={{
				"&:hover *": {
					transform: !disabled && "scale(1.05)",
					fill: !disabled && "rgba(240, 138, 93, 1)",
					stroke: !disabled && "rgba(240, 138, 93, 1)",
				},
				"&": {
					color: disabled && "grey",
					transition: "all 100ms",
				},
			}}
			onClick={onClick}
			type="button"
			className={
				"cursor-pointer text-2xl transition-all  p-1 sm:p-2  duration-200 " +
				className
			}
		>
			{children}
		</button>
	);
}
