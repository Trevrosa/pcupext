import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { run } from "./removeInlineScript.cjs"

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: 'remove inline script',
			handleHotUpdate: run,
			: run,
			// buildEnd: run,
		}
	]
});
