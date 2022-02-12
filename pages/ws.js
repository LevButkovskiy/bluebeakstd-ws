import {useEffect, useState} from "react"
import {w3cwebsocket as W3CWebSocket} from "websocket"

const wsClient = new W3CWebSocket("ws://localhost:9000")

export default function WSPage() {
	const [wsStatus, setWsStatus] = useState("")
	useEffect(() => {
		wsClient.onopen = () => {
			setWsStatus("ws client connected")
		}
		wsClient.onmessage = (message) => {
			console.info("Message: %s", message.data)
		}
		wsClient.onerror = (error) => {
			setWsStatus("error:", error)
		}
		wsClient.onclose = () => {
			setWsStatus("ws client closed")
		}
	}, [])
	// функция для отправки echo-сообщений на сервер
	const wsSendEcho = (value = "test") => {
		wsClient.send(JSON.stringify({action: "ECHO", data: value.toString()}))
	}
	// функция для отправки команды ping на сервер
	const wsSendPing = () => {
		wsClient.send(JSON.stringify({action: "PING"}))
	}

	return (
		<>
			{wsStatus}
			<button onClick={() => wsSendEcho()}>ECHO</button>
			<button onClick={wsSendPing}>PING</button>
		</>
	)
}
