import React, { useRef, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { AiOutlineEye } from "react-icons/ai";
import IconButton from "@components/IconButton";
import Image from "next/image";

export default function ImageUpload({ required = false, src, onChange }) {
	const inputRef = useRef(null);
	const [showPreview, setShowPreview] = useState(false);
	// console.log(src, typeof src, Boolean(src));
	// console.log("required", !src && required);
	function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
		const [file] = Array.from(e.target.files);
		if (file) {
			// setImageSrc(URL.createObjectURL(file));
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				onChange(reader.result);
			};
		}
	}
	return (
		<div className="relative  ">
			<Button type="button" onClick={() => inputRef.current.click()}>
				Upload
			</Button>
			{src && (
				<IconButton onClick={() => setShowPreview(true)}>
					<AiOutlineEye></AiOutlineEye>
				</IconButton>
			)}
			<Modal onClose={() => setShowPreview(false)} open={showPreview}>
				{/* <div
					style={{
						width: "min(500px, 95vw)",
						aspectRatio: "1",
						backgroundImage: `url('${src}')`,
					}}
					className="bg-no-repeat bg-center bg-cover  "
				></div> */}
				<div
					style={{
						width: "min(500px, 95vw)",
						aspectRatio: "1",
					}}
				>
					<Image
						objectFit="cover"
						layout="fill"
						alt="Uploaded Image"
						src={src}
					></Image>
				</div>
			</Modal>
			<input
				required={!src && required}
				onChange={onChangeInput}
				ref={inputRef}
				name="Some name"
				className="opacity-0 absolute max-w-full bottom-0  "
				accept="image/png, image/gif, image/jpeg"
				type={"file"}
				value={src ? "" : src}
			/>
		</div>
	);
}
