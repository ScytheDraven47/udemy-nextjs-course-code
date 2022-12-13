import { FormEvent, useRef, useState } from 'react'
import classes from './newsletter-registration.module.css'

function NewsletterRegistration() {
	const emailInput = useRef<HTMLInputElement>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isRegistered, setIsRegistered] = useState(false)

	function registrationHandler(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setIsLoading(true)

		const emailInputText = emailInput.current?.value || ''

		if (!/^[\w+.-]+@[\w+.-]+$/.test(emailInputText)) return

		fetch('/api/registration', {
			method: 'POST',
			body: JSON.stringify({ email: emailInputText }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (!response.ok)
					throw new Error(`${response.status}: ${response.statusText}`)

				if (emailInput.current?.value) emailInput.current.value = ''
				setIsLoading(false)
				setIsRegistered(true)
			})
			.catch((error) => console.error(error))
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
					<button disabled={isLoading || isRegistered}>
						{isRegistered ? 'Thanks!' : 'Register'}
					</button>
				</div>
			</form>
		</section>
	)
}

export default NewsletterRegistration
