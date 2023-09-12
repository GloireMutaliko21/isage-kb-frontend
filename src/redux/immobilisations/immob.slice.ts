import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as immobService from './immob.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	immobs: Immob[];
	amortis: Immob[];
	selectedImmob: Immob | null;
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	immobs: [],
	amortis: [],
	selectedImmob: null,
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const getImmobs = createAsyncThunk('immob/getAll', immobService.getImmobs);

const getAmortis = createAsyncThunk('immob/amortis', immobService.getAmortis);

const createImmob = createAsyncThunk('immob/create', immobService.createImmob);

const immobSlice = createSlice({
	name: 'immob',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//Get all immobs
			.addCase(getImmobs.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getImmobs.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedImmob = null;
				state.immobs = payload;
				state.message = null;
			})
			.addCase(getImmobs.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedImmob = null;
				state.message = payload as string;
			})

			//Get all immobs amortis
			.addCase(getAmortis.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getAmortis.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedImmob = null;
				state.amortis = payload;
				state.message = null;
			})
			.addCase(getAmortis.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedImmob = null;
				state.message = payload as string;
			})

			//create immob
			.addCase(createImmob.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(createImmob.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedImmob = null;
				state.immobs = [...state.immobs, payload];
				state.message = null;
			})
			.addCase(createImmob.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedImmob = null;
				state.message = payload as string;
			});
	},
});

export default immobSlice.reducer;
export { getImmobs, getAmortis, createImmob };
