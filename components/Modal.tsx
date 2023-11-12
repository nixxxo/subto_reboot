import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useEffect, useState } from "react";

interface IModal {
	open: boolean;
	onClose(): any;
	children?: any;
}

export default function Modal({ open, children = "", onClose }: IModal) {
	if (!open) return <></>;
	return (
		<div className="fixed flex items-center justify-center w-full h-full top-0 z-50 left-0">
			<div
				onClick={onClose}
				className="h-full w-full absolute top-0 left-0 bg-slate-900 opacity-50"
			></div>
			<div className=" relative z-20">{children}</div>
		</div>
	);
}
