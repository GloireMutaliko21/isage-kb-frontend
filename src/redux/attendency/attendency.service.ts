import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { attendecyUrls } from '../helpers';
import { returnApiError } from '@/utils/error.handler';
import { RootState } from '../store';

export const getDailyAttendecies: AsyncThunkPayloadCreator<
	Attendency[]
> = async (_, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Attendency[]> = await axios.get(
			attendecyUrls.getAllDailyAndCreate,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getMonthlyAttendencies: AsyncThunkPayloadCreator<
	Attendency[],
	YearMonthParams
> = async (_, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Attendency[]> = await axios.get(
			attendecyUrls.getMonthly(_.year, _.month),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getMonthlyByAgent: AsyncThunkPayloadCreator<
	Attendency[],
	YearMonthParams
> = async (_, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	const {
		agents: { selectedAgent },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Attendency[]> = await axios.get(
			attendecyUrls.getMonthlyByAgent(selectedAgent.id, _.year, _.month),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getOwnMonthly: AsyncThunkPayloadCreator<
	Attendency[],
	YearMonthParams
> = async (_, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Attendency[]> = await axios.get(
			attendecyUrls.getOwnMonthly(_.year, _.month),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const createAttendency: AsyncThunkPayloadCreator<
	Attendency,
	CreateAttendencyDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Attendency> = await axios.post(
			attendecyUrls.getAllDailyAndCreate,
			{ ...payload, dateNow: new Date() },
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};
