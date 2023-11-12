import Product from "@components/Product";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
/** @jsxImportSource @emotion/react */

const Templates = () => {
	const [activeThumbnail, setActiveThumbnail] = useState(-1);
	return (
		<div className="py-5 md:mb-16 overflow-hidden">
			<h1 className="text-center  my-10"> Templates </h1>
			<div className="flex w-full my-20 items-center  flex-wrap justify-center gap-16">
				<DarkCover active={activeThumbnail > -1 && activeThumbnail !== 0}>
					<TemplateThumbnail
						setActiveThumbnail={setActiveThumbnail}
						id={0}
						url="/template-1.png"
					/>
				</DarkCover>
				<DarkCover active={activeThumbnail > -1 && activeThumbnail !== 1}>
					<TemplateThumbnail
						setActiveThumbnail={setActiveThumbnail}
						id={1}
						url="/template-2.png"
					/>
				</DarkCover>
				<DarkCover active={activeThumbnail > -1 && activeThumbnail !== 2}>
					<TemplateThumbnail
						setActiveThumbnail={setActiveThumbnail}
						id={2}
						url="/template-3.png"
					/>
				</DarkCover>
			</div>
			{/* <Product /> */}
		</div>
	);
};

function TemplateThumbnail({ url, setActiveThumbnail, id, onRadio }) {
	const templateRef = useRef();
	useEffect(() => {
		const template = templateRef.current;
		function handleLeave(e) {
			if (!isTouchDevice()) {
				// setActiveThumbnail((activeId) => {
				// 	if (activeId === id) return -1;
				// });
				const bgs = document.querySelectorAll(".template-dark-bg");
				const mouseInsideABg = Array.from(bgs).find((bg) =>
					isMouseInsideElement(bg, e)
				);

				bgs.forEach((bg) => {
					if (!mouseInsideABg) {
						bg.style.display = "none";
					} else {
						if (bg === mouseInsideABg) {
							bg.style.display = "none";
						}
					}
				});
			}
		}
		function handleEnter(e) {
			if (!isTouchDevice()) {
				// setActiveThumbnail(id);
				const bgs = document.querySelectorAll(".template-dark-bg");
				bgs.forEach((bg) => {
					if (bg.parentElement.contains(template)) {
						bg.style.display = "none";
					} else {
						bg.style.display = "block";
					}
				});
			}
		}
		template.addEventListener("mouseenter", handleEnter);
		template.addEventListener("mouseleave", handleLeave);
		return () => {
			template.removeEventListener("mouseenter", handleEnter);
			template.removeEventListener("mouseleave", handleLeave);
		};
	}, [id, setActiveThumbnail]);
	return (
		<div
			ref={templateRef}
			css={{
				"@media (hover:hover) and (pointer:fine)": {
					":hover": {
						backgroundPosition: "contain",
					},
				},
			}}
			style={{ backgroundImage: `url('${url}')` }}
			onClick={onRadio}
			className="bg-cover   bg-center bg-no-repeat  px-32 py-28  md:px-44 md:py-36  rounded-lg hover:z-10 bg-white shadow-lg  cursor-pointer relative  duration-300  "
		></div>
	);
}

function DarkCover({ children, active }) {
	let [show, setShow] = useState(true);
	useEffect(() => {
		if (active) {
			setShow(true);
		} else {
			setShow(false);
		}
	}, [active]);

	return (
		<div
			css={{
				"@media (hover:hover) and (pointer:fine)": {
					":hover": {
						transform: "scale(1.4)",
						zIndex: 10,
					},
				},
			}}
			className="relative duration-300"
		>
			{children}
			{true && (
				<div className="hidden absolute template-dark-bg rounded-lg top-0 left-0 h-full w-full bg-black opacity-30"></div>
			)}
		</div>
	);
}

export default Templates;

function isTouchDevice() {
	return (
		"ontouchstart" in window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0
	);
}

function isMouseInsideElement(element, e) {
	const boundingRect = element.getBoundingClientRect();
	const { left, right, top, bottom } = boundingRect;
	let mouseX = e.clientX;
	let mouseY = e.clientY;
	if (mouseX < left || mouseX > right) return false;
	if (mouseY < top || mouseY > bottom) return false;
	return true;
}
