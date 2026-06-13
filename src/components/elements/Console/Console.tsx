import type { FC } from 'react'
import './Console.scss'

interface ConsoleProps {
	text: string | string[]
	minimalist?: boolean
}

export const Console: FC<ConsoleProps> = (props) => {
	const { text, minimalist } = props
	const lines = Array.isArray(text) ? text : [text]

	return (
		<div className='console'>
			<div className={`console-content ${minimalist ? 'minimalist' : ''}`}>
				{minimalist && (
					<span className='console-icon'>
						<svg viewBox='0 0 64 64' fill='none'>
							<path
								d='M32 7l21 10v14c0 13-8 22-21 26C19 53 11 44 11 31V17L32 7Z'
								stroke='currentColor'
								stroke-width='5'></path>
						</svg>
					</span>
				)}
				<div className='console-text'>
					{lines.map((line, i) => (
						<p key={i}>
							{i === 0 ? '$ ' : ''}
							{line}
							{i === lines.length - 1 ? <span className='console-cursor'></span> : null}
						</p>
					))}
				</div>
			</div>
		</div>
	)
}
