import { useRef } from 'react'

import Button from '../ui/button'

import classes from './events-search.module.css'

const MONTHS = [
	{ id: 1, longName: 'January' },
	{ id: 2, longName: 'February' },
	{ id: 3, longName: 'March' },
	{ id: 4, longName: 'April' },
	{ id: 5, longName: 'May' },
	{ id: 6, longName: 'June' },
	{ id: 7, longName: 'July' },
	{ id: 8, longName: 'August' },
	{ id: 9, longName: 'September' },
	{ id: 10, longName: 'October' },
	{ id: 11, longName: 'November' },
	{ id: 12, longName: 'December' },
]

function EventsSearch({ onSearch }) {
	const yearInputRef = useRef()
	const monthInputRef = useRef()

	function submitHandler(e) {
		e.preventDefault()

		const selectedYear = yearInputRef.current.value
		const selectedMonth = monthInputRef.current.value

		onSearch(selectedYear, selectedMonth)
	}

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.controls}>
				<div className={classes.control}>
					<label htmlFor='year'>Year</label>
					<select id='year' ref={yearInputRef}>
						<option value='2021'>2021</option>
						<option value='2022'>2022</option>
					</select>
				</div>
				<div className={classes.control}>
					<label htmlFor='month'>Month</label>
					<select id='month' ref={monthInputRef}>
						{MONTHS.map((m) => (
							<option key={m.id} value={m.id}>
								{m.longName}
							</option>
						))}
					</select>
				</div>
			</div>
			<Button>Find Events</Button>
		</form>
	)
}
export default EventsSearch
