import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { inventaireUrls } from '../helpers';
import { returnApiError } from '@/utils/error.handler';
import { RootState } from '../store';

export const createOperation: AsyncThunkPayloadCreator<
	any,
	CreateOperationDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<any> = await axios.post(
			inventaireUrls.createOp,
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

export const getTodaySheet: AsyncThunkPayloadCreator<
	SheetGlobalHistoric[]
> = async (_, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<SheetGlobalHistoric[]> = await axios.get(
			inventaireUrls.getSheetToday,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getWeekSheet: AsyncThunkPayloadCreator<
	SheetGlobalHistoric[]
> = async (_, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<SheetGlobalHistoric[]> = await axios.get(
			inventaireUrls.getSheetWeek,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getMonthSynthese: AsyncThunkPayloadCreator<
	SheetSynthese[]
> = async (_, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<SheetSynthese[]> = await axios.get(
			inventaireUrls.getSheetSynthese,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getGlobalHistoric: AsyncThunkPayloadCreator<
	SheetGlobalHistoric[],
	StartEndDatesParams
> = async (payload, thunkAPI) => {
	const { start, end } = payload;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<SheetGlobalHistoric[]> = await axios.get(
			inventaireUrls.getGlobal(start, end),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getGlobalDashboardHistoric: AsyncThunkPayloadCreator<
	SheetGlobalHistoric[],
	StartEndDatesParams
> = async (payload, thunkAPI) => {
	const { start, end } = payload;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<SheetGlobalHistoric[]> = await axios.get(
			inventaireUrls.getGlobalDash(start, end),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getGlobalHistoricByArticle: AsyncThunkPayloadCreator<
	SheetGlobalHistoric[],
	StartEndDatesParams
> = async (payload, thunkAPI) => {
	const { id, start, end } = payload;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<SheetGlobalHistoric[]> = await axios.get(
			inventaireUrls.getGlobalHistoricByArticle(id!, start, end),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};
