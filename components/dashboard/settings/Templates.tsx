import { Prisma } from "@prisma/client";
import ImageUpload from "@components/ImageUpload";

import { useState } from "react";
import {
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from "@components/Listbox";
import InputField from "@components/InputField";

interface ICustomizationState {
	customization: Prisma.DiscordServerCustomizationSelect;
	setCustomization(...args: any[]): any;
}

export default function Templates({
	customization,
	setCustomization,
}: ICustomizationState) {
	// const [selectedTemplate, setSelectedTemplate] = useState(0);
	return (
		<div className="mt-2 md:mt-4">
			<h2 className="text-lg md:text-2xl text-center">Templates</h2>
			<div className="flex gap-10 flex-col md:flex-row w-full justify-around">
				<div className="w-full md:w-6/12">
					<Row>
						<span className="text-base">Choose template:</span>
						<Listbox
							className="min-w-[100px]"
							value={customization.template ?? 1}
							onChange={(val) =>
								setCustomization((c) => ({ ...c, template: val }))
							}
						>
							<ListboxButton>{customization.template ?? 1}</ListboxButton>
							<ListboxOptions>
								<ListboxOption value={1}>1</ListboxOption>
								<ListboxOption value={2}>2</ListboxOption>
								<ListboxOption value={3}>3</ListboxOption>
							</ListboxOptions>
						</Listbox>
					</Row>
					<Row>
						<span className="text-base">Choose main color:</span>
						<div className="w-[50px] h-[30px] flex justify-center items-center rounded-full shadow-md  overflow-hidden">
							<input
								required
								onChange={(e) =>
									setCustomization((c) => ({ ...c, mainColor: e.target.value }))
								}
								value={
									(customization.mainColor as unknown as string) ?? "#000000"
								}
								className="border-0 outline-none "
								type="color"
							/>
						</div>
					</Row>

					<Row>
						<span className="text-base">Upload logo</span>
						<ImageUpload
							onChange={(result) =>
								setCustomization((c) => ({ ...c, logo: result }))
							}
							required
							src={customization.logo ?? ""}
						/>
					</Row>
				</div>
				<div className="w-full md:w-6/12">
					<Row>
						<span className="text-base">Sortment of products</span>
						<Listbox
							className="min-w-[100px]"
							value={customization.sortProducts ?? "Price"}
							onChange={(val) =>
								setCustomization((c) => ({ ...c, sortProducts: val }))
							}
						>
							<ListboxButton>
								{customization.sortProducts ?? "Price"}
							</ListboxButton>
							<ListboxOptions>
								<ListboxOption value="Price">Price</ListboxOption>
								<ListboxOption value="Date">Date</ListboxOption>
								<ListboxOption value={"Random"}>Random</ListboxOption>
							</ListboxOptions>
						</Listbox>
					</Row>
					<Row>
						<span className="text-base">Choose secondary color:</span>
						<div className="w-[50px] h-[30px] flex justify-center items-center rounded-full shadow-md  overflow-hidden">
							<input
								onChange={(e) =>
									setCustomization((c) => ({ ...c, secColor: e.target.value }))
								}
								value={
									(customization.secColor as unknown as string) ?? "#000000"
								}
								className="outline-none"
								type="color"
							/>
						</div>
					</Row>
					<Row>
						<span className="text-base">Upload cover image</span>
						<ImageUpload
							required
							onChange={(result) =>
								setCustomization((c) => ({ ...c, cover: result }))
							}
							src={customization.cover ?? ""}
						/>
					</Row>
				</div>
			</div>
			<div className="my-2 h-1"></div>
			<Row>
				<span className="text-base">Link to a video</span>
				<div>
					<InputField
						onChange={(e) =>
							setCustomization((c) => ({ ...c, video: e.target.value }))
						}
						required
						value={(customization.video as unknown as string) ?? ""}
						type="url"
					/>
				</div>
			</Row>
			<div className="my-2 h-1"></div>

			<div className="flex flex-col my-1 md:my-1.5">
				<label className="ml-1 mb-0.5 text-xs md:text-sm text-slate-400">
					Product Perks
				</label>
				<textarea
					required
					onChange={(e) =>
						setCustomization((c) => ({ ...c, perks: e.target.value }))
					}
					value={(customization.perks as unknown as string) ?? ""}
					className="rounded-lg p-1.5 outline-1 outline-slate-400 text-sm md:text-base"
					placeholder={"Product Perks"}
				/>
			</div>
		</div>
	);
}

function Row({ children }) {
	return (
		<div className="flex my-2 items-center justify-between">{children}</div>
	);
}
