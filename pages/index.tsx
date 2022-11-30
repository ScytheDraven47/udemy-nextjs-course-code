import EventList from '../components/events/event-list'

import { Event as EventType } from '../types/event'
import { getFeaturedEvents } from '../helpers/api-util'

function HomePage({ featuredEvents }: { featuredEvents: EventType[] }) {
	return <EventList events={featuredEvents} />
}

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents()

	if (!featuredEvents)
		return {
			redirect: {
				destination: '/no-data',
			},
		}

	return {
		props: {
			featuredEvents,
		},
		revalidate: 1800,
	}
}

export default HomePage
