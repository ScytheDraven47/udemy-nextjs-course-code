import Link from 'next/link'

import classes from './button.module.css'

function Button({ link, onClick, children }) {
	if (link)
		return (
			<Link href={link}>
				<a href='' className={classes.btn}>
					{children}
				</a>
			</Link>
		)

	return (
		<button onClick={onClick} className={classes.btn}>
			{children}
		</button>
	)
}

export default Button
