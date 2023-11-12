import axios, { AxiosRequestConfig } from "axios";
import getAccessToken from "./getAccessToken";

export default async function generateClientToken() {
	const accessToken = await getAccessToken();
	var config: AxiosRequestConfig = {
		method: "post",
		url: "https://api-m.sandbox.paypal.com/v1/identity/generate-token",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
			"PayPal-Partner-Attribution-Id": "<BN-Code>",
			"Accept-Language": "en_US",
			Cookie:
				"ts_c=vr%3D08df14251800a6092024a222ffff7d6c%26vt%3D08df14251800a6092024a222ffff7d6d",
		},
	};
	try {
		const res = await axios(config);
		return res.data.client_token;
	} catch (err) {
		throw new Error(err);
	}
}
