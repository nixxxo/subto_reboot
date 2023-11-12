import { useState } from "react";

interface ISwitch {
	checked: boolean;
	onChange(arg: boolean): any;
}

export default function Switch({ checked, onChange }: ISwitch) {
	return (
		<div className="flex justify-center">
			<div className="form-check p-0 form-switch">
				<input
					onChange={(e) => {
						onChange && onChange(e.target.checked);
					}}
					// onClick={(e) => onChange(e.target.checked)}
					className="form-check-input border-0 outline-0 appearance-none w-9  rounded-full h-5 align-top  bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm checked:bg-primary"
					type="checkbox"
					checked={checked}
					role="switch"
					id="flexSwitchCheckDefault"
				/>
			</div>
		</div>
	);
}
