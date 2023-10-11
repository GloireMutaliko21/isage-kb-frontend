'use client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { definePwdAndUsername, getMe, login } from './auth.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	session: any;
	profile: User | null;
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
	profile: null,
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const loginUser = createAsyncThunk('auth/login', login);

const getProfile = createAsyncThunk('auth/getMe', getMe);

const defineUserPwd = createAsyncThunk('auth/pwd', definePwdAndUsername);

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
			//login
			.addCase(loginUser.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				localStorage.setItem('session-user', JSON.stringify(payload));
				state.session = payload;
				state.profile = payload;
				state.message = null;
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				localStorage.removeItem('session-user');
				state.status = STATUS.ERROR;
				state.message = payload as string;
				state.session = null;
			})
			//get profile
			.addCase(getProfile.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getProfile.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.profile = payload;
				state.message = null;
			})
			.addCase(getProfile.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.profile = state.session;
				state.message = payload as string;
			})

			//define password and username
			.addCase(defineUserPwd.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(defineUserPwd.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.profile = payload;
				state.message = 'Enregistrement réussi';
			})
			.addCase(defineUserPwd.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			});
	},
});

export const { setAuthIsError, setAuthIsSuccess, logoutUser, loadUserData } =
	authSlice.actions;
export { loginUser, getProfile, defineUserPwd };
export default authSlice.reducer;
