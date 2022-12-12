import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	if (request.method?.toLowerCase() === 'get') {
		const commentId = request.query?.id || null
		if (commentId) response.status(200).json({ comment: { id: commentId } })
		else
			response.status(200).json({
				comments: [
					{
						id: 1670807894661,
						name: 'Maximilian',
						comment: 'My comment is amazing',
					},
					{
						id: 1670807904146,
						name: 'Maximilian',
						comment: 'My comment is amazing',
					},
				],
			})
		return
	}
	if (request.method?.toLowerCase() === 'post') {
		const { email, name, comment } = JSON.parse(request.body)

		if (!email) {
			response.status(400).json({ error: 'No email received' })
			return
		}
		if (!comment) {
			response.status(400).json({ error: 'No comment received' })
			return
		}

		//? SUCCESS
		const messageToSave = {
			email,
			comment,
			name: name || 'Anonymous',
		}
		console.log(messageToSave)
		response.status(201).json({})
		return
	}
	response
		.status(501)
		.json({ error: `Method not implemented: ${request.method}` })
	return
}
