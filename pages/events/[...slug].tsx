import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import ResultsTitle from '../../components/events/results-title'
import EventList from '../../components/events/event-list'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'

import { useSWRFilteredEvents } from '../../helpers/api-util'
import {
	DateFilter as DateFilterType,
	Event as EventType,
} from '../../types/event'
import Head from 'next/head'

function FilteredEventsPage() {
	const [filteredEvents, setFilteredEvents] = useState<EventType[]>()
	const [dateFilter, setDateFilter] = useState<DateFilterType | null>(null)
	const router = useRouter()

	useEffect(() => {
		if (!router.isReady) return

		const filterData = router.query.slug
		if (!filterData || filterData.length < 2) return

		setDateFilter({
			year: +filterData[0],
			month: +filterData[1],
		})
	}, [router.isReady])

	const { data, error } = useSWRFilteredEvents(dateFilter, !!dateFilter)

	useEffect(() => {
		if (data) setFilteredEvents(data)
	}, [data])

	let pageHeadData = (
		<Head>
			<title>Filtered Events</title>
			<meta title='description' content={`List of events`} />
		</Head>
	)

	if (!dateFilter || dateFilter.month < 1 || dateFilter.month > 12 || error)
		return (
			<>
				{pageHeadData}
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values!</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</>
		)

	if (!filteredEvents)
		return (
			<>
				{pageHeadData}
				<p className='center'>Loading...</p>
			</>
		)

	if (error || filteredEvents.length === 0)
		return (
			<>
				{pageHeadData}
				<ErrorAlert>
					<p>No results found</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</>
		)

	pageHeadData = (
		<Head>
			<title>Filtered Events</title>
			<meta
				title='description'
				content={`All events for ${dateFilter.month}/${dateFilter.year}`}
			/>
		</Head>
	)

	const date = new Date(dateFilter.year, dateFilter.month)
	return (
		<>
			{pageHeadData}
			<ResultsTitle date={date} />
			<EventList events={filteredEvents} />
		</>
	)
}

export default FilteredEventsPage
