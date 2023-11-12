import { getSession } from "next-auth/react";
import { GetUserByEmail } from "../api/prisma";
import OrdersTable from "@components/OrdersTable";
import { useDiscordServer } from "@utils/contexts/DiscordServerProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { Prisma } from "@prisma/client";
import getSubscriptionStatus from "@utils/stripe/getSubscriptionStatus";

export default function Orders({}) {
	const [discordServer, setDiscordServer] = useDiscordServer();
	const [orders, setOrders] = useState([]);
	const [subscriptions, setSubscriptions] = useState([]);
	useEffect(() => {
		const discord_server = discordServer as Prisma.DiscordServerSelect;
		async function getOrders() {
			if (discord_server && discord_server.id) {
				const url = `/api/dashboard/orders/getOrders?db_id=${discord_server.id}`;
				const { data } = await axios.get(url);
				// setOrders(data);
				let orders = [];
				const paypalOrders = Array.from(data.paypal).map((order: any) => {
					order.amount = order.grossProductPrice;
					order.product_id = order.productId;
					order.payment_gateway = "paypal";
					order.product_name = order.product.name;
					return order;
				});
				const stripeOrders = Array.from(data.stripe).map((order: any) => {
					order.payment_gateway = "stripe";
					order.product_name = order.product.name;

					return order;
				});

				setOrders([...stripeOrders, ...paypalOrders]);
				const { stripeSubscriptions } = data;
				const newSubscriptions = stripeSubscriptions.map(
					(s: Prisma.StripeProductSubscriptionSelect) => {
						const newSubObj = { ...s } as any;
						newSubObj.product_name = (s.product as Prisma.ProductSelect).name;
						newSubObj.payment_gateway = "stripe";
						newSubObj.status = getSubscriptionStatus({
							current_period_end: s.current_period_end as any,
							status: s.status as any,
						});

						return newSubObj;
					}
				);
				setSubscriptions(newSubscriptions);
				// console.log(data.stripeSubscriptions);
			}
		}
		getOrders();
	}, [discordServer]);
	if (!discordServer) return <div>No discord server selected!</div>;
	return (
		<div className="bg-white p-5">
			<h1 className="text-5xl ">Orders</h1>
			<OrdersTable
				subscriptions={subscriptions}
				orders={orders}
				setOrders={setOrders}
			></OrdersTable>
		</div>
	);
}
