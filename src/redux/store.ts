import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';

const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});

export default store;
export type AppDispatcher = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
