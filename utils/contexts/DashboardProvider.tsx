import CheckAuthentication from "../../pages/api/auth/authChecker";
import DiscordServerProvider, {
	useDiscordServer,
} from "./DiscordServerProvider";
import DiscordServersProvider from "./DiscordServersProvider";
import DashboardNavbar from "@components/navbarDashboard";
import { DashboardBreadcrumb } from "@components/breadcrumb";
import { useRouter } from "next/router";
import PaymentProcessorsProvider from "./PaymentProcessorsProvider";
import PaymentProcessorProvider, {
	usePaypalProcessor,
	useStripeProcessor,
} from "./PaymentProcessorProvider";
import NoProcessorConnected from "@components/dashboard/NoProcessorConnected";
import BotAccess from "@components/dashboard/BotAccess";

export default function DashboardProvider({ children }) {
	return (
		<CheckAuthentication content={null}>
			<DiscordServersProvider>
				<PaymentProcessorsProvider>
					<DiscordServerProvider>
						<PaymentProcessorProvider>
							<Dashboard>{children}</Dashboard>
						</PaymentProcessorProvider>
					</DiscordServerProvider>
				</PaymentProcessorsProvider>
			</DiscordServersProvider>
		</CheckAuthentication>
	);
}

function Dashboard({ children }) {
	const router = useRouter();
	const isDashboard = router.asPath.match(/dashboard\/?$/);
	const [discordServer] = useDiscordServer();
	const stripe = useStripeProcessor();
	const paypal = usePaypalProcessor();
	return (
		<DashboardNavbar insideStructure={null}>
			<div className="bg-white p-3">
				{!isDashboard && (
					<div>
						<DashboardBreadcrumb />
						{discordServer && discordServer.id && (
							<div className="flex  xl:flex-row flex-col flex-wrap justify-evenly items-center xl:items-start">
								{!stripe && !paypal && <NoProcessorConnected />}
								{!discordServer.botAccess && <BotAccess />}
							</div>
						)}
					</div>
				)}

				{children}
			</div>
		</DashboardNavbar>
	);
}
