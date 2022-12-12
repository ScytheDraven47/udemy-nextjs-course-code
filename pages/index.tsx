import Head from 'next/head'

import EventList from '../components/events/event-list'

import { Event as EventType } from '../types/event'
import { getFeaturedEvents } from '../helpers/api-util'
import NewsletterRegistration from '../components/input/newsletter-registration'

function HomePage({ featuredEvents }: { featuredEvents: EventType[] }) {
	return (
		<div>
			<Head>
				<title>Featured Events</title>
				<meta name='description' content='Find NextJS events' />
			</Head>
			<NewsletterRegistration />
			<EventList events={featuredEvents} />
		</div>
	)
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
