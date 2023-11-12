import axios from "axios";

import React, { useEffect } from "react";
import Toast, {
	lanuchSuccessToast as launchSuccessToast,
	launchErrorToast,
} from "./toasts";

const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

declare global {
	var paypal: any;
}
export default function PayFromPaypal({ product, merchant_id }) {
	useEffect(() => {
		const script = document.createElement("script");

		// const merchant_id = "JHXDXCSZYAX7L";
		script.src = `https://www.paypal.com/sdk/js?&client-id=${CLIENT_ID}&merchant-id=${merchant_id}&disable-funding=credit,card`;
		document.head.appendChild(script);
		script.onload = () => {
			let orderId;
			window.paypal
				.Buttons({
					// Sets up the transaction when a payment button is clicked
					createOrder: async function (data, actions) {
						try {
							const res = await axios.post(
								"/api/payments/paypal/create-order",
								{
									product,
								}
							);
							orderId = res.data;
							return orderId;
						} catch (err) {
							console.log(err);
							launchErrorToast("Something went wrong. Please try again later");
						}
					},

					// Finalize the transaction after payer approval
					onApprove: async function (data, actions) {
						try {
							const res = await axios.post(
								"/api/payments/paypal/capture-order",
								{
									product,
									paypalOrderId: orderId,
								}
							);
							launchSuccessToast("Successfully completed order!");
							console.log("Success completing payment");
						} catch (err) {
							launchErrorToast("Something went wrong. Please try again later");
							console.log(err.response.data);
						}
					},
				})
				.render("#paypal-button-container");
		};
	}, [merchant_id, product]);
	return (
		<div>
			<div id="paypal-button-container"></div>
			<Toast />
		</div>
	);
}
