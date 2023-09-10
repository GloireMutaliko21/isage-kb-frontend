import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as unityService from './article-unity.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	unities: Unity[];
	selectedUnity: Unity | null;
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	unities: [],
	selectedUnity: null,
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const getUnities = createAsyncThunk('unity/getAll', unityService.getUnities);

const getUnityById = createAsyncThunk(
	'unity/getOne',
	unityService.getUnityById
);

const createUnity = createAsyncThunk('unity/create', unityService.createUnity);

const updateUnity = createAsyncThunk('unity/update', unityService.updateUnity);

const unitySlice = createSlice({
	name: 'unity',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//Get All unities
			.addCase(getUnities.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getUnities.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedUnity = null;
				state.unities = payload;
				state.message = null;
			})
			.addCase(getUnities.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedUnity = null;
				state.message = payload as string;
			})

			//Get unity by id
			.addCase(getUnityById.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getUnityById.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedUnity = null;
				state.selectedUnity = payload;
				state.message = null;
			})
			.addCase(getUnityById.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedUnity = null;
				state.message = payload as string;
			})

			// Create new unity
			.addCase(createUnity.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(createUnity.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedUnity = payload;
				state.unities = [...state.unities, payload];
				state.message = null;
			})
			.addCase(createUnity.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedUnity = null;
				state.message = payload as string;
			})

			// update unity
			.addCase(updateUnity.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(updateUnity.fulfilled, (state, { payload }) => {
				const updated = state.unities.filter((el) => el.id !== payload.id);
				state.status = STATUS.SUCCESS;
				state.unities = [...updated, payload];
				state.selectedUnity = payload;
				state.message = null;
			})
			.addCase(updateUnity.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			});
	},
});

export default unitySlice.reducer;
export { getUnities, getUnityById, createUnity, updateUnity };
