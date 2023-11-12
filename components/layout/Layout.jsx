import Footer from "@components/layout/Footer";
import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ children }) => {
	const maxWidth = 1536;
	return (
		<div className="relative" style={{ minHeight: "100vh", margin: "auto" }}>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<div>
				<Navbar maxWidth={maxWidth} />
				<div
					className="px-2 sm:px-3 md:px-4 lg:px-6"
					style={{ width: `min(${maxWidth}px, 100%)`, margin: "auto" }}
				>
					{children}
				</div>
				<div className="invisible w-full">
					<Footer maxWidth={maxWidth} />
				</div>
				<div className="absolute w-full bottom-0 left-0">
					<Footer maxWidth={maxWidth} />
				</div>
			</div>
		</div>
	);
};

export default Layout;
