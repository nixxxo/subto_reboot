import Button from "@components/Button";
import { useDiscordServer } from "@utils/contexts/DiscordServerProvider";
import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function BotAccess() {
	const [server] = useDiscordServer();
	return (
		<div
			style={{ width: "min(500px, 95%)", boxShadow: "0 0 5px red" }}
			className="flex  flex-col md:flex-row gap-5 my-2 p-1    rounded-sm items-center md:items-start  "
		>
			<AiOutlineExclamationCircle fontSize={"25px"} />
			<div style={{ maxWidth: "100%" }}>
				<h6>Subto Discord Bot is Not Connected</h6>
				<p className="my-1">
					Enable Subscription, referral and account management commands by
					installing the Subto Discord Bot.
				</p>
				<div className=" max-w-[100%] scale-75 origin-left">
					<Button bgColor="bg-primary" href="https://discord.com">
						Add to {server && server.name}
					</Button>
				</div>
			</div>
		</div>
	);
}
