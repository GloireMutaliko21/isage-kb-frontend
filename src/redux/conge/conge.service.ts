import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { congeUrls } from '../helpers';
import { returnApiError } from '@/utils/error.handler';
import { RootState } from '../store';

export const getAgentsOnConge: AsyncThunkPayloadCreator<Conge[]> = async (
	_,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Conge[]> = await axios.get(
			congeUrls.createAndGet,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getUnApproved: AsyncThunkPayloadCreator<Conge[]> = async (
	_,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Conge[]> = await axios.get(
			congeUrls.getUnapproved,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const createConge: AsyncThunkPayloadCreator<
	Conge,
	CreateCongeDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Conge> = await axios.post(
			congeUrls.createAndGet,
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

export const requestConge: AsyncThunkPayloadCreator<Conge> = async (
	_,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Conge> = await axios.post(
			congeUrls.requestConge,
			{},
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Request error');
	}
};

export const approveConge: AsyncThunkPayloadCreator<
	Conge,
	UpdateCongeDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;

	try {
		const response: AxiosResponse<Conge> = await axios.patch(
			congeUrls.approveConge(payload.id),
			payload,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};
