import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as subscriptionService from './subscription.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	subscriptions: Subscription[];
	createdSubscr: CreatedSubscription | null;
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	subscriptions: [],
	createdSubscr: null,
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const subscribe = createAsyncThunk(
	'subscription/subscibe',
	subscriptionService.subscribe
);

const getSocialCaseSubscriptions = createAsyncThunk(
	'subscription/getAll',
	subscriptionService.getSocialCaseSubscriptions
);

const subsciptionSlice = createSlice({
	name: 'subscription',
	initialState,
	reducers: {
		setSubscriptionIsError: (state, { payload }) => {
			state.status.isError = payload;
		},
		setSubscriptionIsSuccess: (state, { payload }) => {
			state.status.isSuccess = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// subscribe
			.addCase(subscribe.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(subscribe.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.createdSubscr = payload;
				state.message = 'Enregistrement réussi';
			})
			.addCase(subscribe.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.createdSubscr = null;
				state.message = payload as string;
			})

			// get all social case subcriptions
			.addCase(getSocialCaseSubscriptions.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getSocialCaseSubscriptions.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.subscriptions = payload;
				state.message = null;
			})
			.addCase(getSocialCaseSubscriptions.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			});
	},
});

export default subsciptionSlice.reducer;
export { subscribe, getSocialCaseSubscriptions };
export const { setSubscriptionIsError, setSubscriptionIsSuccess } =
	subsciptionSlice.actions;
