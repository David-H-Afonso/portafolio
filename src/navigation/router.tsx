import { createBrowserRouter } from 'react-router-dom'
import Home from '@/components/Home/containers/Home'
import Error404 from '@/components/Error404/containers/Error404'
import { CatchAll } from '@/components/elements'
import { LayoutProvider } from '@/layouts'

export const router = createBrowserRouter([
	{
		element: <LayoutProvider />,
		children: [
			{
				path: '/',
				element: <Home />,
				errorElement: <Home />,
				children: [
					{
						index: true,
						element: <Home />,
					},
					{
						path: 'settings',
						element: <Home />,
					},
				],
			},
			{
				path: '/404',
				element: <Error404 />,
			},
			{
				path: '*',
				element: <CatchAll />,
			},
		],
	},
])
