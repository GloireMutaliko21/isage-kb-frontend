import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as folderElService from './folder-element.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	folderElements: FolderElement[];
	selectedFoldEl: FolderElement | null;
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	folderElements: [],
	selectedFoldEl: null,
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const getFolderElements = createAsyncThunk(
	'foldEl/getAll',
	folderElService.getFolderElements
);

const getFolderElementById = createAsyncThunk(
	'foldEl/getOne',
	folderElService.folderElementById
);

const createFolderElement = createAsyncThunk(
	'foldEl/create',
	folderElService.createFolderElement
);

const updateFolderElement = createAsyncThunk(
	'foldEl/update',
	folderElService.updateFolderElement
);

const deleteFolderElement = createAsyncThunk(
	'foldEl/delete',
	folderElService.deleteFolderElement
);

const folderElementSlice = createSlice({
	name: 'folderElement',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			//Get All folder elements
			.addCase(getFolderElements.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getFolderElements.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedFoldEl = null;
				state.folderElements = payload;
				state.message = null;
			})
			.addCase(getFolderElements.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedFoldEl = null;
				state.message = payload as string;
			})

			// Get folder element by id
			.addCase(getFolderElementById.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getFolderElementById.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedFoldEl = null;
				state.selectedFoldEl = payload;
				state.message = null;
			})
			.addCase(getFolderElementById.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedFoldEl = null;
				state.message = payload as string;
			})

			// create folder element
			.addCase(createFolderElement.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(createFolderElement.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedFoldEl = payload;
				state.folderElements = [...state.folderElements, payload];
				state.message = null;
			})
			.addCase(createFolderElement.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedFoldEl = null;
				state.message = payload as string;
			})

			// update folder element
			.addCase(updateFolderElement.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(updateFolderElement.fulfilled, (state, { payload }) => {
				const updated = state.folderElements.filter(
					(el) => el.id !== payload.id
				);
				state.status = STATUS.SUCCESS;
				state.selectedFoldEl = payload;
				state.folderElements = [...updated, payload];
				state.message = null;
			})
			.addCase(updateFolderElement.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedFoldEl = null;
				state.message = payload as string;
			})

			// delete folder element
			.addCase(deleteFolderElement.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(deleteFolderElement.fulfilled, (state, { payload }) => {
				const deleted = state.folderElements.filter(
					(el) => el.id !== payload.id
				);
				state.status = STATUS.SUCCESS;
				state.selectedFoldEl = null;
				state.folderElements = [...deleted];
				state.message = null;
			})
			.addCase(deleteFolderElement.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedFoldEl = null;
				state.message = payload as string;
			});
	},
});

export default folderElementSlice.reducer;
export {
	getFolderElements,
	getFolderElementById,
	createFolderElement,
	updateFolderElement,
	deleteFolderElement,
};
