import Button from "@components/Button";
import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function NoProcessorConnected() {
	return (
		<div
			style={{ width: "min(500px, 95%)", boxShadow: "0 0 5px red" }}
			className="flex  flex-col md:flex-row gap-5 my-2 p-1    rounded-sm items-center md:items-start "
		>
			<AiOutlineExclamationCircle fontSize={"25px"} />
			<div style={{ maxWidth: "100%" }}>
				<h6>No Payment Processor Connected</h6>
				<p className="my-1">
					Connect Paypal, Stripe, or both! You will not be able to accept
					payments until you connect a payment processor
				</p>
				<div className="max-w-[100%] scale-75 origin-left">
					<Button bgColor="bg-primary" href="/dashboard/payments">
						Add a payment processor
					</Button>
				</div>
			</div>
		</div>
	);
}
