import forms from '@tailwindcss/forms';
import { skeleton, contentPath } from '@skeletonlabs/skeleton/plugin';
import { cerberus } from '@skeletonlabs/skeleton/themes';
import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', contentPath(import.meta.url, 'svelte')],
	theme: {
		extend: {}
	},
	plugins: [
		forms,
		skeleton({
			themes: [cerberus]
		}),
		scrollbar
	]
};
