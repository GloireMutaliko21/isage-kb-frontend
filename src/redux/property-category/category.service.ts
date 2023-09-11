import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { categoryUrls } from '../helpers';
import { returnApiError } from '@/utils/error.handler';
import { RootState } from '../store';

export const createCategory: AsyncThunkPayloadCreator<
	Category,
	CreateCategoryDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<any> = await axios.post(
			categoryUrls.createAndGet,
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

export const getCategories: AsyncThunkPayloadCreator<Category[]> = async (
	_,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Category[]> = await axios.get(
			categoryUrls.createAndGet,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getCategoryById: AsyncThunkPayloadCreator<
	Category,
	string
> = async (id, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Category> = await axios.get(
			categoryUrls.updateAndGetOne(id),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const updateCategory: AsyncThunkPayloadCreator<
	Category,
	CreateCategoryDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Category> = await axios.patch(
			categoryUrls.updateAndGetOne(payload.id!),
			{ libelle: payload.libelle },
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};
