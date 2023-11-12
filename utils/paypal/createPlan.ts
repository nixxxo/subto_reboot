import axios, { AxiosRequestConfig } from "axios";
import getAccessToken from "./getAccessToken";
import base64 from "base-64";

function getData({ planName, product_id }) {
	const data = JSON.stringify({
		product_id: product_id,
		name: planName,
		// description: "Basic plan",
		billing_cycles: [
			{
				frequency: { interval_unit: "MONTH", interval_count: 1 },
				tenure_type: "REGULAR",
				sequence: 1,
				total_cycles: 0,
				pricing_scheme: {
					fixed_price: { value: "10", currency_code: "USD" },
				},
			},
		],
		payment_preferences: {
			auto_bill_outstanding: true,
			payment_failure_threshold: 3,
			setup_fee: {
				value: "0",
				currency_code: "USD",
			},
		},
		// taxes: { percentage: "10", inclusive: false },
	});
	return JSON.parse(data);
}

async function getConfig({ request_id, merchant_id, planName, product_id }) {
	const accessToken = await getAccessToken();
	const data = getData({ planName, product_id });
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
		url: "https://api-m.sandbox.paypal.com/v1/billing/plans",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${accessToken}`,
			"PayPal-Request-Id": request_id,
			"PayPal-Auth-Assertion": payPalAuthAssertionJWT,
			"Content-Type": "application/json",
			Cookie:
				"ts_c=vr%3D08df14251800a6092024a222ffff7d6c%26vt%3D08df14251800a6092024a222ffff7d6d",
		},
		data: data,
	};
	return config;
}

export default async function createPlan({
	request_id,
	merchant_id,
	planName,
	product_id,
}) {
	const config = await getConfig({
		request_id,
		merchant_id,
		planName,
		product_id,
	});
	const { data } = await axios(config);
	return data;
}
