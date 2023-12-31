import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as gradeService from './grade.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	grades: Grade[];
	selectedGrade: Grade | null;
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	grades: [],
	selectedGrade: null,
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const getGrades = createAsyncThunk('grade/getAll', gradeService.getGrades);

const getGradeById = createAsyncThunk(
	'grade/getOne',
	gradeService.getGradeById
);

const createGrade = createAsyncThunk('grade/create', gradeService.createGrade);

const updateGrade = createAsyncThunk('grade/update', gradeService.updateGrade);

const deleteGrade = createAsyncThunk('grade/delete', gradeService.deleteGrade);

const gradeSlice = createSlice({
	name: 'grade',
	initialState,
	reducers: {
		setGradeIsError: (state, { payload }) => {
			state.status.isError = payload;
		},
		setGradeIsSuccess: (state, { payload }) => {
			state.status.isSuccess = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			//Get All grades
			.addCase(getGrades.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getGrades.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedGrade = null;
				state.grades = payload;
				state.message = null;
			})
			.addCase(getGrades.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedGrade = null;
				state.message = payload as string;
			})

			// Get grade by id
			.addCase(getGradeById.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getGradeById.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedGrade = null;
				state.selectedGrade = payload;
				state.message = null;
			})
			.addCase(getGradeById.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedGrade = null;
				state.message = payload as string;
			})

			// create grade
			.addCase(createGrade.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(createGrade.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedGrade = payload;
				state.grades = [...state.grades, payload];
				state.message = 'Enregistrement réussi';
			})
			.addCase(createGrade.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedGrade = null;
				state.message = payload as string;
			})

			// update grade
			.addCase(updateGrade.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(updateGrade.fulfilled, (state, { payload }) => {
				const updated = state.grades.filter((el) => el.id !== payload.id);
				state.status = STATUS.SUCCESS;
				state.selectedGrade = payload;
				state.grades = [...updated, payload];
				state.message = 'Enregistrement réussi';
			})
			.addCase(updateGrade.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedGrade = null;
				state.message = payload as string;
			})

			// delete grade
			.addCase(deleteGrade.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(deleteGrade.fulfilled, (state, { payload }) => {
				const deleted = state.grades.filter((el) => el.id !== payload.id);
				state.status = STATUS.SUCCESS;
				state.selectedGrade = null;
				state.grades = [...deleted];
				state.message = 'Supprimé avec succès';
			})
			.addCase(deleteGrade.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedGrade = null;
				state.message = payload as string;
			});
	},
});

export default gradeSlice.reducer;
export { getGrades, getGradeById, createGrade, updateGrade, deleteGrade };
export const { setGradeIsError, setGradeIsSuccess } = gradeSlice.actions;
