import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as socialCaseService from './social-case.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	socialCases: SocialCase[];
	pubProgSocialCases: SocialCase[];
	selectedSocialCase: SocialCase | null;
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	socialCases: [],
	pubProgSocialCases: [],
	selectedSocialCase: null,
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const createSocialCase = createAsyncThunk(
	'socialcase/create',
	socialCaseService.createSocialCase
);

const getAllSocialsCase = createAsyncThunk(
	'socialcase/getAll',
	socialCaseService.getAllSocialsCase
);

const getOneSocialCase = createAsyncThunk(
	'socialcase/getById',
	socialCaseService.getOneSocialCase
);

const getPubInProgSocialCase = createAsyncThunk(
	'socialcase/getPubProg',
	socialCaseService.getPubInProgSocialCase
);

const updateSocialCase = createAsyncThunk(
	'socialcase/update',
	socialCaseService.updateSocialCase
);

const publishSocialCase = createAsyncThunk(
	'socialcase/publish',
	socialCaseService.publishSocialCase
);

const closeSocialCase = createAsyncThunk(
	'socialcase/close',
	socialCaseService.closeSocialCase
);

const socialCaseSlice = createSlice({
	name: 'socialcase',
	initialState,
	reducers: {
		setSocialCaseIsError: (state, { payload }) => {
			state.status.isError = payload;
		},
		setSocialCaseIsSuccess: (state, { payload }) => {
			state.status.isSuccess = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// create social case
			.addCase(createSocialCase.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(createSocialCase.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedSocialCase = payload;
				state.socialCases = [...state.socialCases, payload];
				state.message = 'Enregistrement réussi';
			})
			.addCase(createSocialCase.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedSocialCase = null;
				state.message = payload as string;
			})

			// get social cases
			.addCase(getAllSocialsCase.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getAllSocialsCase.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedSocialCase = null;
				state.socialCases = payload;
				state.message = null;
			})
			.addCase(getAllSocialsCase.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedSocialCase = null;
				state.message = payload as string;
			})

			// get one social case
			.addCase(getOneSocialCase.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getOneSocialCase.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedSocialCase = payload;
				state.message = null;
			})
			.addCase(getOneSocialCase.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedSocialCase = null;
				state.message = payload as string;
			})

			// get in progress and published social cases
			.addCase(getPubInProgSocialCase.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getPubInProgSocialCase.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedSocialCase = null;
				state.pubProgSocialCases = payload;
				state.message = null;
			})
			.addCase(getPubInProgSocialCase.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedSocialCase = null;
				state.message = payload as string;
			})

			// update social case
			.addCase(updateSocialCase.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(updateSocialCase.fulfilled, (state, { payload }) => {
				const updated = state.socialCases.filter((sc) => sc.id !== payload.id);
				state.status = STATUS.SUCCESS;
				state.selectedSocialCase = payload;
				state.socialCases = [...updated, payload];
				state.message = 'Enregistrement réussi';
			})
			.addCase(updateSocialCase.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedSocialCase = null;
				state.message = payload as string;
			})

			// publish social case
			.addCase(publishSocialCase.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(publishSocialCase.fulfilled, (state, { payload }) => {
				const updated = state.socialCases.filter((sc) => sc.id !== payload.id);
				state.status = STATUS.SUCCESS;
				state.selectedSocialCase = payload;
				state.socialCases = [...updated, payload];
				state.pubProgSocialCases = [...state.pubProgSocialCases, payload];
				state.message = 'Cas social publié';
			})
			.addCase(publishSocialCase.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedSocialCase = null;
				state.message = payload as string;
			})

			// close social case
			.addCase(closeSocialCase.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(closeSocialCase.fulfilled, (state, { payload }) => {
				const updated = state.socialCases.filter((sc) => sc.id !== payload.id);
				const updatedPub = state.pubProgSocialCases.filter(
					(sc) => sc.id !== payload.id
				);
				state.status = STATUS.SUCCESS;
				state.selectedSocialCase = payload;
				state.socialCases = [...updated, payload];
				state.pubProgSocialCases = [...updatedPub];
				state.message = 'Cas social fermé';
			})
			.addCase(closeSocialCase.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedSocialCase = null;
				state.message = payload as string;
			});
	},
});

export default socialCaseSlice.reducer;
export {
	createSocialCase,
	getAllSocialsCase,
	getPubInProgSocialCase,
	updateSocialCase,
	publishSocialCase,
	closeSocialCase,
};
export const { setSocialCaseIsError, setSocialCaseIsSuccess } =
	socialCaseSlice.actions;
