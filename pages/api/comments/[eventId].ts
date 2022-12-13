import { NextApiRequest, NextApiResponse } from 'next'

type Event = {
	id: number
	eventId: string
	email: string
	name: string
	comment: string
}
type EventForUI = Omit<Event, 'eventId' | 'email'>

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	if (!request.method) {
		response.status(501).json({ error: `Method not defined` })
		return
	}

	if (/^GET$/i.test(request.method)) {
		const { eventId } = request.query
		const comments: Event[] = [
			{
				id: 1670807894661,
				eventId: 'e2',
				name: 'Maximilian',
				email: '',
				comment: 'My comment is amazing',
			},
			{
				id: 1670807904146,
				name: 'Maximilian',
				eventId: 'e2',
				email: '',
				comment: 'My comment is amazing',
			},
			{
				id: 1670807904146,
				name: 'Maximilian',
				eventId: 'e3',
				email: '',
				comment: 'My comment is amazing',
			},
		]

		const filteredComments = comments.reduce((acc, comment) => {
			if (comment.eventId !== eventId) return acc
			return [
				...acc,
				{
					id: comment.id,
					eventId: comment.eventId,
					name: comment.name,
					comment: comment.comment,
				},
			]
		}, [] as EventForUI[])

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

		//? SUCCESS
		const messageToSave: Event = {
			id: new Date().getTime(),
			eventId,
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
