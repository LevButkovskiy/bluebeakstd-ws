import {UserOutlined} from "@ant-design/icons/lib/icons"
import {Avatar, Button, Comment, Form, Input, List} from "antd"
import _ from "lodash"
import {useEffect, useRef, useState} from "react"

const BACKGROUND_URL =
	"https://us.123rf.com/450wm/telmanbagirov/telmanbagirov1803/telmanbagirov180300006/96954735-seamless-sosial-life-icons-pattern-grey-on-white-background.jpg?ver=6"

export default function WSPage() {
	const [isConnected, setIsConnected] = useState(false)
	const [messages, setMessages] = useState([])
	const [user, setUser] = useState({})

	const socket = useRef()

	const [form] = Form.useForm()

	useEffect(() => {
		if (!socket.current) {
			socket.current = new WebSocket("ws://localhost:9000")
			socket.current.onopen = () => {
				setIsConnected(true)
			}
			socket.current.onmessage = (newMessage) => {
				const message = JSON.parse(_.get(newMessage, "data", "{}"))
				setMessages((oldMessages) => [...oldMessages, message])
			}
			socket.current.onerror = (error) => {
				console.error(error)
			}
			socket.current.onclose = () => {
				setIsConnected(false)
			}
		}
	}, [])

	const sendMessage = async () => {
		const {text} = await form.getFieldsValue()
		form.resetFields()
		socket.current.send(
			JSON.stringify({
				event: "message",
				data: {from: _.get(user, "_id"), to: _.get(user, "_id") === "1" ? "2" : "1", text},
			}),
		)
	}

	const wsSendPing = () => {
		socket.current.send(JSON.stringify({event: "PING"}))
	}

	if (!isConnected || !_.get(user, "_id")) {
		return (
			<>
				<span style={{color: "red"}}>No Auth</span>
				<button onClick={() => setUser({_id: "1", name: "user 1"})}>User1</button>
				<button onClick={() => setUser({_id: "2", name: "user 2"})}>User2</button>
			</>
		)
	}

	return (
		<div
			style={{
				backgroundImage: `url(${BACKGROUND_URL})`,
				minHeight: "100vh",
			}}
		>
			<div style={{backdropFilter: "saturate(100%) brightness(80%)", minHeight: "100vh"}}>
				<div>
					<small>{"Connected"}</small>
				</div>

				<span>
					Auth as: <span style={{fontWeight: "bold"}}>{_.get(user, "name")}</span>
				</span>
				<button onClick={wsSendPing}>PING</button>

				<List
					itemLayout='horizontal'
					dataSource={messages}
					renderItem={(message) => (
						<div
							style={{
								margin: "10px",
								display: "flex",
								flexDirection: _.get(message, "to") === _.get(user, "_id") ? "row" : "row-reverse",
							}}
						>
							{_.get(message, "to") === _.get(user, "_id") ? (
								<Avatar src='https://joeschmoe.io/api/v1/random' style={{background: "white"}} size={48} icon={<UserOutlined />} />
							) : (
								""
							)}
							<div
								style={{
									background: "#3498DB",
									padding: "5px 10px 5px 10px",
									borderRadius: "32px 24px",
									marginLeft: "8px",
									fontSize: "14px",
									fontWeight: "500",
									maxWidth: "45%",
									wordWrap: "breakWord",
									textAlign: "left",
								}}
							>
								{message.text} <div style={{fontSize: "10px", textAlign: "right"}}>{new Date(message.createdAt).toLocaleTimeString()}</div>
							</div>
						</div>
					)}
				/>
				<div
					style={{
						textAlign: "right",
						width: "calc(100% - 50px)",
						position: "fixed",
						bottom: "25px",
						right: "25px",
						background: "white",
						padding: "10px 10px 0 10px",
						borderRadius: "20px",
					}}
				>
					<Form onFinish={sendMessage} form={form} size='small'>
						<Form.Item name='text'>
							<Input style={{textAlign: "right"}} />
						</Form.Item>
						<Form.Item>
							<Button onClick={() => form.submit()} type='primary'>
								SEND
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	)
}
