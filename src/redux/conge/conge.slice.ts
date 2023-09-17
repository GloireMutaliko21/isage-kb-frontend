import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as congeService from './conge.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	agentInConges: Conge[];
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	agentInConges: [],
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const getAgentsOnConge = createAsyncThunk(
	'conge/inLeave',
	congeService.getAgentsOnConge
);

const getUnApproved = createAsyncThunk(
	'conge/unproved',
	congeService.getUnApproved
);

const createConge = createAsyncThunk('conge/create', congeService.createConge);

const requestConge = createAsyncThunk(
	'conge/request',
	congeService.requestConge
);

const approveConge = createAsyncThunk(
	'conge/approve',
	congeService.approveConge
);

const congeSlice = createSlice({
	name: 'conge',
	initialState,
	reducers: {
		setCongeIsError: (state, { payload }) => {
			state.status.isError = payload;
		},
		setCongeIsSuccess: (state, { payload }) => {
			state.status.isSuccess = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			//get agents on leave
			.addCase(getAgentsOnConge.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getAgentsOnConge.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.agentInConges = payload;
				state.message = null;
			})
			.addCase(getAgentsOnConge.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			//get unapproved leaves
			.addCase(getUnApproved.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getUnApproved.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.agentInConges = payload;
				state.message = null;
			})
			.addCase(getUnApproved.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			//create leave
			.addCase(createConge.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(createConge.fulfilled, (state) => {
				state.status = STATUS.SUCCESS;
				state.message = null;
			})
			.addCase(createConge.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			//approve leave
			.addCase(approveConge.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(approveConge.fulfilled, (state) => {
				state.status = STATUS.SUCCESS;
				state.message = null;
			})
			.addCase(approveConge.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			//request leave
			.addCase(requestConge.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(requestConge.fulfilled, (state) => {
				state.status = STATUS.SUCCESS;
				state.message = null;
			})
			.addCase(requestConge.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			});
	},
});

export default congeSlice.reducer;
export {
	getAgentsOnConge,
	getUnApproved,
	createConge,
	approveConge,
	requestConge,
};
