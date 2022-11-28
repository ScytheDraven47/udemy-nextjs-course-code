import { useRouter } from 'next/router'

import ResultsTitle from '../../components/events/results-title'
import EventList from '../../components/events/event-list'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'

import { getFilteredEvents } from '../../dummy-data'

function FilteredEventsPage() {
	const router = useRouter()

	const filterData = router.query.slug

	if (!filterData) {
		return <p className='center'>Loading...</p>
	}

	const year = +filterData[0]
	const month = +filterData[1]

	if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
		return (
			<>
				<ErrorAlert>
					<p>Invalid search values</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</>
		)
	}

	const filteredEvents = getFilteredEvents({ year, month })

	if (!filteredEvents || filteredEvents.length === 0)
		return (
			<>
				<ErrorAlert>
					<p>No results found</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</>
		)

	const date = new Date(year, month - 1)

	return (
		<>
			<ResultsTitle date={date} />
			<EventList events={filteredEvents} />
		</>
	)
}

export default FilteredEventsPage
