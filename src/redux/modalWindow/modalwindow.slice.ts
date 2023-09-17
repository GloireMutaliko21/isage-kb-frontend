import { createSlice } from '@reduxjs/toolkit';

const initialState: {
	modal_ID: string | null;
	thread: {
		modal_ID: string;
		payload?: any;
	}[];
	payload?: any;
} = {
	modal_ID: '',
	thread: [{ modal_ID: '', payload: {} }],
	payload: null,
};

const modalManagerSlice = createSlice({
	initialState,
	name: 'modalmanager',
	reducers: {
		openModal: (state, { payload }) => {
			if (state.modal_ID) state.thread.push(payload);
			else {
				state.modal_ID = payload.modal_ID;
				state.payload = payload.payload;
			}
		},
		closeModal: (state) => {
			const current = state.thread.shift();
			state.modal_ID = null;
			state.payload = null;
			if (current) {
				state.modal_ID = current.modal_ID;
				state.payload = current.payload;
			}
		},
	},
});

export const { closeModal, openModal } = modalManagerSlice.actions;
export default modalManagerSlice.reducer;
