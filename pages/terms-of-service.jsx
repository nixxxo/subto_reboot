import React from "react";
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
				className="flex drop-shadow-xl flex-col  mx-auto gap-6 mb-10 -mt-10 bg-white rounded p-3"
				style={{ width: "min(95%, 1250px)" }}
			>
				<h1>Terms of Service</h1>
				<p>
					You agree to these terms of service fully by using and installing
					Subto. UPDATED: 12/25/2020
				</p>
				<img
					style={{ objectFit: "contain", maxWidth: "450px" }}
					src="/subto2.png"
					alt=""
				/>
				<Overview />
				<Introduction />
				<UserTerms />
				<Accuracy />
				<Modifications />
				<AccuracyBilling />
				<OptionalTools />
				<ThirdPartyLinks />
				<UserComments />
				<Errors />
				<ProhibitedUses />
				<Disclaimer />
				<Indemnification />
				<Severability />
				<TerminationOfService />
				<Remedies />
				<Agreement />
				<GoverningLaw />
				<Contests />
				<ChangesToTOS />
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
				Terms of Service
			</h1>
		</div>
	);
}

function Overview() {
	return (
		<div>
			{" "}
			<h2 className="my-3">Overview</h2>
			<p>
				This website ("Subto.xyz") is operated by a Subto. Throughout the site,
				the terms “we”, “us”, and “our” refer to Subto and offers this website,
				including all information, tools, and services available from this site
				to you, the user, conditioned upon your acceptance of all terms,
				conditions, policies, and notices stated here. By visiting our site
				and/or using our service, you engage in our “Service” and agree to be
				bound by the following terms and conditions (“Terms of Service”,
				“Terms”), including those additional terms and conditions and policies
				referenced herein and/or available by hyperlink. These Terms of Service
				apply to all users of the site and service, including without limitation
				users who are browsers, vendors, customers, merchants, and/or
				contributors of content. Please read these Terms of Service carefully
				before accessing or using our website. By accessing or using any part of
				the site, you agree to be bound by these Terms of Service. If you do not
				agree to all the terms and conditions of this agreement, then you may
				not access the website or use any services. If these Terms of Service
				are considered an offer, acceptance is expressly limited to these Terms
				of Service. Any new features or tools which are added to the service
				shall also be subject to the Terms of Service. You can review the most
				current version of the Terms of Service at any time on this page. We
				reserve the right to update, change or replace any part of these Terms
				of Service by posting updates and/or changes to our website. It is your
				responsibility to check this page periodically for changes. Your
				continued use of or access to the website following the posting of any
				changes constitutes acceptance of those changes.
			</p>
		</div>
	);
}

function Introduction() {
	return (
		<div>
			<h2 className="my-3">Introduction</h2>
			<p>
				Subto is a service that allows chat services to utilize a bot to handle
				all subscriptions, roles, trials, coupons, purchases, referrals and more
				within the chat service. Subto is a verified partner of PayPal and a
				verified partner with Stripe. Each of these payment processors has their
				own terms of service that you agree to when you connect your chat /
				account to their service.
			</p>
			<br />
			<p>Please See PayPal's Terms Here:</p>
			<a
				className="text-primary hover:underline"
				href="https://www.paypal.com/us/webapps/mpp/ua/useragreement-full"
			>
				https://www.paypal.com/us/webapps/mpp/ua/useragreement-full
			</a>
			<br />
			<br />
			<p>Please See Stripe's Terms Here: </p>
			<a
				className="text-primary hover:underline"
				href="https://stripe.com/legal"
			>
				https://stripe.com/legal
			</a>
			<br />
			<br />
			<p>
				Subto is NOT associated with ANY Discord Server. We are not "Partnered"
				or Associated with any Discord Servers other than the Subto Support
				Server.
			</p>
			<br />

			<p>
				You also agree to not to violate PayPal's Restricted Business terms:
			</p>
			<a
				className="text-primary hover:underline"
				href="https://www.paypal.com/ga/webapps/mpp/ua/acceptableuse-full"
			>
				{" "}
				https://www.paypal.com/ga/webapps/mpp/ua/acceptableuse-full
			</a>
			<br />
			<br />
			<p>
				You also agree to not to violate Stripe's Restricted Business terms:
			</p>
			<a
				className="text-primary hover:underline"
				href="https://stripe.com/restricted-businesses"
			>
				https://stripe.com/restricted-businesses
			</a>
		</div>
	);
}

function UserTerms() {
	return (
		<div>
			<h2>User Terms</h2>
			<p>
				By agreeing to these Terms of Service, you represent that you are at
				least the age of majority in your state or province of residence, or
				that you are the age of majority in your state or province of residence
				and you have given us your consent to allow any of your minor dependents
				to use this site. You may not use our service for any illegal or
				unauthorized purpose nor may you, in the use of the Service, violate any
				laws in your jurisdiction (including but not limited to copyright laws).
				You must not transmit any worms or viruses or any code of a destructive
				nature. A breach or violation of any of the Terms will result in an
				immediate termination of your Services and may result in legal action
				against you for attempting to disrupt our service to our customers.
			</p>
			<p>You may not use the Subto service for activities that:</p>
			<ol>
				<li>Violate any law, statute, ordinance or regulation.</li>
				<li>
					Relate to transactions involving (a) narcotics, steroids, certain
					controlled substances or other products that present a risk to
					consumer safety, (b) drug paraphernalia, (c) cigarettes, (d) items
					that encourage, promote, facilitate or instruct others to engage in
					illegal activity, (e) stolen goods including digital and virtual
					goods, (f) the promotion of hate, violence, racial or other forms of
					intolerance that is discriminatory or the financial exploitation of a
					crime, (g) items that are considered obscene, (h) items that infringe
					or violate any copyright, trademark, right of publicity or privacy or
					any other proprietary right under the laws of any jurisdiction, (i)
					certain sexually oriented materials or services, (j) ammunition,
					firearms, or certain firearm parts or accessories, or (k) certain
					weapons or knives regulated under applicable law.
				</li>
				<li>
					Relate to transactions that (a) show the personal information of third
					parties in violation of applicable law, (b) support pyramid or
					ponzi-schemes, matrix programs, other "get rich quick" schemes or
					certain multi-level marketing programs, (c) are associated with
					purchases of annuities or lottery contracts, lay-away systems,
					off-shore banking or transactions to finance or refinance debts funded
					by a credit card, (d) are for the sale of certain items before the
					seller has control or possession of the item, (e) are by payment
					processors to collect payments on behalf of merchants, (f) are
					associated with the sale of traveler's checks or money orders,
					(h)involve currency exchanges or check cashing businesses, (i) involve
					certain credit repair, debt settlement services, credit transactions
					or insurance activities, or (k) involve offering or receiving payments
					for the purpose of bribery or corruption.
				</li>
				<li>
					Involve the sales of products or services identified by government
					agencies to have a high likelihood of being fraudulent.
				</li>
				<li>
					Perform a service or run a business that violates either PayPal or
					STRIPE terms of service or Acceptable Use.
				</li>
			</ol>
		</div>
	);
}

function GeneralConditions() {
	return (
		<div>
			We reserve the right to refuse service to anyone for any reason at any
			time. No questions asked. You understand that your content, may be
			transferred unencrypted and involve (a) transmissions over various
			networks; and (b) changes to conform and adapt to technical requirements
			of connecting networks or devices.{" "}
			<strong>
				You agree not to reproduce, duplicate, copy, sell, resell, or exploit
				any portion of the Service, use of the Service, or access to the Service
				or any contact on the website through which the service is provided,
				without express written permission by us. The code, style, layout, "look
				and feel" and structures belongs to us. Stealing will not be tolerated
				and attempting to hack our servers, code or service will result in legal
				action, reporting to the FTC or your government's internet crime police,
				a ban from the service and a rate increase.{" "}
			</strong>{" "}
			The headings used in this agreement are included for convenience only and
			will not limit or otherwise affect these Terms. Subto Owns the App, Bot,
			Software, Code, Custom Layout, "Look and Feel" and customer / merchant
			relationships as part of the service. You acknowledge and agree that Subto
			(or, as applicable, our licensors) owns all legal right, title and
			interest in and to all other elements of the App, and all intellectual
			property rights therein (including, without limitation, all Art, designs,
			systems, methods, information, computer code, software, services, “look
			and feel”, organization, compilation of the content, code, data, and all
			other elements of the App (collectively, the “Subto Materials”)). You
			acknowledge that the Subto Materials are protected by copyright, trade
			dress, patent, and trademark laws, international conventions, other
			relevant intellectual property and proprietary rights, and applicable
			laws. All Subto Materials are the copyrighted property of Subto or its
			licensors, and all trademarks, service marks, and trade names associated
			with the App or otherwise contained in the Subto Materials are proprietary
			to Subto or its licensors. Except as expressly set forth herein, your use
			of the App does not grant you ownership of or any other rights with
			respect to any content, code, data, or other Subto Materials that you may
			access on or through the App. By using Subto, installing the software,
			connecting your account(s) to Subto or associated services, you agree to
			the terms of service unconditionally in perpetuity. You agree that
			solicitation of any Merchants, Vendors, Customers, Employees or Staff
			members of Subto is strictly and expressly forbidden and will be pursued
			with all available legal remedies for breach of contract and other
			available means.{" "}
		</div>
	);
}

function Accuracy() {
	return (
		<div>
			<h2>Accuracy, Completeness, and Timeliness of Information</h2>
			<p>
				We are not responsible if information made available on this site is not
				accurate, complete, or current. The material on this site is provided
				for general information only and should not be relied upon or used as
				the sole basis for making decisions without consulting primary, more
				accurate, more complete or timelier sources of information. Any reliance
				on the material on this site is at your own risk. This site may contain
				certain historical information. Historical information, necessarily, is
				not current and is provided for your reference only. We reserve the
				right to modify the contents of this site at any time, but we have no
				obligation to update any information on our site. You agree that it is
				your responsibility to monitor changes to our site.
			</p>
		</div>
	);
}

function Modifications() {
	return (
		<div>
			{" "}
			<h2>Modifications to Price and Service</h2>
			<p>
				Prices and/or fees for our service are subject to change without notice.
				Platform Fees and Subscriptions Directly to Subto are Non-Refundable. NO
				EXCEPTIONS. We reserve the right at any time to modify or discontinue
				the Service (or any part or content thereof) without notice at any time.
				We reserve the right to modify the platform fee at any time, to any rate
				for any reason. The current rate for Subto on Stripe and PayPal is 6%.
				Fees are based on the TOTAL amount of the transaction. This means that
				it is irregardless of coupons, discounts, trials or otherwise. This is
				subject to change at any time and can be higher or lower. Price will be
				updated here when it is changed. If at any point you uninstall or
				disconnect your account from the Subto service, your grandfathered rate
				from when you installed will be reset to the default new merchant rate
				should you resume or start using the service again. Our rate policy is
				firm and exceptions will not be made. We shall not be liable to you,
				your business or to any third-party for any modification, price change,
				suspension, bugs or discontinuance of the Service. We have the right to
				refuse or discontinue service to anyone at any time.
			</p>
		</div>
	);
}

function AccuracyBilling() {
	return (
		<div>
			<h2>Accuracy of Billing & Account Info</h2>
			<p>
				You agree to provide current, complete, and accurate purchase and
				account information for all transactions occurring on our service. You
				agree to promptly update your account and other information so that we
				can complete your transactions and contact you as needed. Any Service
				fees collected may be subject to sales tax or value-added tax (VAT). Any
				applicable tax is responsible of the business account and not Subto.
			</p>
		</div>
	);
}

function OptionalTools() {
	return (
		<div>
			<h2>Optional Tools</h2>
			<p>
				We may provide you with access to third-party tools over which we
				neither monitor nor have any control nor input. You acknowledge and
				agree that we provide access to such tools ”as is” and “as available”
				without any warranties, representations or conditions of any kind and
				without any endorsement. We shall have no liability whatsoever arising
				from or relating to your use of optional third-party tools. Any use by
				you of optional tools offered through the site is entirely at your own
				risk and discretion and you should ensure that you are familiar with and
				approve of the terms on which tools are provided by the relevant
				third-party provider(s). We may also, in the future, offer new services
				and/or features through the website (including, the release of new tools
				and resources). Such new features and/or services shall also be subject
				to these Terms of Service. We do not guarantee functionality or uptime
				and make no warrants to any party for functionality or uptime.
			</p>
		</div>
	);
}

function ThirdPartyLinks() {
	return (
		<div>
			<h2>Third Party Links</h2>
			<p>
				Certain content and services available via our Service may include
				materials or links from third-parties. Third-party links on this site,
				bot or service may direct you to third-party websites that are not
				affiliated with us. We are not responsible for examining or evaluating
				the content or accuracy and we do not warrant and will not have any
				liability or responsibility for any third-party materials or websites,
				or for any other materials, products, or services of third-parties. We
				are not liable for any harm or damages related to the purchase or use of
				goods, services, resources, content, or any other transactions made in
				connection with any third-party websites. Please review carefully the
				third-party's policies and practices and make sure you understand them
				before you engage in any transaction. Complaints, claims, concerns, or
				questions regarding third-party products should be directed to the
				third-party.
			</p>
		</div>
	);
}

function UserComments() {
	return (
		<div>
			<h2>User Comments, Feedback, and Content</h2>
			<div>
				If, at our request, you send certain specific submissions (for example
				contest entries) or without a request from us you send creative ideas,
				suggestions, proposals, plans, or other materials, whether online, by
				email, by postal mail, or otherwise (collectively, 'comments'), you
				agree that we may, at any time, without restriction, edit, copy,
				publish, distribute, translate and otherwise use in any medium any
				comments that you forward to us. We are and shall be under no obligation
				(1) to maintain any comments in confidence; (2) to pay compensation for
				any comments; or (3) to respond to any comments. We may, but have no
				obligation to, monitor, edit or remove content that we determine in our
				sole discretion are unlawful, offensive, threatening, libelous,
				defamatory, pornographic, obscene or otherwise objectionable or violates
				any party’s intellectual property or these Terms of Service. You agree
				that your comments will not violate any right of any third-party,
				including copyright, trademark, privacy, personality or other personal
				or proprietary right. You further agree that your comments will not
				contain libelous or otherwise unlawful, abusive or obscene material, or
				contain any computer virus or other malware that could in any way affect
				the operation of the Service or any related website. You may not use a
				false e-mail address, pretend to be someone other than yourself, or
				otherwise mislead us or third-parties as to the origin of any comments.
				You are solely responsible for any comments you make and their accuracy.
				We take no responsibility and assume no liability for any comments
				posted by you or any third-party.
			</div>
		</div>
	);
}

function Errors() {
	return (
		<div>
			{" "}
			<h2>Errors, Omissions and Inaccuracies</h2>
			<p>
				Occasionally there may be information on our site or in the Service that
				contains typographical errors, inaccuracies or omissions that may relate
				to descriptions, pricing, promotions, offers, and availability. We
				reserve the right to correct any errors, inaccuracies or omissions, and
				to change or update information or cancel orders if any information in
				the Service or on any related website is inaccurate at any time without
				prior notice (including after you have submitted your order). We
				undertake no obligation to update, amend or clarify information in the
				Service or on any related website, including without limitation, pricing
				information, except as required by law. No specified update or refresh
				date applied in the Service or on any related website, should be taken
				to indicate that all information in the Service or on any related
				website has been modified or updated.
			</p>
		</div>
	);
}
function ProhibitedUses() {
	return (
		<div>
			<h2>Prohibited Uses</h2>
			<p>
				In addition to other prohibitions as set forth in the Acceptable Use
				Policy, you are prohibited from using the site or its content: (a) for
				any unlawful purpose; (b) to solicit others to perform or participate in
				any unlawful acts; (c) to violate any international, federal, provincial
				or state regulations, rules, laws, or local ordinances; (d) to infringe
				upon or violate our intellectual property rights or the intellectual
				property rights of others; (e) to harass, abuse, insult, harm, defame,
				slander, disparage, intimidate, or discriminate based on gender, sexual
				orientation, religion, ethnicity, race, age, national origin, or
				disability; (f) to submit false or misleading information; (g) to upload
				or transmit viruses or any other type of malicious code that will or may
				be used in any way that will affect the functionality or operation of
				the Service or of any related website, other websites, or the Internet;
				(h) to collect or track the personal information of others; (i) to spam,
				phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or
				immoral purpose; or (k) to interfere with or circumvent the security
				features of the Service or the experience of our end users or any
				related website, other websites, or the Internet. (l) You agree not to
				reproduce, duplicate, copy, sell, resell, or exploit any portion of the
				Service, use of the Service, or access to the Service or any contact on
				the website through which the service is provided, without express
				written permission by us. (m) You agree not to solicit any Merchants,
				Vendors, Customers, Employees or Staff Members of Subto for any product
				or service. We reserve the right to terminate your use of the Service or
				any related website for violating any of the prohibited uses. This
				termination is at our discretion.
			</p>
		</div>
	);
}
function Disclaimer() {
	return (
		<div>
			<h2>Disclaimer of Warranties & Limited Liability</h2>
			<p>
				We do not guarantee, represent or warrant that your use of our service
				will be uninterrupted, timely, secure or error-free. We do not guarantee
				your fee rate and that may change according to these terms. There is no
				SLA or Uptime Agreement. Subto makes no claims or guarantees for uptime
				or functionality to any party. We do not warrant that the results that
				may be obtained from the use of the service will be accurate or
				reliable. There is no promise that the service will maintain accurate
				record or any record at all. You agree that from time to time we may
				remove the service for indefinite periods of time or cancel the service
				entirely at any time, without notice to you. You use this service at
				your own risk. You expressly agree that your use of, or inability to
				use, the service is at your sole risk. The service and all products and
				services delivered to you through the service are (except as expressly
				stated by us) provided 'as is' and 'as available' for your use, without
				any representation, warranties, guarantees or conditions of any kind,
				either express or implied, including all implied warranties or
				conditions of merchantability, merchantable quality, fitness for a
				particular purpose, durability, title, and non-infringement. In no case
				shall Subto, our directors, officers, employees, affiliates, owners,
				programmers, developers, agents, investors, contractors, interns,
				suppliers, service providers or licensors be liable for any injury,
				loss, claim, or any direct, indirect, incidental, punitive, special, or
				consequential damages of any kind, including, without limitation lost
				profits, lost revenue, lost savings, loss of data, replacement costs, or
				any similar damages, whether based in contract, tort (including
				negligence), strict liability or otherwise, arising from your use of any
				of the service or any products procured using the service, or for any
				other claim related in any way to your use of the service or any
				product, including, but not limited to, any errors or omissions in any
				content, or any loss or damage of any kind incurred as a result of the
				use of the service or any content (or product) posted, transmitted, or
				otherwise made available via the service, even if advised of their
				possibility. Because some states or jurisdictions do not allow the
				exclusion or the limitation of liability for consequential or incidental
				damages, in such states or jurisdictions, our liability shall be limited
				to the maximum extent permitted by law. IF YOU ARE DISSATISFIED WITH ANY
				PORTION OF THE WEBSITE, SERVICE, TEAM, PRODUCT OR WITH ANY OF THESE
				TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE
				WEBSITE.
			</p>
		</div>
	);
}

function Indemnification() {
	return (
		<div>
			<h2>Indemnification</h2>
			<p>
				You agree to indemnify, defend and hold harmless Subto and our parent,
				subsidiaries, affiliates, partners, officers, directors, agents,
				contractors, licensors, service providers, subcontractors, suppliers,
				interns and employees, harmless from any claim or demand, including
				reasonable attorneys’ fees, made by any third-party due to or arising
				out of your breach of these Terms of Service or the documents they
				incorporate by reference, or your violation of any law or the rights of
				a third-party. In no event will Subto's total liability and that of our
				directors, officers, employees, affiliates, owners, programmers,
				developers, agents, investors, contractors, interns, suppliers, service
				providers or licensors to you for all damages, losses or causes of
				action exceed one united states dollar ($1.00).
			</p>
		</div>
	);
}

function Severability() {
	return (
		<div>
			<h2>Severability</h2>
			<p>
				In the event that any provision of these Terms of Service is determined
				to be unlawful, void or unenforceable, such provision shall nonetheless
				be enforceable to the fullest extent permitted by applicable law, and
				the unenforceable portion shall be deemed to be severed from these Terms
				of Service, such determination shall not affect the validity and
				enforceability of any other remaining provisions.
			</p>
		</div>
	);
}

function TerminationOfService() {
	return (
		<div>
			<h2>Termination of Your Service</h2>
			<p>
				The obligations and liabilities of the parties incurred prior to the
				termination date shall survive the termination of this agreement for all
				purposes. These Terms of Service are effective unless and until
				terminated by either you or us. You may terminate these Terms of Service
				at any time by notifying us that you no longer wish to use our Services,
				or when you cease using our site, bot, api or service. If in our sole
				judgment you fail, or we suspect that you have failed, to comply with
				any term or provision of these Terms of Service, we also may terminate
				this agreement at any time without notice and you will remain liable for
				all amounts due up to and including the date of termination; and/or
				accordingly may deny you access to our Services (or any part thereof).
			</p>
		</div>
	);
}

function Remedies() {
	return (
		<div>
			<h2>Remedies to Subto</h2>
			<p>
				Violation of any of the terms or prohibitions contained in this
				Agreement may result in, among other things, (a) the immediate
				termination of this Agreement; (b) the withholding of Referral Fees due
				to you; or{" "}
				<strong>
					(c) the commencement of legal action by Subto against you seeking,
					without limitation, injunctive relief, recovery of actual, statutory
					or punitive damages.
				</strong>
			</p>
			<p>
				We have the right in our sole and absolute discretion to monitor your
				website, social media or Third Party sites containing your Qualifying
				Links at any time and from time to time to determine if you are in
				compliance with the terms of this Agreement, and you agree to provide us
				with unrestricted access to your website, social media or Third Party
				sites containing your Qualifying Links for such purposes.
			</p>
		</div>
	);
}

function Agreement() {
	return (
		<div>
			<h2>Entire Agreement</h2>
			<p>
				The failure of us to exercise or enforce any right or provision of these
				Terms of Service shall not constitute a waiver of such right or
				provision. These Terms of Service and any policies or operating rules
				posted by us on this site or in respect to The Service constitutes the
				entire agreement and understanding between you and us and govern your
				use of the Service, superseding any prior or contemporaneous agreements,
				communications and proposals, whether oral or written, between you and
				us (including, but not limited to, any prior versions of the Terms of
				Service). Any ambiguities in the interpretation of these Terms of
				Service shall not be construed against the drafting party. Subto and
				it's related parties shall not be liable to you or any party for any
				reason. These terms are final and supersede any prior, present or future
				agreements you may or may not have had with staff members, owners,
				partners or representatives of Subto.
			</p>
		</div>
	);
}

function GoverningLaw() {
	return (
		<div>
			<h2>Governing Law</h2>
			<p>
				These Terms of Service and any separate agreements whereby we provide
				you Services shall be governed by and construed in accordance with the
				laws of the state of South Carolina, USA.
			</p>
		</div>
	);
}

function Contests() {
	return (
		<div>
			<h2>Contests</h2>
			<p>
				Occasionally Subto holds contests. The rules for contests are as
				follows:
			</p>
			<p>
				<strong>
					NO PURCHASE NECESSARY. PURCHASE WILL NOT IMPROVE CHANCES OF WINNING.
				</strong>
			</p>
			<p>
				<b>ELIGIBILITY:</b> Sweepstakes is open to legal residents of the fifty
				(50) United States and the District of Columbia who are 18 years of age
				or older. Subto, Subto Partners, Influencers, Contractors and their
				respective parents, subsidiaries, affiliates, sweepstakes partners,
				advertising agencies and members of their immediate family (spouse,
				parent, sibling or child and their respective spouses, regardless of
				where they reside) and persons living in the same household of such
				employees, influencers or contractors, whether or not related, are not
				eligible to enter or win. Void where prohibited by law. Sweepstakes is
				subject to all applicable federal, state, and local laws.
			</p>
			<p>
				<b>HOW TO ENTER:</b> Visit Subto support server, find the contest
				channel and follow the directions provided to complete and submit the
				required information or perform the necessary action to receive one (1)
				entry. Limit of one (1) entry per person / server throughout the Contest
				Period. Eligibility of individual entries will be at the sole discretion
				of Subto, for any reason or for no reason, though specific reasons for
				disqualification may include use of inappropriate language or visuals.
				Subto is not responsible for and will not consider incomplete or
				incorrect entries. Entries generated by script, macro, mechanical or
				other automated means and entries by any means which subvert the entry
				process are void. Multiple entries received from any person in excess of
				the stated limitation will be void. All entries and information
				submitted become the sole property of Subto and will not be returned.
			</p>
			<p>
				<b>DRAWING:</b> One (1) potential Grand Prize winner will be selected.
				An example of an entry for a contest that requires server owners to get
				referrals would be, an existing server member refers a new customer.
				Attempts to defraud the contest will result in an instant
				disqualification.{" "}
			</p>
			<p>
				Examples would include: Self Dealing, Self-Signups, Fake Signups,
				Duplicate Signups, Repeat Same User Signups, Automated Signups /
				Entries, Churning, Low Balling, Pay-to-Win / Pay-to-Play, or other
				dishonest attempts to gain entries not in good faith in the spirit of
				the contest.
			</p>
			<p>
				<b>GENERAL CONDITIONS:</b> By participating, each entrant agrees: (a) to
				abide by these Official Rules and decisions of Subto, which shall be
				final in all respects relating to this Sweepstakes; (b) to release,
				discharge and hold harmless Subto, and their respective parents,
				affiliates, subsidiaries, and advertising and Sweepstakes agencies, and
				the respective officers, directors, shareholders, employees, agents and
				representatives of the foregoing (collectively, "Released Parties") from
				any and all injuries, liability, losses and damages of any kind to
				persons, including death, or property resulting, in whole or in part,
				directly or indirectly, from entrant's participation in the Sweepstakes
				or the acceptance, possession, use or misuse of any awarded prize (or
				portion thereof), including any/all travel/activity related thereto; and
				(c) to the use of his/her name, address (city and state), voice,
				performance, photograph, image and/or other likeness for programming,
				advertising, publicity, trade and promotional purposes in any and all
				media, now or hereafter known, worldwide and on the Internet, and in
				perpetuity by Subto and its designees, without compensation (unless
				prohibited by law) or additional consents from entrant or any third
				party and without prior notice, approval or inspection, and to execute
				specific consent to such use if asked to do so.
			</p>
			<p>
				Contests that do not have a winner by the end date will either have the
				winner be chosen at random, assigned to the highest contributing entrant
				with the most entries, or forefieted and the prize winnings deposited
				back into our general account for explicit use in a future contest as
				the prize funds.
			</p>
			<p>
				In the event of a dispute regarding entries received from multiple users
				having the same e-mail account, Server ID, PayPal ID, Stripe ID, etc.
				the authorized subscriber of the e-mail account at the time of entry
				will be deemed to be the entrant and must comply with these Official
				Rules. Authorized account subscriber is the natural person who is
				assigned the e-mail address by the Internet Service Provider (ISP),
				on-line service provider, or other organization responsible for
				assigning e-mail addresses. Released Parties not responsible for any
				technical problems, malfunctions of any telephone lines, computer
				systems, servers, providers, hardware/software, lost or unavailable
				network connections or failed, incomplete, garbled or delayed computer
				transmission or any combination thereof. Released Parties are not
				responsible for late, lost, damaged, misdirected, incomplete,
				undeliverable, destroyed, garbled, postage-due, illegible, inaccurate,
				delayed or stolen entries or mail; or for lost, interrupted or
				unavailable network, server, Internet Service Provider (ISP), website,
				or other connections, availability or accessibility or miscommunications
				or failed computer, satellite, telephone or cable transmissions, lines,
				or technical failure or jumbled, scrambled, delayed, or misdirected
				transmissions or computer hardware or software malfunctions, failures or
				difficulties, or other errors or difficulties of any kind whether
				typographical, human mechanical, electronic, computer, network, printing
				or otherwise relating to or in connection with the Sweepstakes,
				including, without limitation, errors or difficulties which may occur in
				connection with the administration of the Sweepstakes, the processing of
				entries or mail, the announcement of the prize or in any
				Sweepstakes-related materials. Released Parties are also not responsible
				for any incorrect or inaccurate information, whether caused by site
				users, tampering, hacking, or by any equipment or programming associated
				with or utilized in the Sweepstakes. Released Parties are not
				responsible for injury or damage to entrants' or to any other person's
				computer related to or resulting from participating in this Sweepstakes
				or downloading materials from or use of the website. Subto may
				disqualify anyone from participating in the Sweepstakes or winning the
				prize (and void all associated entries) if, in its sole discretion, it
				determines that such person is attempting to undermine the legitimate
				operation of the Sweepstakes by cheating, deception or other unfair
				playing practices, or intending to annoy, abuse, threaten or harass any
				other entrant or Subto's representatives. ANY ATTEMPT TO DELIBERATELY
				DAMAGE THE WEBSITE OR UNDERMINE THE LEGITIMATE OPERATION OF THE
				SWEEPSTAKES MAY BE IN VIOLATION OF CRIMINAL AND CIVIL LAWS AND SHOULD
				SUCH AN ATTEMPT BE MADE, Subto RESERVES THE RIGHT TO SEEK ANY AND ALL
				REMEDIES AVAILABLE FROM ANY SUCH INDIVIDUAL TO THE FULLEST EXTENT OF THE
				LAW, INCLUDING CRIMINAL PROSECUTION. Subto reserves the right in its
				sole discretion to cancel, modify or suspend any portion of the
				Sweepstakes for any reason, including should any cause corrupt the
				administration, security or proper play of the Sweepstakes and, in the
				event of termination, to determine the potential winner in a drawing
				from among all eligible non-suspect entries received and combined up to
				such time of impairment or cancel the contest in it's entirety.
			</p>
			<p>
				<b>DISPUTE RESOLUTION:</b> Except where prohibited by law, as a
				condition of participating in this Sweepstakes, entrant agrees that (1)
				any and all disputes and causes of action arising out of or connected
				with this Sweepstakes, or prize awarded, shall be resolved individually,
				without resort to any form of class action, and exclusively by final and
				binding arbitration under the rules of the American Arbitration
				Association and held at the AAA regional office nearest the entrant; (2)
				the Federal Arbitration Act shall govern the interpretation, enforcement
				and all proceedings at such arbitration; and (3) judgment upon such
				arbitration award may be entered in any court having jurisdiction. Under
				no circumstances will entrant be permitted to obtain awards for, and
				entrant hereby waives all rights to claim, punitive, incidental or
				consequential damages, or any other damages, whether foreseeable or not
				and whether based on negligence or otherwise, including attorneys' fees,
				other than entrant's actual out-of-pocket expenses (i.e., costs
				associated with participating in this Sweepstakes), and entrant further
				waives all rights to have damages multiplied or increased.
			</p>
			<p>
				<b>CHOICE OF LAW:</b> All issues and questions concerning the
				construction, validity, interpretation and enforceability of these
				Official Rules, or the rights and obligations of entrant and Sponsor in
				connection with the Sweepstakes, shall be governed by, and construed in
				accordance with, the substantive laws of the State of South Carolina,
				USA.
			</p>
		</div>
	);
}

function ChangesToTOS() {
	return (
		<div>
			<h2>Changes to These Terms of Service</h2>
			<p>
				You can review the most current version of the Terms of Service at any
				time by viewing them here. We reserve the right, at our sole discretion,
				to update, change or replace any part of these Terms of Service by
				posting updates and changes here with the date of edit marked at the
				top. It is your responsibility to check our website periodically for
				changes. Your continued use of or access to our website or the Service
				following the posting of any changes to these Terms of Service
				constitutes acceptance of those changes.
			</p>
			Questions about the Terms of Service or the product in general should be
			asked via our website. The link can be found on{" "}
			<a className="text-primary hover:underline" href="https://subto.xyz/">
				https://subto.xyz/
			</a>{" "}
			or via our support server which can be located in these documents with the
			link on the left.
		</div>
	);
}
