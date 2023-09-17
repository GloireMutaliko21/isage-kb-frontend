import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as attendencyService from './attendency.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	attendecies: Attendency[];
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	attendecies: [],
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const getDaily = createAsyncThunk(
	'attendency/daily',
	attendencyService.getDailyAttendecies
);

const getMonthly = createAsyncThunk(
	'attendency/monthly',
	attendencyService.getMonthlyAttendencies
);

const getMonthlyAgent = createAsyncThunk(
	'attendecy/agent',
	attendencyService.getMonthlyByAgent
);

const getOwn = createAsyncThunk(
	'attendency/own',
	attendencyService.getOwnMonthly
);

const createAttendency = createAsyncThunk(
	'attendency/create',
	attendencyService.createAttendency
);

const attendencySlice = createSlice({
	name: 'attendency',
	initialState,
	reducers: {
		setAttendencyIsError: (state, { payload }) => {
			state.status.isError = payload;
		},
		setAttendencyIsSuccess: (state, { payload }) => {
			state.status.isSuccess = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getDaily.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getDaily.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.attendecies = payload;
				state.message = null;
			})
			.addCase(getDaily.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			.addCase(getMonthly.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getMonthly.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.attendecies = payload;
				state.message = null;
			})
			.addCase(getMonthly.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			.addCase(getMonthlyAgent.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getMonthlyAgent.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.attendecies = payload;
				state.message = null;
			})
			.addCase(getMonthlyAgent.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			.addCase(getOwn.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getOwn.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.attendecies = payload;
				state.message = null;
			})
			.addCase(getOwn.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			.addCase(createAttendency.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(createAttendency.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.attendecies = [...state.attendecies, payload];
				state.message = null;
			})
			.addCase(createAttendency.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			});
	},
});

export default attendencySlice.reducer;
export { getDaily, getMonthly, getMonthlyAgent, getOwn, createAttendency };
