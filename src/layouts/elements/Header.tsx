import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleTheme, selectTheme } from '@/store/features/themeFeature'
import { setLanguage, selectLanguage } from '@/store/features/i18nFeature'
import type { Language } from '@/models/store/I18nState'
import './Header.scss'

const LANGUAGES: { code: Language; label: string }[] = [
	{ code: 'en', label: 'EN' },
	{ code: 'es', label: 'ES' },
	{ code: 'ja', label: 'JA' },
]

export const Header: React.FC = () => {
	const location = useLocation()
	const dispatch = useAppDispatch()
	const theme = useAppSelector(selectTheme)
	const language = useAppSelector(selectLanguage)
	const { t } = useTranslation()

	return (
		<header className='app-header'>
			<div className='header-content'>
				<Link to='/' className='header-logo'>
					Portfolio
				</Link>

				<nav className='header-nav'>
					<Link to='/' className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
						{t('header.home')}
					</Link>
					<Link
						to='/settings'
						className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}>
						{t('header.settings')}
					</Link>
				</nav>

				<div className='header-controls'>
					<div className='lang-switcher'>
						{LANGUAGES.map(({ code, label }) => (
							<button
								key={code}
								className={`lang-btn ${language === code ? 'active' : ''}`}
								onClick={() => dispatch(setLanguage(code))}>
								{label}
							</button>
						))}
					</div>

					<button className='theme-toggle' onClick={() => dispatch(toggleTheme())}>
						{theme === 'dark' ? t('header.theme_light') : t('header.theme_dark')}
					</button>
				</div>
			</div>
		</header>
	)
}
