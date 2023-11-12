import axios, { AxiosRequestConfig } from "axios";
import getAccessToken from "./getAccessToken";
import base64 from "base-64";

function createData({ name }) {
	var data = JSON.stringify({
		// name: "Video Streaming Service",
		name,
		description: "A video streaming service",
		type: "SERVICE",
		category: "SOFTWARE",
		// image_url: "https://example.com/streaming.jpg",
		// home_url: "https://example.com/home",
	});
	return data;
}

async function createConfig({ product_name, request_id, merchant_id }) {
	const accessToken = await getAccessToken();
	let payPalAuthAssertion = {
		header: {
			alg: "none",
		},
		payload: {
			iss: process.env.PAYPAL_CLIENT_ID,
			payer_id: merchant_id,
		},
	};
	let payPalAuthAssertionJWT = `${base64.encode(
		JSON.stringify(payPalAuthAssertion.header)
	)}.${base64.encode(JSON.stringify(payPalAuthAssertion.payload))}.`;
	const data = createData({ name: product_name });
	var config: AxiosRequestConfig = {
		method: "post",
		url: "https://api-m.sandbox.paypal.com/v1/catalogs/products",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
			"PayPal-Request-Id": request_id,
			"PayPal-Auth-Assertion": payPalAuthAssertionJWT,
			Cookie:
				"ts_c=vr%3D08df14251800a6092024a222ffff7d6c%26vt%3D08df14251800a6092024a222ffff7d6d",
		},
		data: data,
	};
	return config;
}

export default async function createProduct({
	merchant_id,
	product_name,
	request_id,
}) {
	const config = await createConfig({ merchant_id, product_name, request_id });

	const { data } = await axios(config);
	return data;
}
