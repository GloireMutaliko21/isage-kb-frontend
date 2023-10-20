import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as inventaireService from './inventaire.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	stockSheet: SheetGlobalHistoric[];
	todayStockSheet: SheetGlobalHistoric[];
	weekStockSheet: SheetGlobalHistoric[];
	globalSheet: SheetGlobalHistoric[];
	globalDashboardSheet: SheetGlobalHistoric[];
	sheetSynthese: SheetSynthese[];
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	stockSheet: [],
	todayStockSheet: [],
	weekStockSheet: [],
	globalSheet: [],
	globalDashboardSheet: [],
	sheetSynthese: [],
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const createOperation = createAsyncThunk(
	'inventaire/create',
	inventaireService.createOperation
);

const getTodaySheet = createAsyncThunk(
	'inventaire/today',
	inventaireService.getTodaySheet
);

const getWeekSheet = createAsyncThunk(
	'inventaire/week',
	inventaireService.getWeekSheet
);

const getMonthSynthese = createAsyncThunk(
	'inventaire/synthese',
	inventaireService.getMonthSynthese
);

const getGlobalHistoric = createAsyncThunk(
	'inventaire/global',
	inventaireService.getGlobalHistoric
);

const getGlobalDashboardHistoric = createAsyncThunk(
	'inventaire/globalDash',
	inventaireService.getGlobalDashboardHistoric
);

const getGlobalHistoricByArticle = createAsyncThunk(
	'inventaire/globalByArt',
	inventaireService.getGlobalHistoricByArticle
);

const inventaireSlice = createSlice({
	name: 'inventaire',
	initialState,
	reducers: {
		setInventaireIsError: (state, { payload }) => {
			state.status.isError = payload;
		},
		setInventaireIsSuccess: (state, { payload }) => {
			state.status.isSuccess = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// create op
			.addCase(createOperation.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(createOperation.fulfilled, (state) => {
				state.status = STATUS.SUCCESS;
				state.message = 'Enregistrement réussi';
			})
			.addCase(createOperation.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			// Get Today stock sheet
			.addCase(getTodaySheet.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getTodaySheet.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.todayStockSheet = payload;
				state.message = null;
			})
			.addCase(getTodaySheet.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			// Get Week stock sheet
			.addCase(getWeekSheet.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getWeekSheet.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.weekStockSheet = payload;
				state.message = null;
			})
			.addCase(getWeekSheet.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			// Get Month synthese
			.addCase(getMonthSynthese.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getMonthSynthese.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.sheetSynthese = payload;
				state.message = null;
			})
			.addCase(getMonthSynthese.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			// Get Global historic
			.addCase(getGlobalHistoric.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getGlobalHistoric.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.globalSheet = payload;
				state.message = null;
			})
			.addCase(getGlobalHistoric.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			// Get Global historic
			.addCase(getGlobalDashboardHistoric.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getGlobalDashboardHistoric.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.globalDashboardSheet = payload;
				state.message = null;
			})
			.addCase(getGlobalDashboardHistoric.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			// Get Global historic
			.addCase(getGlobalHistoricByArticle.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getGlobalHistoricByArticle.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.stockSheet = payload;
				state.message = null;
			})
			.addCase(getGlobalHistoricByArticle.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			});
	},
});

export default inventaireSlice.reducer;
export {
	createOperation,
	getTodaySheet,
	getWeekSheet,
	getMonthSynthese,
	getGlobalHistoric,
	getGlobalDashboardHistoric,
	getGlobalHistoricByArticle,
};
export const { setInventaireIsError, setInventaireIsSuccess } =
	inventaireSlice.actions;
