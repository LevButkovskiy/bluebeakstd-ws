import {Button, Input, Typography, Form, message} from "antd"
import {useRouter} from "next/router"
import {useState} from "react"

export default function LoginPage() {
	const [user, setUser] = useState({})
	const router = useRouter()

	const [authForm] = Form.useForm()

	const auth = async () => {
		const {login, password} = await authForm.getFieldsValue()

		if (password === "1111") {
			message.loading({content: "Loading...", key: "1", duration: 1})
			setTimeout(() => {
				router.replace("/")
				setUser({_id: "1", name: login})
			}, 1000)
		} else if (password === "2222") {
			message.loading({content: "Loading...", key: "1", duration: 1})
			setTimeout(() => {
				router.replace("/")
				setUser({_id: "2", name: login})
			}, 1000)
		} else {
			message.loading({content: "Loading...", key: "3"})
			setTimeout(() => {
				message.error({content: "Invalid login or password", key: "3"})
			}, 1000)
		}
	}

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
					<Typography.Title level={2}>Auth</Typography.Title>
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
