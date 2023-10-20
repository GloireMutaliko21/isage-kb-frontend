import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { authUrls } from '../helpers';
import { returnApiError } from '@/utils/error.handler';
import { RootState } from '../store';

export const login: AsyncThunkPayloadCreator<User, any> = async (
	data,
	thunkAPI
) => {
	try {
		const response = await axios.post(authUrls.login, data);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Auth error');
	}
};

export const getMe: AsyncThunkPayloadCreator<User> = async (_, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<User> = await axios.get(authUrls.getMe, {
			headers: { Authorization: `Bearer ${session?.token}` },
		});
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const definePwdAndUsername: AsyncThunkPayloadCreator<
	User,
	DefinePwdDto
> = async (payload, thunkAPI) => {
	try {
		const { token, form, ...rest } = payload;
		const response: AxiosResponse<User> = await axios.post(
			authUrls.definePwd,
			rest,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		form.resetFields();
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Post error');
	}
};
