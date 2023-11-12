/* eslint-disable jsx-a11y/alt-text */
import {
	MdAttachMoney,
	MdPeopleAlt,
	MdCreditScore,
	MdCreditCardOff,
} from "react-icons/md";
import { isBrowser, isMobile } from "react-device-detect";
import axios from "axios";
import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";

import { Line } from "react-chartjs-2";

export default function ControlPanel({ discordServers }) {
	const [grossEarnings, setGrossEarnings] = useState(0);
	const [totalCustomers, setTotalCustomer] = useState(0);
	const [totalSubscriptions, setSubscriptions] = useState(0);
	const [totalCancels, setCancels] = useState(0);
	useEffect(() => {
		axios.get("/api/dashboard/getDashboardData").then((res) => {
			console.log(res.data);
			const {
				grossEarnings,
				totalCustomers,
				totalSubscriptions,
				totalCancels,
			} = res.data;
			setGrossEarnings(grossEarnings / 100);
			setTotalCustomer(totalCustomers);
			setSubscriptions(totalSubscriptions);
			setCancels(totalCancels);
		});
	}, []);

	return (
		// <DashboardProvider>
		<div>
			<div
				id="stats"
				className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
			>
				<ComponentStats
					description="gross earnings"
					number={`$${grossEarnings} USD`}
					icon={<MdAttachMoney color="#fb923c" size={isMobile ? 28 : 32} />}
					bgColor="bg-orange-400"
				/>
				<ComponentStats
					description="customers"
					number={totalCustomers}
					icon={<MdPeopleAlt color="#fb923c" size={isMobile ? 28 : 32} />}
					bgColor="bg-orange-400"
				/>
				<ComponentStats
					description={"subscriptions"}
					number={totalSubscriptions}
					icon={<MdCreditScore color="#fb923c" size={isMobile ? 28 : 32} />}
					bgColor="bg-orange-400"
				/>
				<ComponentStats
					description={"cancels"}
					number={totalCancels}
					icon={<MdCreditCardOff color="#fbbf24" size={isMobile ? 28 : 32} />}
					bgColor="bg-amber-400"
				/>
			</div>
			<div className="flex flex-col gap-5">
				<div style={{ height: "300px" }} id="graphs" className="">
					{" "}
					<Line
						options={{ responsive: true, maintainAspectRatio: false }}
						datasetIdKey="1"
						data={getData()}
					/>
					<br />
				</div>
			</div>
		</div>
		// </DashboardProvider>
	);
}

const ComponentStats = ({ description, number, icon, bgColor }) => {
	return (
		<div
			className={`flex flex-col sm:flex-row justify-between rounded-lg py-3 px-4 h-40 ${bgColor}`}
		>
			<div
				className={`flex flex-col text-white text-center sm:text-left ${bgColor}`}
			>
				<span className="text-sm uppercase">{description}</span>
				<span className="text-2xl md:text-3xl xl:text-3xl mt-2 font-semibold">
					{number}
				</span>
			</div>
			<div
				className={`rounded-full p-2.5 h-min m-auto sm:m-0 text-center bg-white`}
			>
				{icon}
			</div>
		</div>
	);
};

function getData() {
	const data = {
		labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
		datasets: [
			{
				id: 1,
				label: "",
				data: [5, 3, 2, 1, 6, 7, 8, 4],
			},
		],
	};
	return data;
}
