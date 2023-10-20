import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as orderService from './order.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	orders: Order[];
	closedOrder: Order[];
	selectedOrder: Order | null;
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	orders: [],
	closedOrder: [],
	selectedOrder: null,
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const createOrder = createAsyncThunk('order/create', orderService.createOrder);

const getOrders = createAsyncThunk('order/getAll', orderService.getOrders);

const getHistoric = createAsyncThunk('order/hitoric', orderService.getHistoric);

const closeOrder = createAsyncThunk('order/close', orderService.closeOrder);

const cancelOrder = createAsyncThunk('order/cancel', orderService.cancelOrder);

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrderIsError: (state, { payload }) => {
			state.status.isError = payload;
		},
		setOrderIsSuccess: (state, { payload }) => {
			state.status.isSuccess = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			//create order
			.addCase(createOrder.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(createOrder.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedOrder = null;
				state.orders = [...state.orders, payload];
				state.message = 'Enregistrement réussi';
			})
			.addCase(createOrder.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedOrder = null;
				state.message = payload as string;
			})

			//get orders
			.addCase(getOrders.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getOrders.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedOrder = null;
				state.orders = payload;
				state.message = null;
			})
			.addCase(getOrders.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedOrder = null;
				state.message = payload as string;
			})

			//get orders historic
			.addCase(getHistoric.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getHistoric.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedOrder = null;
				state.closedOrder = payload;
				state.message = null;
			})
			.addCase(getHistoric.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedOrder = null;
				state.message = payload as string;
			})

			//close order
			.addCase(closeOrder.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(closeOrder.fulfilled, (state, { payload }) => {
				const updated = state.orders.filter((order) => order.id !== payload.id);
				state.status = STATUS.SUCCESS;
				state.selectedOrder = null;
				state.orders = [...updated];
				state.closedOrder = [...state.closedOrder, payload];
				state.message = 'Fermé avec succès';
			})
			.addCase(closeOrder.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedOrder = null;
				state.message = payload as string;
			})

			//cancel order
			.addCase(cancelOrder.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(cancelOrder.fulfilled, (state, { payload }) => {
				const updated = state.orders.filter((order) => order.id !== payload.id);
				state.status = STATUS.SUCCESS;
				state.selectedOrder = null;
				state.orders = [...updated, payload];
				state.message = 'Commande annulée';
			})
			.addCase(cancelOrder.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedOrder = null;
				state.message = payload as string;
			});
	},
});

export default orderSlice.reducer;
export { createOrder, getOrders, getHistoric, closeOrder, cancelOrder };
export const { setOrderIsError, setOrderIsSuccess } = orderSlice.actions;
