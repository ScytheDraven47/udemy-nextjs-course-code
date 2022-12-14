import { createContext, ReactChildren, useEffect, useState } from 'react'
import { Notification } from '../types/notification'

const NotificationContext = createContext({
	notification: null as Notification | null,
	showNotification: (notificationData: Notification) => {},
	hideNotification: () => {},
})

export function NotificationContextProvider({
	children,
}: {
	children?: ReactChildren
}) {
	const [activeNotification, setActiveNotification] =
		useState<Notification | null>(null)

	useEffect(() => {
		if (
			activeNotification &&
			/^(success|error)$/i.test(activeNotification.status)
		) {
			const timer = setTimeout(() => {
				hideNotification()
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [activeNotification])

	const showNotification = (notificationData: Notification) =>
		setActiveNotification(notificationData)

	const hideNotification = () => setActiveNotification(null)

	const context = {
		notification: activeNotification,
		showNotification,
		hideNotification,
	}

	return (
		<NotificationContext.Provider value={context}>
			{children}
		</NotificationContext.Provider>
	)
}

export default NotificationContext
