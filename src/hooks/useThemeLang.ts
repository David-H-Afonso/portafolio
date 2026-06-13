import { useEffect } from 'react'
import { useAppSelector } from '@/store/hooks'
import { selectTheme } from '@/store/features/themeFeature'
import { selectLanguage } from '@/store/features/i18nFeature'
import i18n from '@/i18n'

export const useThemeLang = () => {
	const theme = useAppSelector(selectTheme)
	const language = useAppSelector(selectLanguage)

	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark')
	}, [theme])

	useEffect(() => {
		const html = document.documentElement
		html.classList.remove('lang-en', 'lang-es', 'lang-ja')
		html.classList.add(`lang-${language}`)
		i18n.changeLanguage(language)
	}, [language])
}
