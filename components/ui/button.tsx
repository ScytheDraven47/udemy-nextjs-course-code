import Link from 'next/link'
import { MouseEventHandler, ReactNode } from 'react'

import classes from './button.module.css'

function Button({
	link,
	onClick,
	children,
}: {
	link?: string
	onClick?: MouseEventHandler
	children?: ReactNode
}) {
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
