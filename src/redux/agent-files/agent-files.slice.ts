import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as agentFileService from './agent-files.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	agentFile: AgentFile;
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	agentFile: {
		agentId_folderElementId: {
			agentId: '',
			folderElementId: '',
		},
		agentId: '',
		folderElementId: '',
		url: '',
		public_id: '',
	},
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const createAgentFile = createAsyncThunk(
	'agent-file/create',
	agentFileService.createAgentFile
);

const updateAgentFile = createAsyncThunk(
	'agent-file/update',
	agentFileService.updateAgentFile
);

const agentFileSlice = createSlice({
	name: 'agent-file',
	initialState,
	reducers: {
		setAgentFileIsError: (state, { payload }) => {
			state.status.isError = payload;
		},
		setAgentFileIsSuccess: (state, { payload }) => {
			state.status.isSuccess = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createAgentFile.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(createAgentFile.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.agentFile = payload;
				state.message = null;
			})
			.addCase(createAgentFile.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.agentFile = {
					agentId_folderElementId: {
						agentId: '',
						folderElementId: '',
					},
					agentId: '',
					folderElementId: '',
					url: '',
					public_id: '',
				};
				state.message = payload as string;
			})

			.addCase(updateAgentFile.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(updateAgentFile.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.agentFile = payload;
				state.message = null;
			})
			.addCase(updateAgentFile.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.agentFile = state.agentFile;
				state.message = payload as string;
			});
	},
});

export default agentFileSlice.reducer;
export { createAgentFile, updateAgentFile };
