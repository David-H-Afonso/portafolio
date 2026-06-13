import './App.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/navigation/router'
import { useThemeLang } from '@/hooks'

function App() {
	useThemeLang()
	return <RouterProvider router={router} />
}

export default App
