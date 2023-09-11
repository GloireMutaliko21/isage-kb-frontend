import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { socialCaseUrls } from '../helpers';
import { returnApiError } from '@/utils/error.handler';
import { RootState } from '../store';

export const createSocialCase: AsyncThunkPayloadCreator<
	SocialCase,
	CreateSocialCaseDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<SocialCase> = await axios.post(
			socialCaseUrls.createAndGet,
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

export const getAllSocialsCase: AsyncThunkPayloadCreator<SocialCase[]> = async (
	_,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<SocialCase[]> = await axios.get(
			socialCaseUrls.createAndGet,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Post error');
	}
};

export const getPubInProgSocialCase: AsyncThunkPayloadCreator<
	SocialCase[]
> = async (_, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<SocialCase[]> = await axios.get(
			socialCaseUrls.getInprogress,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Post error');
	}
};

export const updateSocialCase: AsyncThunkPayloadCreator<
	SocialCase,
	UpdateSocialCaseDto
> = async (payload, thunkAPI) => {
	const { id, description, endDate } = payload;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<SocialCase> = await axios.patch(
			socialCaseUrls.update(id),
			{ description, endDate },
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Post error');
	}
};

export const publishSocialCase: AsyncThunkPayloadCreator<
	SocialCase,
	string
> = async (id, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<SocialCase> = await axios.patch(
			socialCaseUrls.publish(id),
			{},
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Post error');
	}
};

export const closeSocialCase: AsyncThunkPayloadCreator<
	SocialCase,
	string
> = async (id, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<SocialCase> = await axios.patch(
			socialCaseUrls.close(id),
			{},
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Post error');
	}
};
