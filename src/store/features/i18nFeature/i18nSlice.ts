import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { I18nState, Language } from '@/models/store/I18nState'

const initialState: I18nState = {
	language: 'en',
}

const i18nSlice = createSlice({
	name: 'i18n',
	initialState,
	reducers: {
		setLanguage: (state, action: PayloadAction<Language>) => {
			state.language = action.payload
		},
	},
})

export const { setLanguage } = i18nSlice.actions
export default i18nSlice.reducer
