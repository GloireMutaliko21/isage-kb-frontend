import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as agentService from './agents.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	agents: User[];
	selectedAgent: User | null;
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	agents: [],
	selectedAgent: null,
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const getAgents = createAsyncThunk('agents/getAll', agentService.getAgents);

const getAgentById = createAsyncThunk(
	'agents/getOne',
	agentService.getAgentById
);

const createAgent = createAsyncThunk('agents/create', agentService.createAgent);

const updateAgent = createAsyncThunk('agents/update', agentService.updateAgent);

const agentSlice = createSlice({
	name: 'agents',
	initialState,
	reducers: {
		setAgentIsError: (state, { payload }) => {
			state.status.isError = payload;
		},
		setAgentIsSuccess: (state, { payload }) => {
			state.status.isSuccess = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAgents.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getAgents.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedAgent = null;
				state.agents = payload;
				state.message = '';
			})
			.addCase(getAgents.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedAgent = null;
				state.message = payload as string;
			})

			.addCase(getAgentById.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getAgentById.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedAgent = null;
				state.selectedAgent = payload;
				state.message = null;
			})
			.addCase(getAgentById.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedAgent = null;
				state.message = payload as string;
			})

			.addCase(createAgent.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(createAgent.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.agents = [...state.agents, payload];
				state.selectedAgent = null;
				state.message = 'Enregistrement réussi';
			})
			.addCase(createAgent.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedAgent = null;
				state.message = payload as string;
			})

			.addCase(updateAgent.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(updateAgent.fulfilled, (state, { payload }) => {
				const updated = state.agents.filter((el) => el.id !== payload.id);
				state.status = STATUS.SUCCESS;
				state.agents = [...updated, payload];
				state.selectedAgent = payload;
				state.message = 'Enregistrement réussi';
			})
			.addCase(updateAgent.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			});
	},
});

export default agentSlice.reducer;
export { getAgents, getAgentById, createAgent, updateAgent };
export const { setAgentIsError, setAgentIsSuccess } = agentSlice.actions;
