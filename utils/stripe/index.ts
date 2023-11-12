import Stripe from "stripe";

const stripeSecretkey = process.env.STRIPE_API_PRIVATE_KEY;

const stripe = new Stripe(stripeSecretkey, {
	apiVersion: "2020-08-27",
});

export default stripe;
