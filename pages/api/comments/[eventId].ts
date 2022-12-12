import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	if (!request.method) {
		response.status(501).json({ error: `Method not defined` })
		return
	}

	if (/^GET$/i.test(request.method)) {
		const eventId = request.query?.eventId || null
		const comments = [
			{
				id: 1670807894661,
				eventId: 'e2',
				name: 'Maximilian',
				comment: 'My comment is amazing',
			},
			{
				id: 1670807904146,
				name: 'Maximilian',
				eventId: 'e2',
				comment: 'My comment is amazing',
			},
			{
				id: 1670807904146,
				name: 'Maximilian',
				eventId: 'e3',
				comment: 'My comment is amazing',
			},
		]

		const filteredComments = comments.filter(
			(comment) => comment.eventId === eventId
		)

		response.status(200).json({
			comments: filteredComments,
		})
		return
	}

	if (/^POST$/i.test(request.method)) {
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
