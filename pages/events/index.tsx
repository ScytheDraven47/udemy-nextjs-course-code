import { useRouter } from 'next/router'

import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { getAllEvents } from '../../helpers/api-util'
import { Event as EventType } from '../../types/event'

function EventsPage({ events }: { events: EventType[] }) {
	const router = useRouter()

	function findEventsHandler(year: string, month: string) {
		const fullPath = `/events/${year}/${month}`

		router.push(fullPath)
	}

	return (
		<>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList events={events} />
		</>
	)
}

export async function getStaticProps() {
	const allEvents = await getAllEvents()

	if (!allEvents)
		return {
			redirect: {
				destination: '/no-data',
			},
		}

	return {
		props: {
			events: allEvents,
		},
		revalidate: 60,
	}
}

export default EventsPage
