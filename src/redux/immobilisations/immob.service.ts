import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { immobUrls } from '../helpers';
import { returnApiError } from '@/utils/error.handler';
import { RootState } from '../store';

export const getImmobs: AsyncThunkPayloadCreator<Immob[]> = async (
	_,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Immob[]> = await axios.get(
			immobUrls.createAndGet,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getAmortis: AsyncThunkPayloadCreator<any> = async (
	_,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<any> = await axios.get(immobUrls.getAmortis, {
			headers: { Authorization: `Bearer ${session?.token}` },
		});
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const createImmob: AsyncThunkPayloadCreator<
	Immob,
	CreateImmobDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Immob> = await axios.post(
			immobUrls.getAmortis,
			payload,
			{
				headers: { Authorization: `Bearer ${session?.token}` },
			}
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Post error');
	}
};
