import { ReactNode } from 'react'
import MainHeader from './main-header'

function Layout({
	includeNav = true,
	children,
}: {
	includeNav: boolean
	children: ReactNode
}) {
	return (
		<>
			{includeNav && <MainHeader />}
			<main>{children}</main>
		</>
	)
}

export default Layout
