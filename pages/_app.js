import "../styles/globals.css"
import "antd/dist/antd.css"
import _ from "lodash"

import MenuBlock from "../components/MenuBlock"

function MyApp({Component, pageProps}) {
	if (typeof window !== "undefined") {
		console.log(window.location)

		if (["/login"].includes(_.get(window, "location.pathname"))) {
			return <Component {...pageProps} />
		}
		return (
			<MenuBlock>
				<Component {...pageProps} />
			</MenuBlock>
		)
	}
	return "serverside"
}
export default MyApp
