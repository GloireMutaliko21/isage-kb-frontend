import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { articleUrls } from '../helpers';
import { returnApiError } from '@/utils/error.handler';
import { RootState } from '../store';
import { closeModal } from '../modalWindow/modalwindow.slice';

export const getArticles: AsyncThunkPayloadCreator<Article[]> = async (
	_,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Article[]> = await axios.get(
			articleUrls.createAndGet,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getArticleById: AsyncThunkPayloadCreator<Article, string> = async (
	id,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Article> = await axios.get(
			articleUrls.getOne(id),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getByCated: AsyncThunkPayloadCreator<ArticleByCated[]> = async (
	_,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<ArticleByCated[]> = await axios.get(
			articleUrls.getCateg,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getUnstock: AsyncThunkPayloadCreator<Article[]> = async (
	_,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Article[]> = await axios.get(
			articleUrls.getUnstock,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const createrticle: AsyncThunkPayloadCreator<
	Article,
	CreateArticleDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const { dispatch, ...rest } = payload;
		const response: AxiosResponse<Article> = await axios.post(
			articleUrls.createAndGet,
			rest,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		dispatch(closeModal());
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Post error');
	}
};

export const updateArticle: AsyncThunkPayloadCreator<
	Article,
	UpdateArticleDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const { id, dispatch, ...rest } = payload;
		const response: AxiosResponse<Article> = await axios.patch(
			articleUrls.getOne(id!),
			rest,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		dispatch(closeModal());
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Post error');
	}
};
