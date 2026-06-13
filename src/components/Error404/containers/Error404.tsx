import { useLocation } from 'react-router-dom'
import '../components/Error404Component.scss'
import Error404Component from '../components/Error404Component'

const Error404 = () => {
	const location = useLocation()
	const from: string | undefined = (location.state as { from?: string } | null)?.from

	return <Error404Component from={from} />
}

export default Error404
