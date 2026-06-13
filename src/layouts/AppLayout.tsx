import { Outlet } from 'react-router-dom'
import { Header } from './elements'

export const AppLayout = () => {
	return (
		<div className='app-layout'>
			<Header />
			<main className='app-layout__content'>
				<Outlet />
			</main>
		</div>
	)
}
