export type Notification = {
	title: string
	message: string
	status: string
}

export type NotificationContext = {
	notification: Notification
	showNotification: Function
}
