import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import axios from 'axios';
import { authUrls } from '../helpers';
import { returnApiError } from '@/utils/error.handler';

export const login: AsyncThunkPayloadCreator<string, any> = async (
	data,
	thunkAPI
) => {
	try {
		const response = await axios.post(authUrls.login, data);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) console.log(returnApiError(error));
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Auth error');
	}
};
