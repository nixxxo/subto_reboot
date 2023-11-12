import { useEffect, useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import gsap from "gsap";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export default function Accordion() {
	const [id] = useState("a" + uuid());
	const [isExpanded, setExpanded] = useState(false);
	const accordionBodyRef = useRef();
	useEffect(() => {
		if (isExpanded) {
			gsap.to(accordionBodyRef.current, { height: "auto", duration: 0.3 });
		} else {
			gsap.to(accordionBodyRef.current, { height: 0, duration: 0.3 });
		}
	}, [isExpanded]);

	return (
		<div className="rounded-lg overflow-hidden accordion-item bg-white border border-gray-200">
			<h2 className="rounded-lg overflow-hidden accordion-header mb-0">
				<button
					onClick={() => setExpanded((a) => !a)}
					className={
						`
        
        relative
		justify-between
        flex
        items-center
        w-full
        py-4
		font-semibold
        px-5
        text-base text-black text-left
        bg-white
        border-0
         overflow-hidden
        transition
        focus:outline-none
      ` + (isExpanded ? "!text-primary " : " !text-black")
					}
					type="button"
				>
					<div>Accordion Item #1</div>
					{isExpanded ? <BsChevronDown /> : <BsChevronUp />}
				</button>
			</h2>
			<div className="h-0 overflow-hidden" ref={accordionBodyRef}>
				<div className="accordion-body py-4 px-5">
					<strong>This is the first item's accordion body.</strong> It is shown
					by default, until the collapse plugin adds the appropriate classes
					that we use to style each element. These classes control the overall
					appearance, as well as the showing and hiding via CSS transitions. You
					can modify any of this with custom CSS or overriding our default
					variables. It's also worth noting that just about any HTML can go
					within the <code>.accordion-body</code>, though the transition does
					limit overflow.
				</div>
			</div>
		</div>
	);
}
