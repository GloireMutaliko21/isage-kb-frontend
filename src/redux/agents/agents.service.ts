import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { serialize } from 'object-to-formdata';
import axios, { AxiosResponse } from 'axios';
import { agentsUrls } from '../helpers';
import { returnApiError } from '@/utils/error.handler';
import { RootState } from '../store';

export const getAgents: AsyncThunkPayloadCreator<User[]> = async (
	_,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;

	try {
		const response: AxiosResponse<User[]> = await axios.get(
			agentsUrls.getAllAndCreate,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getAgentById: AsyncThunkPayloadCreator<User, string> = async (
	id,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<User> = await axios.get(
			agentsUrls.getByIdAndUpdate(id),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const createAgent: AsyncThunkPayloadCreator<
	User,
	CreateAgentDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const body = serialize(payload);
		const response: AxiosResponse<User> = await axios.post(
			agentsUrls.getAllAndCreate,
			body,
			{
				headers: {
					Authorization: `Bearer ${session?.token}`,
					'Content-Type': 'multipart/form-data',
				},
			}
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const updateAgent: AsyncThunkPayloadCreator<
	User,
	UpdateAgentDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<User> = await axios.patch(
			agentsUrls.getByIdAndUpdate(payload.id),
			{ ...payload },
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};
