import type { FC } from 'react'
import './StatusBox.scss'

interface StatusBoxProps {
	type: 'success' | 'error' | 'warning' | 'info'
	text: string
}

export const StatusBox: FC<StatusBoxProps> = (props) => {
	const { type, text } = props
	return <div className={`status-box ${type}`}>{text}</div>
}
