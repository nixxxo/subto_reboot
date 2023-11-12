import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingScreen from "@components/progress/LoadingScreen";
const CheckAuthentication = ({ content, children }) => {
	const router = useRouter();
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			router.push({
				pathname: "/sign-in",
				query: { returnUrl: router.asPath },
			});
		},
	});

	if (status == "loading") {
		return <LoadingScreen />;
	} else {
		return <>{content || children}</>;
	}
};

export default CheckAuthentication;
