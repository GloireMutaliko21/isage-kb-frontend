import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from './auth.service';

interface UserState {
	data: {
		id: string;
		names: string;
		email: string;
		roles: any[];
	} | null;
	thread: {
		id: string;
		action: 'LOGIN' | 'GET_ME';
		status: 'PENDING' | 'SUCCESS' | 'ERROR';
		payload?: object;
		message?: { content: string; display: boolean };
	}[];
	token: string | null;
}

const initialState: UserState = {
	token: null,
	data: null,
	thread: [],
};

const loginUser = createAsyncThunk('auth/login', login);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		removeUserData: (state) => {
			state.data = null;
		},
		logoutUser: (state) => {
			localStorage.removeItem('auth_data');
			localStorage.removeItem('token');
			state.token = null;
			state.data = null;
			window.location.reload();
		},
		loadUserToken: (state, { payload }: { payload: string }) => {
			state.token = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state, { meta }) => {
				state.thread.push({
					action: 'LOGIN',
					id: meta.requestId,
					status: 'PENDING',
				});
			})
			.addCase(loginUser.fulfilled, (state, { payload, meta }) => {
				localStorage.setItem('session_token', JSON.stringify(payload));
				state.token = payload;
				const tasks = state.thread.find((task) => task.id == meta.requestId);
				if (tasks) tasks.status = 'SUCCESS';
			})
			.addCase(loginUser.rejected, (state, { meta }) => {
				localStorage.removeItem('token');
				state.token = null;
				const tasks = state.thread.find((task) => {
					return task.id == meta.requestId;
				});
				if (tasks) tasks.status = 'ERROR';
			});
	},
});

export const { removeUserData, loadUserToken, logoutUser } = authSlice.actions;
export { loginUser };
export default authSlice.reducer;
