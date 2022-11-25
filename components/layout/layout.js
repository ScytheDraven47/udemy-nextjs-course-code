import MainHeader from './main-header'

function Layout({ includeNav = true, children }) {
	return (
		<>
			{includeNav && <MainHeader />}
			<main>{children}</main>
		</>
	)
}

export default Layout
