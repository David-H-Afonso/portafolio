import type { RootState } from '@/store'

export const selectLanguage = (state: RootState) => state.i18n.language
