import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as sectionService from './section.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	services: Section[];
	selectedService: Section | null;
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	services: [],
	selectedService: null,
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const getServices = createAsyncThunk(
	'services/getAll',
	sectionService.getServices
);

const getServiceById = createAsyncThunk(
	'services/getIne',
	sectionService.getServiceById
);

const createService = createAsyncThunk(
	'services/create',
	sectionService.createService
);

const updateService = createAsyncThunk(
	'services/update',
	sectionService.updateService
);

const sectionSlice = createSlice({
	name: 'immob',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//Get all services
			.addCase(getServices.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getServices.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.services = payload;
				state.selectedService = null;
				state.message = null;
			})
			.addCase(getServices.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedService = null;
				state.message = payload as string;
			})

			//get section by id
			.addCase(getServiceById.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getServiceById.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedService = payload;
				state.message = null;
			})
			.addCase(getServiceById.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedService = null;
				state.message = payload as string;
			})

			//create section
			.addCase(createService.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(createService.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedService = payload;
				state.services = [...state.services, payload];
				state.message = null;
			})
			.addCase(createService.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedService = null;
				state.message = payload as string;
			})

			//update section
			.addCase(updateService.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(updateService.fulfilled, (state, { payload }) => {
				const updated = state.services.filter((s) => s.id !== payload.id);
				state.status = STATUS.SUCCESS;
				state.selectedService = payload;
				state.services = [...updated, payload];
				state.message = null;
			})
			.addCase(updateService.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedService = null;
				state.message = payload as string;
			});
	},
});

export default sectionSlice.reducer;
export { getServiceById, getServices, createService, updateService };
