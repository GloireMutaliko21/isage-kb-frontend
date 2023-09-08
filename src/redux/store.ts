import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';
import agentReducer from './agents/agents.slice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		agents: agentReducer,
	},
});

export default store;
export type AppDispatcher = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
