'use client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from './auth.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	session: any;
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	session:
		typeof window !== 'undefined'
			? JSON.parse(window?.localStorage?.getItem('session-user')!)
			: null,
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const loginUser = createAsyncThunk('auth/login', login);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logoutUser: (state) => {
			localStorage.removeItem('session-user');
			state.session = null;
			window.location.replace('/login');
		},
		loadUserData: (
			state,
			{ payload }: { payload: typeof initialState.session }
		) => {
			state.session = payload;
		},
		setAuthIsError: (state, actions) => {
			state.status.isError = actions.payload;
		},
		setAuthIsSuccess: (state, actions) => {
			state.status.isSuccess = actions.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				localStorage.setItem('session-user', JSON.stringify(payload));
				state.session = payload;
				state.message = null;
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				localStorage.removeItem('session-user');
				state.status = STATUS.ERROR;
				state.message = payload as string;
				state.session = null;
			});
	},
});

export const { setAuthIsError, setAuthIsSuccess, logoutUser, loadUserData } =
	authSlice.actions;
export { loginUser };
export default authSlice.reducer;
