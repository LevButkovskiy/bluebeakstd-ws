// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import _ from "lodash"

export default function handler(req, res) {
	const {method} = req
	switch (method) {
		case "GET": {
			const list = [{test: "e"}]
			res.status(200).json({list, count: _.get(list, "length")})
		}
		case "POST": {
		}
		default: {
			res.status(405).json({error: "Method not allowed"})
		}
	}
}
