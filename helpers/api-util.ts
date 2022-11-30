import useSWR from 'swr'
import {
	Event as EventType,
	DateFilter as DateFilterType,
} from '../types/event'

const EVENTS_URL =
	'https://udemy-nextjs-course-371d7-default-rtdb.firebaseio.com/events.json'

export function useSWRFilteredEvents(
	dateFilter: DateFilterType | null,
	shouldFetch: boolean
) {
	return useSWR(shouldFetch ? EVENTS_URL : null, (url) =>
		fetch(url)
			.then((res) => res.json())
			.then(extractEventsFromQuery)
			.then((events) => filterEventsByDate(events, dateFilter))
	)
}

export async function getAllEvents() {
	return fetchAllEvents().then(extractEventsFromQuery)
}

export async function getFeaturedEvents() {
	return fetchAllEvents()
		.then(extractEventsFromQuery)
		.then(filterFeaturedEvents)
}

export async function getFilteredEvents(dateFilter: DateFilterType) {
	return fetchAllEvents()
		.then(extractEventsFromQuery)
		.then((events) => filterEventsByDate(events, dateFilter))
}

export async function getEventById(id: string) {
	return fetchAllEvents()
		.then(extractEventsFromQuery)
		.then((events) => findEventById(events, id))
}

async function fetchAllEvents() {
	return fetch(EVENTS_URL).then((response) => response.json())
}

const extractEventsFromQuery = (data: any): EventType[] =>
	Object.keys(data).map((key) => ({
		id: key,
		...data[key],
	}))

const filterFeaturedEvents = (events: EventType[]): EventType[] =>
	events.filter((event) => event.isFeatured)

const filterEventsByDate = (
	events: EventType[],
	dateFilter: DateFilterType | null
): EventType[] => {
	if (!dateFilter) return []
	const { year, month } = dateFilter

	let filteredEvents = events.filter((event) => {
		const eventDate = new Date(event.date)
		return (
			eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
		)
	})

	return filteredEvents
}

const findEventById = (events: EventType[], id: string): EventType | null =>
	events.find((event) => event.id === id) || null
