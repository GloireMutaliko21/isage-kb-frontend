import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { agentFileUrl } from '../helpers';
import { returnApiError } from '@/utils/error.handler';
import { RootState } from '../store';

export const createAgentFile: AsyncThunkPayloadCreator<
	AgentFile,
	CreateAgentFileDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<AgentFile> = await axios.post(
			agentFileUrl.createAndUpdate,
			payload,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Post error');
	}
};

export const updateAgentFile: AsyncThunkPayloadCreator<
	AgentFile,
	UpdateAgentFileDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<AgentFile> = await axios.patch(
			agentFileUrl.createAndUpdate,
			payload,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Post error');
	}
};
