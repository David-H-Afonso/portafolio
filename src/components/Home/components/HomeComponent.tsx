import type { FC } from 'react'

interface Props {
	// Define any props if needed
	test: any
}

const HomeComponent: FC<Props> = (props) => {
	const { test } = props
	console.log(test)

	return <div className='home-component'></div>
}

export default HomeComponent
