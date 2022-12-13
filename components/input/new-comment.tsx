import { FormEvent, useRef, useState, MutableRefObject, Ref } from 'react'
import classes from './new-comment.module.css'

function NewComment(props: { onAddComment: Function }) {
	const [isInvalid, setIsInvalid] = useState(false)

	const formRef = useRef<HTMLFormElement>(null)
	const emailInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
	const nameInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
	const commentInputRef: MutableRefObject<HTMLTextAreaElement | null> =
		useRef(null)

	function sendCommentHandler(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const enteredEmail = emailInputRef.current?.value || ''
		const enteredName = nameInputRef.current?.value || ''
		const enteredComment = commentInputRef.current?.value || ''

		if (
			!enteredEmail ||
			enteredEmail.trim() === '' ||
			!enteredEmail.includes('@') ||
			// !enteredName ||
			// enteredName.trim() === '' ||
			!enteredComment ||
			enteredComment.trim() === ''
		) {
			setIsInvalid(true)
			return
		}

		props.onAddComment(
			{
				email: enteredEmail,
				name: enteredName,
				comment: enteredComment,
			},
			formRef
		)
	}

	return (
		<form className={classes.form} onSubmit={sendCommentHandler} ref={formRef}>
			<div className={classes.row}>
				<div className={classes.control}>
					<label htmlFor='email'>Your email</label>
					<input type='email' id='email' ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='name'>Your name</label>
					<input type='text' id='name' ref={nameInputRef} />
				</div>
			</div>
			<div className={classes.control}>
				<label htmlFor='comment'>Your comment</label>
				<textarea id='comment' rows={5} ref={commentInputRef}></textarea>
			</div>
			{isInvalid && <p>Please enter a valid email address and comment!</p>}
			<button>Submit</button>
		</form>
	)
}

export default NewComment
