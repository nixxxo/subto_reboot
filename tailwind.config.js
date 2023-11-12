const primaryGradient = "linear-gradient(135deg, #ED453B 0%, #F9A94C 100%)";
const primary = "rgba(233, 89, 33, 1)";
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./node_modules/tw-elements/dist/js/**/*.js",
	],
	theme: {
		extend: {
			backgroundImage: {
				primaryGradient,
			},
			colors: {
				primary,
				primaryGradient,
			},
		},
	},
	plugins: [require("tw-elements/dist/plugin")],
	// plugins: [require("tw-elements/dist/plugin"), require("daisyui")],
	// daisyui: {
	// 	themes: false,
	//   },
};
