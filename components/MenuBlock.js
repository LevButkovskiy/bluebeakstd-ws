import {CloudOutlined, FileOutlined, MessageOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons/lib/icons"
import {Layout, Menu, Typography} from "antd"
import Image from "next/image"
import Link from "next/link"
import {useState} from "react"

const {SubMenu} = Menu
const {Header, Content, Footer, Sider} = Layout
const {Title} = Typography

export default function MenuBlock({children}) {
	const [collapsed, setCollapsed] = useState(false)

	const onCollapse = (collapsed) => {
		setCollapsed(collapsed)
	}

	return (
		<Layout style={{minHeight: "100vh"}}>
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className='logo' style={{display: "flex", height: "60px", alignItems: "center", justifyContent: "space-around", width: "100%"}}>
					{!collapsed && (
						<Title level={3} style={{color: "white", marginTop: "16px"}}>
							BlueBeakStd
						</Title>
					)}
					<Image src='/logo.svg' alt='' width='30px' height='30px' />
				</div>
				<Menu theme='dark' defaultSelectedKeys={["1"]} mode='inline'>
					<Menu.Item key='1' icon={<MessageOutlined />}>
						<Link href='/ws'>
							<a>Chat</a>
						</Link>
					</Menu.Item>
					<Menu.Item key='2' icon={<CloudOutlined />}>
						<Link href='/weather'>
							<a>Weather</a>
						</Link>
					</Menu.Item>
					<SubMenu key='sub1' icon={<UserOutlined />} title='User'>
						<Menu.Item key='3'>Tom</Menu.Item>
						<Menu.Item key='4'>Bill</Menu.Item>
						<Menu.Item key='5'>Alex</Menu.Item>
					</SubMenu>
					<SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
						<Menu.Item key='6'>Team 1</Menu.Item>
						<Menu.Item key='8'>Team 2</Menu.Item>
					</SubMenu>
					<Menu.Item key='9' icon={<FileOutlined />}>
						Files
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className='site-layout'>
				<Header className='site-layout-background' style={{padding: 0, textAlign: "center", color: "lightgray"}}>
					Main
				</Header>
				<Content>{children}</Content>
				<Footer style={{textAlign: "center"}}>Ant Design ©2018 Created by Ant UED</Footer>
			</Layout>
		</Layout>
	)
}
