const WebSocket = require("ws")

const PORT = 9000

const wss = new WebSocket.Server({port: PORT}, () => console.info("Server started on", PORT))

wss.on("connection", (ws) => {
	ws.on("message", (message) => {
		try {
			const {event, data} = JSON.parse(message)
			switch (event) {
				case "message": {
					const {text, from, to} = data
					broadcastMessage({from, to, text, createdAt: new Date()})
					break
				}
				case "PING": {
					setTimeout(() => {
						wss.clients.forEach((client) => client.send("PONG"))
					}, 2000)
					break
				}
				default: {
					console.info("undefined command")
					break
				}
			}
		} catch (error) {
			console.error("ERROR:", error)
		}
	})
	ws.on("close", () => {
		console.info("connection closed")
	})
	ws.on("error", (error) => ws.send(error))
})

const broadcastMessage = (message) => {
	wss.clients.forEach((client) => client.send(JSON.stringify(message)))
}
