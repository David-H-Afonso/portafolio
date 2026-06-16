import type { FC } from 'react'

interface Props {
	// Define any props if needed
	test: any
}

const HomeComponent: FC<Props> = (props) => {
	const { test } = props

	return <div className='home-component'>{test}</div>
}

export default HomeComponent
