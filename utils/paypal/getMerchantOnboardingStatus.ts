import axios, { AxiosRequestConfig } from "axios";
import getAccessToken from "./getAccessToken";

const PAYPAL_MERCHANT_ID = process.env.PAYPAL_MERCHANT_ID;

export default async function getMerchantOnboardingStatusFromPaypal({
	seller_merchant_id,
}) {
	const accessToken = await getAccessToken();
	var config: AxiosRequestConfig = {
		method: "get",
		// url: `https://api-m.sandbox.paypal.com/v1/customer/partners/${PAYPAL_MERCHANT_ID}/merchant-integrations?tracking_id=${tracking_id}`,
		url: `https://api-m.sandbox.paypal.com/v1/customer/partners/${PAYPAL_MERCHANT_ID}/merchant-integrations/${seller_merchant_id}`,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
			Cookie:
				"ts_c=vr%3D08df14251800a6092024a222ffff7d6c%26vt%3D08df14251800a6092024a222ffff7d6d",
		},
	};

	try {
		const { data } = await axios(config);

		return Promise.resolve(data);
	} catch (err) {
		console.log("Failed getting merchant onboarding status");
		console.log(err.response.data, err.response);
		return Promise.reject(err);
	}
}
