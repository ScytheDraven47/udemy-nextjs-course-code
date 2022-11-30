import EventSummary from '../../components/event-detail/event-summary'
import EventContent from '../../components/event-detail/event-content'
import EventLogistics from '../../components/event-detail/event-logistics'
import ErrorAlert from '../../components/ui/error-alert'
import Button from '../../components/ui/button'

import { getEventById, getFeaturedEvents } from '../../helpers/api-util'
import { GetStaticPropsContext } from 'next'
import { Event as EventType } from '../../types/event'

function EventDetail({ event }: { event: EventType }) {
	if (!event)
		return (
			<div className='center'>
				<p>Loading...</p>
			</div>
		)

	return (
		<div>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</div>
	)
}

// Generates props based on given [eventId]
export async function getStaticProps({ params }: GetStaticPropsContext) {
	const home = {
		redirect: '/',
	}

	if (!params) return home

	const eventId = Array.isArray(params.eventId)
		? params.eventId[0]
		: params.eventId

	if (!eventId) return home

	const event = await getEventById(eventId)

	return {
		props: {
			event,
		},
		revalidate: 60,
	}
}

// Generates static paths for each [eventId]
export async function getStaticPaths() {
	const featuredEvents = await getFeaturedEvents()
	const pathParams = featuredEvents.map((event) => ({
		params: { eventId: event.id },
	}))

	return {
		paths: pathParams,
		fallback: 'blocking',
	}
}

export default EventDetail
