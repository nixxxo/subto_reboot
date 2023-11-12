import axios, { AxiosRequestConfig } from "axios";
import getAccessToken from "./getAccessToken";
import base64 from "base-64";

const { PAYPAL_BN_CODE } = process.env;

function createData({ plan_id, price, return_url, cancel_url }) {
	const dateToStartSubscription = Date.now() + 1000 * 60 * 30; //30 mins in future
	const dateInISO =
		new Date(dateToStartSubscription).toISOString().split(".")[0] + "Z";
	var data = JSON.stringify({
		plan_id,
		start_time: dateInISO,
		quantity: "1",
		shipping_amount: {
			currency_code: "USD",
			value: price / 100,
		},
		subscriber: {
			name: {
				// given_name: "John",
				// surname: "Doe",
			},
			// email_address: "customer@example.com",
			// shipping_address: {
			// 	name: {
			// 		full_name: "John Doe",
			// 	},
			// 	address: {
			// 		address_line_1: "2211 N First Street",
			// 		address_line_2: "Building 17",
			// 		admin_area_2: "San Jose",
			// 		admin_area_1: "CA",
			// 		postal_code: "95131",
			// 		country_code: "US",
			// 	},
			// },
		},
		application_context: {
			brand_name: "example-retail",
			locale: "en-US",
			shipping_preference: "NO_SHIPPING",
			user_action: "SUBSCRIBE_NOW",
			payment_method: {
				payer_selected: "PAYPAL",
				payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
			},
			return_url,
			cancel_url,
		},
	});
	return JSON.parse(data);
}

async function createConfig({ data, request_id, merchant_id }) {
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
	var config: AxiosRequestConfig = {
		method: "post",
		url: "https://api-m.sandbox.paypal.com/v1/billing/subscriptions",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
			"PayPal-Partner-Attribution-Id": PAYPAL_BN_CODE,
			"PayPal-Request-Id": request_id,
			"PayPal-Auth-Assertion": payPalAuthAssertionJWT,
			Cookie:
				"ts_c=vr%3D08df14251800a6092024a222ffff7d6c%26vt%3D08df14251800a6092024a222ffff7d6d",
		},
		data: data,
	};
	return config;
}

export default async function createSubscription({
	cancel_url,
	return_url,
	plan_id,
	price,
	merchant_id,
	request_id,
}) {
	const reqData = createData({ cancel_url, return_url, plan_id, price });
	const config = await createConfig({ data: reqData, merchant_id, request_id });
	try {
		const { data } = await axios(config);
		return data;
	} catch (err) {
		throw new Error(err);
	}
}
