import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { roleUrls } from '../helpers';
import { returnApiError } from '@/utils/error.handler';
import { RootState } from '../store';
import { closeModal } from '../modalWindow/modalwindow.slice';

export const getRoles: AsyncThunkPayloadCreator<Role[]> = async (
	_,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Role[]> = await axios.get(
			roleUrls.createAndGet,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getRoleById: AsyncThunkPayloadCreator<Role, string> = async (
	id,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Role> = await axios.get(
			roleUrls.getOneUpdateDelete(id),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const createRole: AsyncThunkPayloadCreator<Role, createRoleDto> = async (
	payload,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const { dispatch, ...rest } = payload;
		const response: AxiosResponse<Role> = await axios.post(
			roleUrls.createAndGet,
			rest,
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		dispatch(closeModal());
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const updateRole: AsyncThunkPayloadCreator<Role, UpdateRoleDto> = async (
	payload,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Role> = await axios.patch(
			roleUrls.getOneUpdateDelete(payload.id),
			{ title: payload.title },
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const createAccess: AsyncThunkPayloadCreator<any, CreateAccess> = async (
	payload,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<any> = await axios.patch(
			roleUrls.createAccess(payload.agentId),
			{ roleId: payload.roleId },
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const removeAccess: AsyncThunkPayloadCreator<any, CreateAccess> = async (
	payload,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<any> = await axios.patch(
			roleUrls.removeAccess(payload.agentId),
			{ roleId: payload.roleId },
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const deleteRole: AsyncThunkPayloadCreator<any, string> = async (
	id,
	thunkAPI
) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<any> = await axios.delete(
			roleUrls.getOneUpdateDelete(id),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};
