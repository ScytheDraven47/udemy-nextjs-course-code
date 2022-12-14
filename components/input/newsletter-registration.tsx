import { FormEvent, useContext, useRef, useState } from 'react'
import NotificationContext from '../../store/notification-context'
import classes from './newsletter-registration.module.css'

function NewsletterRegistration() {
	const emailInput = useRef<HTMLInputElement>(null)
	const notificationCtx = useContext(NotificationContext)

	function registrationHandler(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const emailInputText = emailInput.current?.value || ''
		if (emailInput.current?.value) emailInput.current.value = ''

		if (!/^[\w+.-]+@[\w+.-]+$/.test(emailInputText)) return

		notificationCtx.showNotification({
			title: 'Signing up...',
			message: 'Registering for newsletter.',
			status: 'pending',
		})

		fetch('/api/registration', {
			method: 'POST',
			body: JSON.stringify({ email: emailInputText }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (response.ok) return response.json()

				return response.json().then((data) => {
					throw new Error(
						data.error || `${response.status}: ${response.statusText}`
					)
				})
			})
			.then((data) => {
				notificationCtx.showNotification({
					title: 'Success!',
					message: 'Successfully registered for newsletter.',
					status: 'success',
				})
			})
			.catch((error) => {
				notificationCtx.showNotification({
					title: 'Error!',
					message: error.message || 'Something went wrong!',
					status: 'error',
				})
			})
	}

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={registrationHandler}>
				<div className={classes.control}>
					<input
						type='email'
						id='email'
						placeholder='Your email'
						aria-label='Your email'
						ref={emailInput}
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	)
}

export default NewsletterRegistration
