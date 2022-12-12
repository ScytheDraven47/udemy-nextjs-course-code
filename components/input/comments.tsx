import { useEffect, useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'

function Comments(props: { eventId: string }) {
	const { eventId } = props

	const [showComments, setShowComments] = useState(false)
	const [comments, setComments] = useState([])

	useEffect(() => {
		fetch('/api/comments/'.concat(eventId), {
			method: 'GET',
		})
			.then((response) => {
				if (!response.ok)
					throw new Error(`${response.status}: ${response.statusText}`)
				return response.json()
			})
			.then((data) => setComments(data?.comments || []))
			.catch((error) => console.error(error))
	}, [])

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus)
	}

	function addCommentHandler(commentData: {
		email: string
		name: string
		comment: string
	}) {
		fetch('/api/comments/'.concat(eventId), {
			method: 'POST',
			body: JSON.stringify(commentData),
		})
			.then((response) => {
				if (!response.ok)
					throw new Error(`${response.status}: ${response.statusText}`)
			})
			.catch((error) => console.error(error))
	}

	return (
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? 'Hide' : 'Show'} Comments
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && <CommentList comments={comments} />}
		</section>
	)
}

export default Comments
