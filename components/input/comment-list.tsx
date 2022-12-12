import { useEffect, useState } from 'react'
import classes from './comment-list.module.css'

function CommentList() {
	const [comments, setComments] = useState([])

	useEffect(() => {
		fetch('/api/comments', {
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

	return (
		<ul className={classes.comments}>
			{comments.map(({ id, name, comment }) => (
				<li key={id}>
					<p>{comment}</p>
					<div>By {name}</div>
				</li>
			))}
		</ul>
	)
}

export default CommentList
