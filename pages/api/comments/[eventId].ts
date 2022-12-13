import { NextApiRequest, NextApiResponse } from 'next'
import { getCommentsForEvent, saveComment } from '../../../helpers/db-util'
import { CommentForUI } from '../../../types/event'

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	if (!request.method) {
		response.status(501).json({ error: `Method not defined` })
		return
	}

	if (/^GET$/i.test(request.method)) {
		const eventId = request.query.eventId as string
		const comments = await getCommentsForEvent(eventId)

		const filteredComments = comments.reduce((acc, comment) => {
			if (comment.eventId !== eventId) return acc
			return [
				...acc,
				{
					id: comment._id.toString(),
					name: comment.name,
					comment: comment.comment,
				},
			]
		}, [] as CommentForUI[])

		response.status(200).json({
			comments: filteredComments,
		})
		return
	}

	if (/^POST$/i.test(request.method)) {
		const eventId = request.query.eventId as string
		const { email, name, comment } = JSON.parse(request.body)

		let errors = []
		if (!eventId) errors.push('Invalid event id')
		if (!comment || !comment.trim()) errors.push('Comment is empty')
		if (!email || !/^[\w+.-]+@[\w+.-]+$/.test(email))
			errors.push('Invalid email address')
		if (errors.length > 0) {
			response.status(422).json({ error: errors.join(', ') })
			return
		}

		saveComment(email, name, comment, eventId)
		response.status(201).json({ message: 'Comment saved' })
		return
	}

	response
		.status(501)
		.json({ error: `Method not implemented: ${request.method}` })
	return
}
