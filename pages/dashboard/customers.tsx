import DashboardNavbar from "../../components/navbarDashboard";
import { getSession, useSession } from "next-auth/react";
import { GetUserByEmail, GetAllUsersGuilds } from "../api/prisma";
import CheckAuthentication from "../api/auth/authChecker";
import { GetDiscordServers } from "../api/getDiscordServers";
import CustomersTable from "@components/CustomersTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDiscordServer } from "@utils/contexts/DiscordServerProvider";

export default function Customers() {
	const [discordServer] = useDiscordServer();
	const [customers, setCustomers] = useState([]);
	useEffect(() => {
		if (!discordServer) return;
		const url = `/api/dashboard/customers/getCustomers?db_id=${discordServer.id}`;
		axios.get(url).then((res) => {
			setCustomers(res.data);
		});
	}, [discordServer]);
	if (!discordServer) {
		return <h2>No discord server selected</h2>;
	}

	return (
		<div className="bg-white p-5">
			<h1 className="text-5xl text-blue-600">Customers</h1>
			<CustomersTable customers={customers}></CustomersTable>
		</div>
	);
}
