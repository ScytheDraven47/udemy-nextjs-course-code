import EventItem from './event-item'
import { Event as EventType } from '../../types/event'

import classes from './event-list.module.css'

function EventList({ events }: { events: EventType[] }) {
	return (
		<ul className={classes.list}>
			{events.map((event) => (
				<EventItem key={event.id} {...event} />
			))}
		</ul>
	)
}

export default EventList
