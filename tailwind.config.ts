import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Raleway', 'Helvetica', 'Ubuntu', 'system-ui', 'sans-serif'],
			},
			colors: {
				primary: {
					900: '#01579B',
					800: '#0277BD',
					700: '#0288D1',
					600: '#039BE5',
					500: '#03A9F4',
					400: '#29B6F6',
					300: '#4FC3F7',
					200: '#81D4FA',
					100: '#B3E5FC',
					50: '#E1F5FE',
				},
				secondary: {
					900: '#006064',
					800: '#00838F',
					700: '#0097A7',
					600: '#00ACC1',
					500: '#00BCD4',
					400: '#26C6DA',
					300: '#4DD0E1',
					200: '#80DEEA',
					100: '#B2EBF2',
					50: '#E0F7FA',
				},
			},
		},
	},
	plugins: [],
};
export default config;
