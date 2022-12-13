import classes from './comment-list.module.css'

function CommentList({
	comments,
}: {
	comments: { id: string; name: string; comment: '' }[]
}) {
	return (
		<ul className={classes.comments}>
			{comments.map(({ id, name, comment }) => (
				<li key={id}>
					<p>{comment}</p>
					<div>By {name || 'Anonymous'}</div>
				</li>
			))}
		</ul>
	)
}

export default CommentList
