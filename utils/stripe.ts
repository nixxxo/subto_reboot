// Docs for typescript: https://github.com/stripe/stripe-node
// Flow: https://stripe.com/docs/connect/enable-payment-acceptance-guide

import stripe from "./stripe/index";

/*  
Simplified flow:
    1. createAccount() for your site's user, if no account already
    2. ask user to create his account/ submit his details on link received by calling getAccountLink()
    3. after flow, retrieveAccount() and check param details_submitted  to check if the user has submitted his details. If charges_enabled (on return accoutn data) is false, request user to complete onboarding
*/

export async function createStripeConnectionAccount(email) {
	const account = await stripe.accounts.create({
		type: "standard",
		email,
	});
	return account;
}

export async function getStripeAccountLink({ account, discord_server_db_id }) {
	const baseURL = process.env.BASE_URL;
	const accountLink = await stripe.accountLinks.create({
		// account: "acct_1KlrWtSHWGuxd4v3",
		account,
		refresh_url: baseURL + "/dashboard/payments",
		return_url:
			baseURL +
			`/dashboard/payments?stripe-details-submitted=true&discord_server_db_id=${discord_server_db_id}`,
		type: "account_onboarding",
	});
	return accountLink.url;
}

export async function retrieveStripeConnectionAccount(accountId) {
	const account = await stripe.accounts.retrieve(accountId);

	return account;
}
