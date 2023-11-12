import Button from "@components/Button";
import axios from "axios";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineMail } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "@components/progress/LoadingScreen";
import Link from "next/link";
/** @jsxImportSource @emotion/react */

const clientReCaptchaKey = process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY;

const Support = () => {
	return (
		<div
			className="flex shadow-lg flex-col md:flex-row items-stretch my-10  mx-auto "
			style={{ minHeight: "600px", width: "min(100%, 1300px)" }}
		>
			<Info></Info>
			<Form></Form>
		</div>
	);
};

function Info() {
	return (
		<div
			style={{}}
			className="text-white text-center md:text-left md:min-w-[40%] md:max-w-[600px] justify-between flex flex-col gap-10 md:gap-20 items-stretch self-stretch bg-primaryGradient p-4 md:p-7 xl:p-8 "
		>
			<h1>Get in Touch</h1>
			<div>
				<h5 className="font-normal">
					Got a question about us? Are you interested in partnering with us?
					Have some suggestions or just want to say Hi? Just contact us. We are
					here to asset you.
				</h5>
				<div className="flex  mt-5 flex-col gap-3">
					<div className="flex text-lg gap-3 justify-center md:justify-start items-center">
						<AiOutlineMail />
						<p className="text-lg">info@subto.xyz</p>
					</div>
				</div>
			</div>

			{/* <div>
				<h5 className="font-normal">545, Street 11, Block F</h5>
				<h5 className="font-normal">Dean Boulevard, Ohio</h5>
			</div> */}
			<h6 css={{ fontWeight: "normal", textDecoration: "underline" }}>
				<Link href="https://discord.gg/ECPqVnJd5V">Join Discord</Link>
			</h6>
		</div>
	);
}

function Form() {
	const formRef = useRef();
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [captchaValue, setCaptchaValue] = useState("");
	const [captchaError, setCaptchaError] = useState(false);
	const [sendingMsg, setSendingMsg] = useState(false);
	const [successfullySentMsg, setSuccessfulySentMsg] = useState(false);

	function resetForm() {
		setMessage("");
		setSubject("");
		setEmail("");
	}

	function handleSubmit(e) {
		e.preventDefault();
		// if (successfullySentMsg) return;
		if (!captchaValue) {
			return setCaptchaError(true);
		}
		setCaptchaError(false);
		setSendingMsg(true);
		axios
			.post("/api/support", {
				email,
				subject,
				message,
				captchaValue,
			})
			.then((res) => {
				toast.success("🦄 Successfully sent mail!", {
					position: "bottom-center",
					autoClose: 5000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				setSuccessfulySentMsg(true);
				resetForm();
			})
			.catch((err) => {
				toast.error("Something went wrong. Please try again later", {
					position: "bottom-center",
					autoClose: 5000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				console.log("Error", err);
			})
			.finally(() => {
				setSendingMsg(false);
			});
	}
	function handleCaptchaChange(value) {
		setCaptchaValue(value);
		setCaptchaError(false);
	}
	return (
		<div
			style={{ width: "min(1000px, 100%)" }}
			className="relative p-4 md:p-7 xl:p-8  mx-auto "
		>
			<form
				onSubmit={handleSubmit}
				ref={formRef}
				className=" md:items-start  rounded-lg flex flex-col gap-5  items-stretch"
			>
				<h1 className="text-center md:text-left"> Details </h1>

				<label className="flex gap-1 flex-col min-w-[50%]">
					Email{" "}
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="p-2 rounded-lg "
						type={"email"}
						placeholder="Email"
					></input>
				</label>

				<label className="flex gap-1 flex-col min-w-[50%]">
					Subject{" "}
					<input
						required
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						className="min-w-[50%] p-2 rounded-lg"
						placeholder="Subject"
					></input>
				</label>

				<label className="flex gap-1 flex-col w-full">
					Message
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						required
						rows={8}
						className="p-2 rounded-lg self-stretch"
						placeholder="Message"
					></textarea>
				</label>
				{successfullySentMsg ? (
					<h3 className="text-center self-stretch text-green-400"> Success!</h3>
				) : (
					<div className="flex overflow-hidden max-w-full  -gap-4 flex-wrap gap-2 justify-evenly sm:justify-between self-stretch items-center">
						<div>
							<div className="scale-[0.85] sm:hidden">
								<ReCAPTCHA
									// ref={recaptchaRef}
									// size="compact"
									sitekey={clientReCaptchaKey}
									onChange={handleCaptchaChange}
								/>
							</div>
							<div className="hidden sm:block">
								<ReCAPTCHA
									sitekey={clientReCaptchaKey}
									onChange={handleCaptchaChange}
								/>
							</div>
							{captchaError && (
								<p className="text-red-400">
									Please complete this captcha to verify you are not a bot.
								</p>
							)}
						</div>
						<Button>Send</Button>
					</div>
				)}
			</form>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			{sendingMsg && <LoadingScreen />}
		</div>
	);
}

export default Support;
