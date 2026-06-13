import { Navigate, useLocation } from 'react-router-dom'

export const CatchAll = () => {
	const location = useLocation()
	return <Navigate to='/404' state={{ from: location.pathname }} replace />
}
