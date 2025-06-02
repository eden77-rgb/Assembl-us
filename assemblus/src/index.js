import html_index from "../public/pages/index.html"
import html_cours from "../public/pages/cours.html"

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if (url.pathname == "/") {
			return new Response(html_index,
				{ headers: { "Content-Type": "text/html; charset=UTF-8" } }
			)
		}

		if (url.pathname == "/cours") {
			return new Response(html_cours,
				{ headers: { "Content-Type": "text/html; charset=UTF-8" } }
			)
		}

		return new Response('404 Not Found', { status: 404 });
	}
};
