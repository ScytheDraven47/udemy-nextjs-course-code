import { FormEvent, useRef } from 'react'
import classes from './newsletter-registration.module.css'

function NewsletterRegistration() {
	const emailInput = useRef<HTMLInputElement>(null)

	function registrationHandler(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		let emailInputText = emailInput.current?.value || ''

		if (!/[\w+.-]+@[\w+.-]+/.test(emailInputText)) return

		fetch('/api/registration', {
			method: 'POST',
			body: JSON.stringify({ email: emailInputText }),
		})
			.then((response) => {
				if (!response.ok)
					throw new Error(`${response.status}: ${response.statusText}`)
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
					<button>Register</button>
				</div>
			</form>
		</section>
	)
}

export default NewsletterRegistration
