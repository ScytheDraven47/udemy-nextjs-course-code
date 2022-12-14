import { ReactNode, useContext } from 'react'
import MainHeader from './main-header'
import Notification from '../ui/notification'
import NotificationContext from '../../store/notification-context'

function Layout({
	includeNav = true,
	children,
}: {
	includeNav: boolean
	children: ReactNode
}) {
	const notificationCtx = useContext(NotificationContext)

	const activeNotification = notificationCtx.notification

	return (
		<>
			{includeNav && <MainHeader />}
			<main>{children}</main>
			{activeNotification && <Notification {...activeNotification} />}
		</>
	)
}

export default Layout
