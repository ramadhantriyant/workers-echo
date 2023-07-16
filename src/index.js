export default {
	async fetch(request, env) {
		const tgUrl = `https://api.telegram.org/bot${env.TOKEN}`;

		// Set HTTP Headers
		const headers = {
			'content-type': 'application/json',
			'accept': 'application/json'
		}

		// Read message sent from Telegram
		const body = await request.json();
		const chatId = body.message.from.id;
		const text = body.message.text;

		// Send Message to Telegram
		const response = await fetch(`${tgUrl}/sendMessage`, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				chat_id: chatId,
				text: text
			})
		});

		// Reply Response to Telegram, should be unneeded
		async function getResponse(response) {
			return JSON.stringify(await response.json());
		}
		const results = await getResponse(response);
		return new Response(JSON.stringify(results), { headers: headers });
	},
};
