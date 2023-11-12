export default function getSubscriptionStatus({ status, current_period_end }) {
	return status === "canceled"
		? "canceled"
		: Date.now() / 1000 < current_period_end
		? "active"
		: "canceled";
}
