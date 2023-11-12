import axios, { AxiosRequestConfig } from "axios";
import getAccessToken from "./getAccessToken";

const merchant_id = process.env.PAYPAL_MERCHANT_ID;

function getData({ sellerMerchantId, productName, price, platform_fees }) {
	var data = JSON.stringify({
		intent: "CAPTURE",
		processing_instruction: "NO_INSTRUCTION",
		// processing_instruction: "ORDER_COMPLETE_ON_PAYMENT_APPROVAL",
		purchase_units: [
			{
				reference_id: "REFID-000-1001",
				name: productName,
				amount: {
					currency_code: "USD",
					value: price / 100,
				},
				payee: {
					// email_address: "seller@paypal.com",
					merchant_id: sellerMerchantId,
					// merchant_id: "JHXDXCSZYAX7L",
				},
				payment_instruction: {
					platform_fees: [
						{
							amount: {
								currency_code: "USD",
								value: platform_fees / 100,
							},
							payee: {
								// email_address: "_sys_aquarium-1696754097380342@paypal.com",
								// merchant_id: "JHXDXCSZYAX7L",
								merchant_id,
							},
						},
					],
					disbursement_mode: "INSTANT",
					// payee_pricing_tier_id: "999ZAE",
				},
			},
		],
	});
	return data;
}

export default async function createOrder({
	sellerMerchantId,
	productName,
	platform_fees,
	price,
	orderId,
}) {
	const accessToken = await getAccessToken();
	var config: AxiosRequestConfig = {
		method: "post",
		url: "https://api-m.sandbox.paypal.com/v2/checkout/orders",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
			"PayPal-Request-Id": orderId,
			Cookie:
				"ts_c=vr%3D08df14251800a6092024a222ffff7d6c%26vt%3D08df14251800a6092024a222ffff7d6d",
		},
		data: getData({ platform_fees, price, sellerMerchantId, productName }),
	};

	try {
		const res = await axios(config);
		return res.data.id;
		console.log(res.data);
	} catch (err) {
		throw new Error(err);
		// console.log(err);
	}
}
