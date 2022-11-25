import { useRouter } from 'next/router'

import EventSummary from '../../components/event-detail/event-summary'
import EventContent from '../../components/event-detail/event-content'
import EventLogistics from '../../components/event-detail/event-logistics'
import ErrorAlert from '../../components/ui/error-alert'
import Button from '../../components/ui/button'

import { getEventById } from '../../dummy-data'

function EventDetail() {
	const router = useRouter()

	const eventId = router.query.eventId
	const event = getEventById(eventId)

	if (!event)
		return (
			<>
				<ErrorAlert>
					<p>No event found!</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</>
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

export default EventDetail
