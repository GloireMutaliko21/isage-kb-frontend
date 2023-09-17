import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as categoryService from './category.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	categories: Category[];
	selectedCategory: Category | null;
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	categories: [],
	selectedCategory: null,
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const createCategory = createAsyncThunk(
	'category/create',
	categoryService.createCategory
);

const getCategories = createAsyncThunk(
	'category/getAll',
	categoryService.getCategories
);

const getCategoryById = createAsyncThunk(
	'category/getOne',
	categoryService.getCategoryById
);

const updateCategory = createAsyncThunk(
	'category/update',
	categoryService.updateCategory
);

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setCategoryIsError: (state, { payload }) => {
			state.status.isError = payload;
		},
		setCategoryIsSuccess: (state, { payload }) => {
			state.status.isSuccess = payload;
		},
	},
	extraReducers: (builder) => {
		builder

			// create category
			.addCase(createCategory.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(createCategory.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedCategory = payload;
				state.categories = [...state.categories, payload];
				state.message = 'Enregistrement réussi';
			})
			.addCase(createCategory.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedCategory = null;
				state.message = payload as string;
			})

			// get categories
			.addCase(getCategories.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getCategories.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedCategory = null;
				state.categories = payload;
				state.message = null;
			})
			.addCase(getCategories.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedCategory = null;
				state.message = payload as string;
			})

			// get category by id
			.addCase(getCategoryById.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getCategoryById.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedCategory = null;
				state.selectedCategory = payload;
				state.message = null;
			})
			.addCase(getCategoryById.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedCategory = null;
				state.message = payload as string;
			})

			// update category
			.addCase(updateCategory.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(updateCategory.fulfilled, (state, { payload }) => {
				const updated = state.categories.filter((cat) => cat.id !== payload.id);
				state.status = STATUS.SUCCESS;
				state.selectedCategory = payload;
				state.categories = [...updated, payload];
				state.message = 'Enregistrement réussi';
			})
			.addCase(updateCategory.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedCategory = null;
				state.message = payload as string;
			});
	},
});

export default categorySlice.reducer;
export { createCategory, getCategories, getCategoryById, updateCategory };
export const { setCategoryIsError, setCategoryIsSuccess } =
	categorySlice.actions;
