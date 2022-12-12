import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	if (request.method?.toLowerCase() === 'post') {
		let { email } = JSON.parse(request.body)

		if (!email) {
			response.status(400).json({ error: 'No email received' })
			return
		}

		//? SUCCESS
		console.log(email)
		response.status(201).json({})
		return
	}
	response
		.status(501)
		.json({ error: `Method not implemented: ${request.method}` })
	return
}
