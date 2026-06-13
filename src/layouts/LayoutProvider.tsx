import { AppLayout } from './AppLayout'
import { EmptyLayout } from './EmpyLayout'

type LayoutType = 'app' | 'empty'

export const LayoutProvider = () => {
	// const layoutType = useAppSelector((state) => state.layout.layoutType) as LayoutType
	const layoutType = 'app' as LayoutType

	if (layoutType === 'empty') return <EmptyLayout />
	return <AppLayout />
}
