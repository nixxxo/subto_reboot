import axios, { AxiosRequestConfig } from "axios";
import base64 from "base-64";
import qs from "qs";

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

var data = qs.stringify({
	grant_type: "client_credentials",
});

const Authorization = `Basic ${base64.encode(
	`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
)}`;

const config: AxiosRequestConfig = {
	method: "post",
	url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
	headers: {
		Authorization,
		"Content-Type": "application/x-www-form-urlencoded",
	},
	data: data,
};

let access_token = "";
let valid_till = 0; //milliseconds

export default async function getAccessToken() {
	if (hasAccessTokenExpired()) {
		const { data } = await axios(config);
		//data.expires_in is in seconds
		valid_till = Date.now() + data.expires_in * 1000;
		access_token = data.access_token;
		return access_token;
	} else {
		return access_token;
	}
}

function hasAccessTokenExpired() {
	return valid_till < Date.now();
}
