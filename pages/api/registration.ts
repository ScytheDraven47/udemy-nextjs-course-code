import { NextApiRequest, NextApiResponse } from 'next'
import { saveNewsletterRegistration } from '../../helpers/db-util'

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	if (!request.method) {
		response.status(501).json({ error: 'Method not defined' })
		return
	}

	if (/^POST$/i.test(request.method)) {
		const { email } = request.body

		if (!email || !/^[\w+.-]+@[\w+.-]+$/.test(email)) {
			response.status(422).json({ error: 'Invalid email address' })
			return
		}

		const result = await saveNewsletterRegistration(email)
		if (result.error) {
			response
				.status(500)
				.json({ error: 'Could not connect to server', detail: result.error })
			return
		}

		response.status(201).json({
			message: 'Registration successful',
			insertedId: result.insertedId,
		})
		return
	}

	response
		.status(501)
		.json({ error: `Method not implemented: ${request.method}` })
	return
}
