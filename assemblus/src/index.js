import html_index from "../public/pages/index.html"
import html_cours from "../public/pages/cours.html"
import html_chap1 from "../public/pages/chapitre1.html"
import html_chap2 from "../public/pages/chapitre2.html"
import html_chap3 from "../public/pages/chapitre3.html"
import html_chap4 from "../public/pages/chapitre4.html"

import { getData } from "./services/GroqService";

/**
 * https://assemblus.pageweaver.workers.dev/
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

		if (url.pathname == "/cours/chapitre1") {
			return new Response(html_chap1,
				{ headers: { "Content-Type": "text/html; charset=UTF-8" } }
			)
		}

		if (url.pathname == "/cours/chapitre2") {
			return new Response(html_chap2,
				{ headers: { "Content-Type": "text/html; charset=UTF-8" } }
			)
		}

		if (url.pathname == "/cours/chapitre3") {
			return new Response(html_chap3,
				{ headers: { "Content-Type": "text/html; charset=UTF-8" } }
			)
		}

		if (url.pathname == "/cours/chapitre4") {
			return new Response(html_chap4,
				{ headers: { "Content-Type": "text/html; charset=UTF-8" } }
			)
		}

		if (url.pathname == "/api") {
			const sujet = url.searchParams.get("sujet")
			const code = url.searchParams.get("code")

			const result = await getData(env.GROQ_API_KEY, sujet, code)
			return new Response(result)
		}

		return new Response('404 Not Found', { status: 404 });
	}
};
