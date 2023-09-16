import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { gradeUrls } from '../helpers';
import { returnApiError } from '@/utils/error.handler';
import { RootState } from '../store';
import { useDispatch } from 'react-redux';
import { closeModal } from '../modalWindow/modalwindow.slice';

export const getGrades: AsyncThunkPayloadCreator<Grade[]> = async (
	_,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Grade[]> = await axios.get(
			gradeUrls.createAndGet,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const createGrade: AsyncThunkPayloadCreator<
	Grade,
	CreateGradeDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Grade> = await axios.post(
			gradeUrls.createAndGet,
			payload,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		payload.dispatch(closeModal());
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Post error');
	}
};

export const getGradeById: AsyncThunkPayloadCreator<Grade, string> = async (
	id,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Grade> = await axios.get(
			gradeUrls.getOnePatchDelete(id),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Post error');
	}
};

export const updateGrade: AsyncThunkPayloadCreator<
	Grade,
	UpdateGradeDto
> = async (payload, thunkAPI) => {
	const { folderIds, rate, title } = payload;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Grade> = await axios.patch(
			gradeUrls.getOnePatchDelete(payload.id),
			{ title, rate, folderIds },
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Post error');
	}
};

export const deleteGrade: AsyncThunkPayloadCreator<Grade, string> = async (
	id,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Grade> = await axios.delete(
			gradeUrls.getOnePatchDelete(id),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Post error');
	}
};
