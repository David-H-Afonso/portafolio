import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import thisIsFine from '../../../assets/images/this is fine.jpg'
import { StatusBox, Console } from '@/components/elements'

interface Error404ComponentProps {
	from?: string
}

const Error404Component: FC<Error404ComponentProps> = (props) => {
	const { from } = props
	const { t } = useTranslation()
	const path = from ?? '/page'

	return (
		<div className='error404-component'>
			<div className='error404-content'>
				<div className='error404-console'>
					<Console
						text={[t('error404.console_cmd', { path }), t('error404.console_error', { path })]}
						minimalist
					/>
					<StatusBox type='error' text={t('error404.status')} />
				</div>
				<div className='error404-info'>
					<div className='error404-info-title'>
						<h1>
							{t('error404.title_start')}{' '}
							<span className='highlight'>{t('error404.title_em')}</span>
							{t('error404.title_end')}
						</h1>
						<p>{t('error404.description')}</p>
						<div className='error404-buttons'>
							<button
								onClick={() => (window.location.href = '/')}
								className='error404-button highlight'>
								{t('error404.btn_home')}
							</button>
							<button
								onClick={() => (window.location.href = '/projects')}
								className='error404-button'>
								{t('error404.btn_projects')}
							</button>
							<button
								onClick={() => (window.location.href = '/contact')}
								className='error404-button'>
								{t('error404.btn_contact')}
							</button>
						</div>
					</div>
					<div className='error404-info-image'>
						<img src={thisIsFine} alt='This is fine image, signaling a 404 error' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Error404Component
