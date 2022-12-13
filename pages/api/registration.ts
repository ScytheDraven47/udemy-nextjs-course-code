import { NextApiRequest, NextApiResponse } from 'next'
import { saveNewsletterRegistration } from '../../helpers/db-util'

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	if (!request.method) {
		response.status(501).json({ error: `Method not defined` })
		return
	}

	if (/^POST$/i.test(request.method)) {
		const { email } = request.body

		if (!email || !/^[\w+.-]+@[\w+.-]+$/.test(email)) {
			response.status(422).json({ error: 'Invalid email address' })
			return
		}

		await saveNewsletterRegistration(email)

		response.status(201).json({ message: 'Registration successful' })
		return
	}

	response
		.status(501)
		.json({ error: `Method not implemented: ${request.method}` })
	return
}
