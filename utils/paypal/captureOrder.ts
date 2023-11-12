import getAccessToken from "@utils/paypal/getAccessToken";
import axios, { AxiosRequestConfig } from "axios";
var data = JSON.stringify({});

async function getConfig({ orderId_db, orderId_paypal }) {
	const accessToken = await getAccessToken();
	var config: AxiosRequestConfig = {
		method: "post",
		url: `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId_paypal}/capture`,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
			"PayPal-Request-Id": orderId_db,
			Cookie:
				"ts_c=vr%3D08df14251800a6092024a222ffff7d6c%26vt%3D08df14251800a6092024a222ffff7d6d",
		},
		data: data,
	};
	return config;
}

export default async function captureOrder({ orderId_db, orderId_paypal }) {
	const config = await getConfig({ orderId_db, orderId_paypal });
	try {
		const res = await axios(config);

		return res.data;
	} catch (err) {
		console.log(err, err.response);
		throw new Error(err);
	}
}
