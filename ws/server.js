const WebSocket = require("ws")

const PORT = 9000

const wsServer = new WebSocket.Server({port: PORT})

wsServer.on("connection", (wsClient) => {
	wsClient.send("Hello")
	wsClient.on("message", (message) => {
		try {
			const {action, data} = JSON.parse(message)
			console.log(action)
			switch (action) {
				case "ECHO": {
					wsClient.send(data)
					break
				}
				case "PING": {
					setTimeout(() => {
						wsServer.clients.forEach((client) => client.send("PONG"))
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
	wsClient.on("close", () => {
		console.info("connection closed")
	})
	wsClient.on("error", (error) => wsClient.send(error))
})

console.info("Server started on", PORT)
