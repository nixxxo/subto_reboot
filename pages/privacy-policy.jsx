import React from "react";
import Accordion from "../components/Accordion";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";

export default function faq() {
	return (
		<div>
			<Background></Background>
			<div
				css={{
					"& *": {
						h2: {
							margin: "15px auto  ",
						},
					},
					"&>div": {
						margin: "25px auto",
					},
				}}
				className="flex drop-shadow-xl flex-col  mx-auto gap-6 -mt-10 mb-10 bg-white rounded p-3"
				style={{ width: "min(95%, 1250px)" }}
			>
				<h1>Privacy Policy</h1>
				<p>
					Subto Privacy Policy - You agree to this privacy policy and our Terms
					of Service by installing or using Subto. Updated & Effective: 8/20/20
				</p>
				<Welcome></Welcome>
				<InformationWeCollect></InformationWeCollect>
				<WhereInfoIsProcessed></WhereInfoIsProcessed>
				<UseOfInformation></UseOfInformation>
				<LegalBases></LegalBases>
				<OurDisclosure></OurDisclosure>
				<UnsolicitedInfo></UnsolicitedInfo>
				<Children></Children>
				<LinksToOtherSites></LinksToOtherSites>
				<DataRetention></DataRetention>
				<Security></Security>
				<DataRights></DataRights>
				<ChangesToPolicy></ChangesToPolicy>
				<ContactingUs></ContactingUs>
			</div>
		</div>
	);
}

function Background() {
	return (
		<div className="relative">
			<Bg></Bg>
			<div className="-z-10 w-screen top-0 absolute left-[50%] -translate-x-[50%] h-full bg-primaryGradient"></div>
		</div>
	);
}

function Bg() {
	return (
		<div className="relative w-full h-52 md:h-72 lg:h-96  grid place-items-center ">
			<h1 className="text-white text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl ">
				Privacy Policy
			</h1>
		</div>
	);
}

function Welcome() {
	return (
		<div>
			<h2>Welcome To Subto!</h2>
			<p>
				Subto (the “Site”) provides a third party payment gateway platform via
				the Discord website, which connects server owners and administrators
				("merchants") to PayPal and Stripe and related Internet services
				(collectively, the “Service(s)”). The Service is operated by Subto (the
				“Company”, “we” or “us”) for users of the Service (“you”). This Privacy
				Policy sets forth our policy with respect to information that is
				collected from visitors to the Site and users of the Services. Under
				applicable law, Subto is the “data controller” of personal data
				collected through the Services. Other data collected in regards to
				PCI-DSS is controlled by PayPal and Stripe. Their terms of service and
				privacy policies can be found here:
			</p>
			<p>Please See PayPal's Terms Here: </p>
			<a
				className="text-primary hover:underline"
				href="https://www.paypal.com/us/webapps/mpp/ua/useragreement-full"
			>
				https://www.paypal.com/us/webapps/mpp/ua/useragreement-full
			</a>
			<a
				className="text-primary hover:underline"
				href="https://www.paypal.com/us/webapps/mpp/ua/privacy-full"
			>
				https://www.paypal.com/us/webapps/mpp/ua/privacy-full
			</a>
			<p>Please See Stripe's Terms Here: </p>
			<a
				className="text-primary hover:underline"
				href="https://stripe.com/legal"
			>
				https://stripe.com/legal
			</a>
			<a
				className="text-primary hover:underline"
				href="https://stripe.com/privacy"
			>
				https://stripe.com/privacy
			</a>
			<p>
				Subto is NOT associated with ANY Discord Server. We are not "Partnered"
				or Associated with any Discord Servers other than the Subto Support
				Server. Servers who are listed as "Sponsors" on Subto embeds are paying
				members of our service. We are not affiliated in any way with these
				Discord servers or any Discord servers in any way, shape or form.
			</p>
		</div>
	);
}

function InformationWeCollect() {
	return (
		<div>
			<h2>INFORMATION WE COLLECT</h2>
			<p>
				When you interact with us through the Services, we may collect
				information from you, as further described below:
			</p>
			<p>
				Information You Provide: We collect information from you when you
				voluntarily provide such information, such as when you register for
				access to the Services or use certain Services. Information we collect
				may include but not be limited to username, email address (in relation
				to payment accounts only), userID, serverID, prices for producs, product
				names, transaction information that we pass to the PayPal or Stripe or
				any information relating to transactions being securely sent to the
				payment processors.
			</p>
			<h3 className="my-2">OTHER INFORMATION:</h3>
			<ul>
				<li>
					<b>Data We Collect Automatically:</b> When you interact with us
					through the Services, we receive and store certain information such as
					username, connected payment account IDs, device ID, unique userIDs and
					your activities within the Services. We may store such information or
					such information may be included in databases owned and maintained by
					affiliates, agents or service providers. (Such as PayPal or Stripe)
					The Services may use such information and pool it with other
					information to track, for example, the total number of visitors to our
					Site, the number of transactions processed, which users referred
					others to our service as well as the sites which refer visitors to
					Subto
				</li>
				<li>
					<b>Aggregated Information:</b> In an ongoing effort to better
					understand and serve the users of the Services, we may conduct
					research on our customer demographics, interests and behavior based on
					the information collected. This research may be compiled and analyzed
					on an aggregate basis, and we may share this aggregate data with our
					affiliates, agents and business partners. We may also disclose
					aggregated user statistics in order to describe our services to
					current and prospective business partners, and to other third parties
					for other lawful purposes.
				</li>
				<li>
					<b>Cookies:</b> We employ cookies and similar technologies to keep
					track of your local computer’s settings such as which account you have
					logged into and notification settings. Cookies are pieces of data that
					sites and services can set on your browser or device that can be read
					on future visits. We may expand our use of cookies to save additional
					data as new features are added to the Service. In addition, we use
					technologies such as web beacons and single-pixel gifs to record log
					data such as open rates for emails sent by the system. These cookies
					are also used in tracking referrals for the purpose of allocating
					credits to the correct users and IDs.
				</li>
				<li>
					<b>Advertisements:</b> You may see our Service advertised in other
					applications or websites. After clicking on one of these
					advertisements and installing our Service, you will become a user of
					the Service. Advertising platforms, which include Twitter and Facebook
					(and whose SDKs are integrated within our Service), may collect
					information for optimizing advertising campaigns outside of the
					Service. We may use third party web site analytic tools such as Google
					Analytics on our website that employ cookies to collect certain
					information concerning your use of our Services. However, you can
					disable cookies by changing your browser settings. Further information
					about the procedure to follow in order to disable cookies can be found
					on your Internet browser provider's website via your help screen.
				</li>
			</ul>
		</div>
	);
}

function WhereInfoIsProcessed() {
	return (
		<p>
			The Company is based in the United States. No matter where you are
			located, you consent to the processing and transferring of your
			information in and to the U.S. and other countries. The laws of the U.S.
			and other countries governing data collection and use may not be as
			comprehensive or protective as the laws of the country where you live.
		</p>
	);
}

function UseOfInformation() {
	return (
		<p>
			We use the information you provide in a manner that is consistent with
			this Privacy Policy. If you provide information for a certain reason, we
			may use the information in connection with the reason for which it was
			provided. For instance, if you contact us by email, we will use the
			information you provide to answer your question or resolve your problem.
			Also, if you provide information in order to obtain access to the
			Services, we will use your information to provide you with access to such
			services and to monitor your use of such services. The Company and its
			subsidiaries and affiliates (the “Related Companies”) may also use your
			information collected through the Services to help us improve the content
			and functionality of the Services, to better understand our users and to
			improve the Services. The Company and its affiliates may use this
			information to contact you in the future to tell you about services we
			believe will be of interest to you. If we do so, each marketing
			communication we send you will contain instructions permitting you to
			"opt-out" of receiving future marketing communications.
		</p>
	);
}

function LegalBases() {
	return (
		<div>
			<h2>OUR LEGAL BASES FOR HANDLING OF YOUR PERSONAL DATA</h2>
			<p>
				The laws in some jurisdictions require companies to tell you about the
				legal ground they rely on to use or disclose your personal data. To the
				extent those laws apply, our legal grounds are as follows:
			</p>
			<ul>
				<li>
					To honor our contractual commitments to you: Much of our processing of
					personal data is to meet our contractual obligations to our users, or
					to take steps at users’ request in anticipation of entering into a
					contract with them. For example, we handle personal data on this basis
					to link your accounts to the appropriate gateways or processors.
					<ul>
						<li>
							Legitimate interests: In many cases, we handle personal data on
							the ground that it furthers our legitimate interests in ways that
							are not overridden by the interests or fundamental rights and
							freedoms of the affected individuals: This includes:
						</li>
						<li>
							Providing a safe and enjoyable user experience;
							<ul>
								<li>Customer service;</li>
								<li>
									Marketing, e.g. sending emails or other communications to let
									you know about new features;
								</li>
								<li>
									Analyzing and improving our business, e.g. collecting
									information about how you use our Services to optimize the
									design and placement of certain features;
								</li>
								<li>Processing job applications;</li>
								<li>Managing legal issues.</li>
								<li>
									Legal compliance: We need to use and disclose personal data in
									certain ways to comply with our legal obligations.
								</li>
								<li>
									To protect the vital interests of the individual or others:
									For example, we may collect or share personal data to help
									resolve an urgent medical situation.
								</li>
							</ul>
						</li>
						<li>
							Consent: Where required by law, and in some other cases, we handle
							personal data on the basis of your implied or express consent.
						</li>
					</ul>
				</li>
			</ul>
		</div>
	);
}

function OurDisclosure() {
	return (
		<div>
			<h2>OUR DISCLOSURE OF YOUR INFORMATION</h2>
			<p>
				The Company is not in the business of selling your information. We
				consider this information to be a vital part of our relationship with
				you. There are, however, certain circumstances in which we may share
				your information with certain third parties, as set forth below:
			</p>
			<ul>
				<li>
					<b>Business Transfers:</b> As we develop our business, we might sell
					or buy businesses or assets. In the event of a corporate sale, merger,
					reorganization, bankruptcy, dissolution or similar event, your
					information may be part of the transferred assets.
				</li>
				<li>
					<b>Consent:</b> We may transfer your information with your consent.
				</li>
				<li>
					<b>Related Companies:</b> We may also share your information with our
					Related Companies for purposes consistent with this Privacy Policy.
				</li>
				<li>
					<b>Developers:</b> Developers using our SDK or API will have access to
					their own end users’ information, including userIDs, metadata, and
					payment links. Developers must use such information only to provide
					the SDK/API functionality within their applications and/or services.
				</li>
				<li>
					<b>Agents, Consultants and Related Third Parties:</b> Like many
					businesses, we sometimes hire other companies or individuals to
					perform certain business-related functions. Examples of such functions
					include mailing information, maintaining databases and processing
					payments.
				</li>
				<li>
					<b>Legal Requirements:</b> We may disclose your information if
					required to do so by law or in the good faith belief that such action
					is necessary to (i) comply with a legal obligation, (ii) protect and
					defend the rights or property of the Company or Related Companies,
					(iii) protect the personal safety of users of the Services or the
					public, or (iv) protect against legal liability.
				</li>
				<li>
					<b>Aggregated or Non-identifiable Data:</b> We may also share
					aggregated or non-personally identifiable information with our
					partners or others for business purposes.
				</li>
			</ul>
		</div>
	);
}

function UnsolicitedInfo() {
	return (
		<div>
			<h2>UNSOLICITED INFORMATION</h2>
			<p>
				You may provide us with ideas for new products or modifications to
				existing products, and other unsolicited submissions (collectively,
				“Unsolicited Information”). All Unsolicited Information shall be deemed
				to be non-confidential and we shall be free to reproduce, use, develop,
				freelance, disclose, take ownership and distribute such Unsolicited
				Information to others without limitation, attribution or liability.
			</p>
		</div>
	);
}

function Children() {
	return (
		<div>
			<h2>Children</h2>
			<p>
				Our Services are for users age 18 and over and we do not knowingly
				collect personal information from children under the age of 18. If you
				are a parent or guardian of a child under the age of 18 and believe he
				or she has disclosed personal information to us please contact us
				<a
					className="hover:underline text-primary"
					href="https://subto.xyz/support"
				>
					https://subto.xyz/support
				</a>
				. Note: In some countries, the age of digital consent is older than 18.
				If you are in those countries, you must be at least that age to use the
				Services. For example, for residents of the EEA, where processing of
				personal information is based on consent, Subto will not knowingly
				engage in that processing for users under the age of consent established
				by applicable data protection law. If we learn that we are engaged in
				that processing with such users, we will halt such processing and will
				take reasonable measures to promptly remove applicable information from
				our records.
			</p>
		</div>
	);
}

function LinksToOtherSites() {
	return (
		<div>
			<h2>LINKS TO OTHER WEB SITES</h2>
			<p>
				This Privacy Policy applies only to the Services. The Services may
				contain links to other web sites not operated or controlled by us (the
				“Third Party Sites”). The policies and procedures we described here do
				not apply to the Third Party Sites. The links from the Services do not
				imply that we endorse, support or have reviewed the Third Party Sites.
				We suggest contacting those sites directly for information on their
				privacy policies.
			</p>
		</div>
	);
}

function DataRetention() {
	return (
		<div>
			<h2>DATA RETENTION</h2>
			<p>
				We generally retain personal data for so long as it may be relevant to
				the purposes identified herein. To dispose of personal data, we may
				anonymize it, delete it or take other appropriate steps. Data may
				persist in copies made for backup and business continuity purposes for
				additional time. Data we transmit to other services and processors such
				as, but not limited to; PayPal and Stripe, may be stored for an
				indeterminate amount of time. Please refer to their terms of service and
				privcay policy as they are Third Party Sites.
			</p>
		</div>
	);
}

function Security() {
	return (
		<div>
			<h2>SECURITY</h2>
			<p>
				We take reasonable steps to protect the information provided via the
				Services from loss, misuse, and unauthorized access, disclosure,
				alteration, or destruction. However, no Internet or email transmission
				is ever fully secure or error free. In particular, email sent to or from
				the Services may not be secure. Therefore, you should take special care
				in deciding what information you send to us. Please keep this in mind
				when disclosing any information via the Internet. Please refer to our
				Terms of Service in terms of our liability for the service, data and
				handling of the data.
			</p>
		</div>
	);
}

function DataRights() {
	return (
		<div>
			<h2>YOUR DATA RIGHTS AND CHOICES</h2>
			<p>
				We believe that users should be treated equally no matter where they
				are, and so we are making the following options to control your data
				available to all users, regardless of their location.
			</p>
			<p>
				Individuals in California, the European Economic Area, Canada, Costa
				Rica and some other jurisdictions outside the United States have certain
				legal rights to obtain confirmation of whether we hold personal data
				about them, to access personal data we hold about them (including, in
				some cases, in portable form), and to obtain its correction, update,
				amendment or deletion in appropriate circumstances. They may also object
				to our uses or disclosures of personal data, to request a restriction on
				its processing, or withdraw any consent, though such actions typically
				will not have retroactive effect. They also will not affect our ability
				to continue processing data in lawful ways. We strongly suggest that
				users from these states, countries and regions do not use our service to
				prevent the collection of this data entirely.
			</p>
			<ul>
				<li>How can I access the personal data you have about me?</li>
			</ul>
			<p>
				If you would like to submit a data deletion request, please contact a
				staff member in our support channel:{" "}
				<a
					className="hover:underline text-primary"
					href="https://Subto.xyz/support"
				>
					https://subto.xyz/support
				</a>{" "}
				and a staff member will assist in deleting your account and data. Note:
				Data deleted from our service is the only data that will be removed. Any
				data we transfer to Payment Processors or Third Party Sites on your
				behalf will need to have data deletion requests sent to the respective
				company you chose to do business with.
			</p>
			<ul>
				<li>
					How do I object or restrict the manner in which Subto processes my
					personal data?
				</li>
				<p>
					You have a right to ask us to stop using or limit our use of your
					personal data in certain circumstances—for example, if we have no
					lawful basis to keep using your data. For us to stop using your data,
					we must delete your account and record from our service. In order to
					do this, you will lose access to all services we offer.
				</p>
			</ul>
		</div>
	);
}

function ChangesToPolicy() {
	return (
		<div>
			<h2>CHANGES TO THIS PRIVACY POLICY</h2>
			<p>
				We reserve the right to update or modify this Privacy Policy at any time
				and from time to time without prior notice. Please review this policy
				periodically, and especially before you provide any information. This
				Privacy Policy was last updated on the date indicated above. Your
				continued use of the Services after any changes or revisions to this
				Privacy Policy shall indicate your agreement with the terms of such
				revised Privacy Policy.
			</p>
		</div>
	);
}

function ContactingUs() {
	return (
		<div>
			<h2>CONTACTING US</h2>
			<p>
				Please also feel free to contact us if you have any questions about this
				Privacy Policy or the information practices of the Services. You may
				contact us here:{" "}
				<a
					className="hover:underline text-primary"
					href="https://subto.xyz/support"
				>
					https://subto.xyz/support
				</a>
			</p>
		</div>
	);
}
