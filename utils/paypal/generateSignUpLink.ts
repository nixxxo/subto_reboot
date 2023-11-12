import axios, { AxiosRequestConfig } from "axios";
import getAccessToken from "./getAccessToken";
const { BASE_URL } = process.env;
export default async function generateSignUpLink({ tracking_id }) {
	var data = JSON.stringify({
		tracking_id,
		operations: [
			{
				operation: "API_INTEGRATION",
				api_integration_preference: {
					rest_api_integration: {
						integration_method: "PAYPAL",
						integration_type: "THIRD_PARTY",
						third_party_details: {
							features: ["PAYMENT", "REFUND"],
						},
					},
				},
			},
		],

		partner_config_override: {
			return_url: `${BASE_URL}/dashboard/payments?paypal-details-submitted=${tracking_id}`,
		},
		products: ["EXPRESS_CHECKOUT"],
		legal_consents: [
			{
				type: "SHARE_DATA_CONSENT",
				granted: true,
			},
		],
	});
	const accessToken = await getAccessToken();
	var config: AxiosRequestConfig = {
		method: "post",
		url: "https://api-m.sandbox.paypal.com/v2/customer/partner-referrals",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
			Cookie:
				"ts_c=vr%3D088cc3671800a60bc51db54effff7c10%26vt%3D088cc3671800a60bc51db54effff7c11",
		},
		data: data,
	};
	try {
		const { data: resData } = await axios(config);
		// console. log(resData);
		return resData.links[1].href;
	} catch (err) {
		console.log(err.response.data);
		throw new Error(err.response.data);
	}
}
