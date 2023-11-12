import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";
import nodemailer from "nodemailer";

//sending emails from subtoapp@gmail.com
// receiving emails on subtoreceiver@gmail.com
// password for both accounts is same and in the .env file

const reCaptchaVerificationURL =
	"https://www.google.com/recaptcha/api/siteverify";
const recaptchaSecret = process.env.GOOGLE_CAPTCHA_SECRET_KEY;

export default function support(req: NextApiRequest, res: NextApiResponse) {
	const { value, error } = schema.validate(req.body);
	if (error) {
		console.log(error);
		return res.status(400).json(error);
	}
	// console.log(value);
	const { email, message, subject, captchaValue } = value;

	let postURL = `${reCaptchaVerificationURL}?secret=${recaptchaSecret}&response=${captchaValue}`;
	postURL = encodeURI(postURL);
	return axios
		.post(postURL, {
			secret: recaptchaSecret,
			response: req.body.value,
		})
		.then(async (resp) => {
			if (resp.data.success) {
				try {
					await sendMail(subject, message, email);
					console.log("Successfuly sent email");
					return res
						.status(200)
						.setHeader("Content-Type", "text/plain")
						.send("Success");
				} catch (err) {
					console.log(err);
					res.status(500).send("Internal Server Error");
				}
			} else {
				console.log("Error with captcha");
				return res.status(400).send("Invalid captcha");
			}
		})
		.catch((err) => {
			return res.status(500).send("Error while validating captcha");
		});
}

const schema = Joi.object({
	subject: Joi.string().min(1).max(100).required(),
	message: Joi.string().min(1).max(500).required(),
	captchaValue: Joi.string().min(10).max(1000).required(),

	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net", "bg", "eu", "org", "edu", "gov"] },
		})
		.required(),
});

function sendMail(subject, message, email) {
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "subtoapp@gmail.com",
			pass: process.env.EMAIL_SENDING_PASSWORD,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});
	let mailOptions = {
		from: "subtoapp@gmail.com",
		to: "media1234@abv.bg",
		subject: `Subto Support: ${subject}`,
		text:`
		From:${email}
		
		Message: ${message}
		`,
	};
	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (err, data) => {
			if (err) {
				console.log("Error", err);
				return reject(err);
			} else {
				console.log("Successfully sent email");
				return resolve(data);
			}
		});
	});
}
