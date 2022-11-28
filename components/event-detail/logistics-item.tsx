import { ComponentType, ReactNode } from 'react'
import classes from './logistics-item.module.css'

function LogisticsItem({
	icon: Icon,
	children,
}: {
	icon: ComponentType
	children: ReactNode
}) {
	return (
		<li className={classes.item}>
			<span className={classes.icon}>
				<Icon />
			</span>
			<span className={classes.content}>{children}</span>
		</li>
	)
}

export default LogisticsItem
