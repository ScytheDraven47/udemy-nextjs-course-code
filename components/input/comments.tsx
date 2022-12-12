import { useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'

function Comments(props: { eventId: string }) {
	const { eventId } = props

	const [showComments, setShowComments] = useState(false)

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus)
	}

	function addCommentHandler(commentData: {
		email: string
		name: string
		comment: string
	}) {
		fetch('/api/comments', {
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
			{showComments && <CommentList />}
		</section>
	)
}

export default Comments
