import {SendOutlined, UserOutlined} from "@ant-design/icons/lib/icons"
import {Avatar, Badge, Button, Comment, Divider, Form, Input, List, message, PageHeader, Typography} from "antd"
import _ from "lodash"
import {useEffect, useRef, useState} from "react"

const BACKGROUND_URL =
	"https://us.123rf.com/450wm/telmanbagirov/telmanbagirov1803/telmanbagirov180300006/96954735-seamless-sosial-life-icons-pattern-grey-on-white-background.jpg?ver=6"

export default function WSPage() {
	const [isConnected, setIsConnected] = useState(false)
	const [messages, setMessages] = useState([])
	const [messageInput, setMessageInput] = useState("")
	const [user, setUser] = useState({})

	const messageInputForm = useRef()
	const socket = useRef()

	const [form] = Form.useForm()
	const [authForm] = Form.useForm()

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

	useEffect(() => {
		if (messageInputForm.current) {
			console.log(messageInputForm.current)
			messageInputForm.current.focus()
		}
		location.href = "#anchor"
	}, [messages])

	// useEffect(() => {
	// 	console.log("window", document.getElementById("messageInput").getBoundingClientRect())
	// 	if (document.getElementById("messageInput")) {
	// 		location.href = "#messageInput"
	// 		// window.scrollTo(0, document.getElementById("messageInput").getBoundingClientRect().bottom)
	// 	}
	// })

	const sendMessage = async () => {
		if (messageInput) {
			socket.current.send(
				JSON.stringify({
					event: "message",
					data: {from: _.get(user, "_id"), to: _.get(user, "_id") === "1" ? "2" : "1", text: messageInput},
				}),
			)
			setMessageInput("")
		}
	}

	const auth = async () => {
		const {login, password} = await authForm.getFieldsValue()

		if (password === "1111") {
			message.loading({content: "Loading...", key: "1", duration: 1})
			setTimeout(() => {
				setUser({_id: "1", name: login})
			}, 1000)
		} else if (password === "2222") {
			message.loading({content: "Loading...", key: "1", duration: 1})
			setTimeout(() => {
				setUser({_id: "2", name: login})
			}, 1000)
		} else {
			message.loading({content: "Loading...", key: "3"})
			setTimeout(() => {
				message.error({content: "Invalid login or password", key: "3"})
			}, 1000)
		}
	}

	if (!isConnected || !_.get(user, "_id")) {
		return (
			<div
				style={{
					background: "linear-gradient(0deg, rgba(74,101,128,1) 0%, rgba(195,220,255,1) 74%, rgba(201,211,217,1) 100%)",
					minHeight: "100vh",
					minWidth: "100vw",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						position: "absolute",
						top: "20%",
						background: "white",
						padding: "20px 40px",
						boxShadow: "12px 12px 8px 0px rgba(34, 60, 80, 0.2)",
						borderRadius: "6px",
						width: "20%",
					}}
				>
					<Form layout='vertical' form={authForm} onFinish={() => auth()}>
						<Typography.Title level={2}>Chat Auth</Typography.Title>
						<Form.Item label='Login' name='login' rules={[{required: true, message: "Login is required"}]}>
							<Input />
						</Form.Item>
						<Form.Item label='Password' name='password' rules={[{required: true, message: "Password is required"}]}>
							<Input type='password' />
						</Form.Item>
						<Form.Item>
							<Button type='primary' onClick={() => authForm.submit()}>
								Log In
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		)
	}

	return (
		<div
			style={{
				// backgroundImage: `url(${BACKGROUND_URL})`,
				minHeight: "100vh",
			}}
		>
			<div
				style={
					{
						// backdropFilter: "saturate(100%) brightness(80%)", minHeight: "100vh"
					}
				}
			>
				{/* <PageHeader
					className='site-page-header'
					onBack={() => setUser({})}
					title='WebSocket Chat'
					subTitle={`Welcome back, ${_.get(user, "name")}`}
					style={{background: "white"}}
					extra={[
						<Badge key='online status' dot color={isConnected ? "green" : "red"}>
							<span>Соединение установлено</span>
						</Badge>,
					]}
				/>
				<Divider /> */}
				{console.log("calc(100% - 89px)")}
				<div style={{minHeight: "calc(100vh - 89px)"}}>
					<List
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
								<div style={{maxWidth: "45%"}}>
									<div
										style={{
											background: "#1A66FF",
											padding: "13px 28px 13px 28px",
											borderRadius: "10px",
											marginLeft: "8px",
											fontSize: "16px",
											fontWeight: "500",
											wordWrap: "breakWord",
											textAlign: "left",
											color: "white",
										}}
									>
										{message.text} <div style={{fontSize: "10px", textAlign: "right"}}></div>
									</div>
									<div style={{textAlign: "right", color: "rgba(0, 0, 0, 0.25)", margin: "4px"}}>
										{new Date(message.createdAt).toLocaleTimeString()}
									</div>
								</div>
							</div>
						)}
					/>
				</div>
				<div
					id='inputBlock'
					style={{
						textAlign: "right",
						width: "100%",
						position: "static",
						bottom: "0px",
						right: "0px",
						background: "white",
					}}
				>
					<Divider noStyle style={{margin: "0px"}} />
					<div style={{display: "flex", padding: "16px 24px"}}>
						<Input
							id='messageInput'
							value={messageInput}
							onChange={(event) => setMessageInput(event.target.value)}
							noStyle
							style={{
								textAlign: "right",
								background: "#E0E0E0",
								padding: "14px 24px",
								borderRadius: "10px",
								fontSize: "16px",
								fontWeight: "500",
								marginRight: "12px",
							}}
							onPressEnter={sendMessage}
							ref={(input) => {
								messageInputForm.current = input
							}}
						/>
						<Button
							onClick={sendMessage}
							style={{background: "#1A66FF", borderRadius: "10px", margin: "auto", padding: "18px 18px 36px 18px", color: "white"}}
						>
							<SendOutlined />
						</Button>
					</div>
				</div>
				<div id='anchor' style={{position: "fixed", bottom: "0px", height: "0px"}}></div>
			</div>
		</div>
	)
}
