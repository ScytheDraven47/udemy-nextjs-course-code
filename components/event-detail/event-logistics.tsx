import Image from 'next/image'

import AddressIcon from '../icons/address-icon'
import DateIcon from '../icons/date-icon'
import LogisticsItem from './logistics-item'
import classes from './event-logistics.module.css'

function EventLogistics({
	date,
	address,
	image,
	imageAlt,
}: {
	date: string
	address: string | null
	image: string | null
	imageAlt: string
}) {
	const humanReadableDate: string = new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
	const addressText = address?.replace(', ', '\n') || null

	return (
		<section className={classes.logistics}>
			<div className={classes.image}>
				<Image
					src={'/'.concat(image || '')}
					alt={imageAlt}
					width={320}
					height={320}
				/>
			</div>
			<ul className={classes.list}>
				<LogisticsItem icon={DateIcon}>
					<time>{humanReadableDate}</time>
				</LogisticsItem>
				<LogisticsItem icon={AddressIcon}>
					<address>{addressText}</address>
				</LogisticsItem>
			</ul>
		</section>
	)
}

export default EventLogistics
