import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { themeReducer } from './features/themeFeature'
import { i18nReducer } from './features/i18nFeature'

/**
 * CENTRALIZED PERSISTENCE CONFIGURATION
 *
 * This store template uses centralized persistence managed at the root level.
 * It is minimal and can be expanded as needed for any project.
 */

// Root persist config - Centralized persistence for the entire store
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['exampleFeature', 'theme', 'i18n'], // Add reducers here to persist
}

// Combine reducers - Add your reducers here
const rootReducer = combineReducers({
	theme: themeReducer,
	i18n: i18nReducer,
})

// Create persisted reducer - Single point of persistence configuration
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					'persist/FLUSH',
					'persist/REHYDRATE',
					'persist/PAUSE',
					'persist/PERSIST',
					'persist/PURGE',
					'persist/REGISTER',
				],
			},
		}),
	devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
