import { RefObject, useContext, useEffect, useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'
import NotificationContext from '../../store/notification-context'

function Comments({ eventId }: { eventId: string }) {
	const [showComments, setShowComments] = useState(false)
	const [comments, setComments] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const notificationCtx = useContext(NotificationContext)

	useEffect(() => {
		if (!showComments) return
		loadComments()
	}, [showComments])

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus)
	}

	function loadComments() {
		setIsLoading(true)
		fetch('/api/comments/'.concat(eventId), {
			method: 'GET',
		})
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				if (data.error) throw new Error(data.error)
				setComments(data?.comments || [])
				setIsLoading(false)
			})
			.catch((error) => console.error(error))
	}

	function addCommentHandler(
		commentData: {
			email: string
			name: string
			comment: string
		},
		formRef: RefObject<HTMLFormElement>
	) {
		notificationCtx.showNotification({
			title: 'Saving...',
			message: 'Saving your comment.',
			status: 'pending',
		})

		fetch('/api/comments/'.concat(eventId), {
			method: 'POST',
			body: JSON.stringify(commentData),
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
				formRef.current?.reset()
				loadComments()
				notificationCtx.showNotification({
					title: 'Success!',
					message: 'Successfully saved your comment.',
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
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? 'Hide' : 'Show'} Comments
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && !isLoading && <CommentList comments={comments} />}
			{showComments && isLoading && <p>Loading...</p>}
		</section>
	)
}

export default Comments
