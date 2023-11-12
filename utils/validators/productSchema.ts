import Joi from "joi";
const productSchema = Joi.object({
	visibility: Joi.boolean().required(),
	billingFrequency: Joi.string()
		.valid("onetime", "recurring_monthly")
		.required(),
	price: Joi.number().required().greater(0).integer().max(99999999), //stripe max value is 99999999
	name: Joi.string().required().max(150),
	discord_server_db_id: Joi.string().required(),
});

export default productSchema;
