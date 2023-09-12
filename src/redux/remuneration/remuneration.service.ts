import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { remunerationUrls } from '../helpers';
import { returnApiError } from '@/utils/error.handler';
import { RootState } from '../store';

// payments for days of accidents and sickness
export const registerRemMaladAccid: AsyncThunkPayloadCreator<
	CreatedRemMalad,
	RemJMaladAccDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<CreatedRemMalad> = await axios.post(
			remunerationUrls.maladAcc.create,
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

export const getRemMaladAccPerAgent: AsyncThunkPayloadCreator<
	RemMalad,
	YearMonthParams
> = async (data, thunkAPI) => {
	const { id, month, year } = data;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<RemMalad> = await axios.get(
			remunerationUrls.maladAcc.getPerAgent(id!, year, month),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

// deductions
export const registerSalaryDeduction: AsyncThunkPayloadCreator<
	CreatedDeductionPrime,
	SalaryDeductionDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<CreatedDeductionPrime> = await axios.post(
			remunerationUrls.deduc.create,
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

export const getSalDeducPerAgent: AsyncThunkPayloadCreator<
	DeductionPrime,
	YearMonthParams
> = async (data, thunkAPI) => {
	const { id, month, year } = data;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<DeductionPrime> = await axios.get(
			remunerationUrls.deduc.getPerAgent(id!, year, month),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getSalDeducPerAgentLibelle: AsyncThunkPayloadCreator<
	DeductionPrimeSynthese,
	YearMonthParams
> = async (data, thunkAPI) => {
	const { id, month, year } = data;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<DeductionPrimeSynthese> = await axios.get(
			remunerationUrls.deduc.deducSynth(id!, year, month),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

// primes
export const registerPrime: AsyncThunkPayloadCreator<
	CreatedDeductionPrime,
	SalaryDeductionDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<CreatedDeductionPrime> = await axios.post(
			remunerationUrls.prime.create,
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

export const getPrimeAgent: AsyncThunkPayloadCreator<
	DeductionPrime,
	YearMonthParams
> = async (data, thunkAPI) => {
	const { id, month, year } = data;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<DeductionPrime> = await axios.get(
			remunerationUrls.prime.getPerAgent(id!, year, month),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getPrimeLibelle: AsyncThunkPayloadCreator<
	DeductionPrimeSynthese,
	YearMonthParams
> = async (data, thunkAPI) => {
	const { id, month, year } = data;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<DeductionPrimeSynthese> = await axios.get(
			remunerationUrls.prime.primeSynth(id!, year, month),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

// allocations
export const registerAllocation: AsyncThunkPayloadCreator<
	CreatedAllocRemCongFerie,
	FamilyAllocationDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<CreatedAllocRemCongFerie> = await axios.post(
			remunerationUrls.alloc.create,
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

export const getFamAllocPerAgent: AsyncThunkPayloadCreator<
	Alloc,
	YearMonthParams
> = async (data, thunkAPI) => {
	const { id, month, year } = data;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Alloc> = await axios.get(
			remunerationUrls.alloc.getPerAgent(id!, year, month),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

// heures supp
export const registerSuppHour: AsyncThunkPayloadCreator<
	CreatedHSupp,
	SuppHourDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<CreatedHSupp> = await axios.post(
			remunerationUrls.hsupp.create,
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

export const getSuppHourAgent: AsyncThunkPayloadCreator<
	HSupp,
	YearMonthParams
> = async (data, thunkAPI) => {
	const { id, month, year } = data;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<HSupp> = await axios.get(
			remunerationUrls.hsupp.getPerAgent(id!, year, month),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

// remuneration jours conge
export const registerRemDaysConge: AsyncThunkPayloadCreator<
	CreatedAllocRemCongFerie,
	FamilyAllocationDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<CreatedAllocRemCongFerie> = await axios.post(
			remunerationUrls.conge.create,
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

export const getRemDaysCongePerAgent: AsyncThunkPayloadCreator<
	RemCongeFerie,
	YearMonthParams
> = async (data, thunkAPI) => {
	const { id, month, year } = data;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<RemCongeFerie> = await axios.get(
			remunerationUrls.conge.getPerAgent(id!, year, month),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

// remuneration jours feries
export const registerRemDaysFerie: AsyncThunkPayloadCreator<
	CreatedAllocRemCongFerie,
	FamilyAllocationDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<CreatedAllocRemCongFerie> = await axios.post(
			remunerationUrls.ferie.create,
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

export const getRemDaysFeriePerAgent: AsyncThunkPayloadCreator<
	RemCongeFerie,
	YearMonthParams
> = async (data, thunkAPI) => {
	const { id, month, year } = data;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<RemCongeFerie> = await axios.get(
			remunerationUrls.ferie.getPerAgent(id!, year, month),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

// fiche et liste paie
export const registerPaySlip: AsyncThunkPayloadCreator<
	PaySlip,
	CreatePaySlipDto
> = async (payload, thunkAPI) => {
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<PaySlip> = await axios.post(
			remunerationUrls.payslip.create,
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

export const getPaySlipPerAgent: AsyncThunkPayloadCreator<
	PaySlip,
	YearMonthParams
> = async (data, thunkAPI) => {
	const { id, month, year } = data;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<PaySlip> = await axios.get(
			remunerationUrls.payslip.getPerAgent(id!, year, month),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getPaySlipAll: AsyncThunkPayloadCreator<
	PaySlip[],
	StartEndDatesParams
> = async (data, thunkAPI) => {
	const { start, end } = data;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<PaySlip[]> = await axios.get(
			remunerationUrls.payslip.getAll(start, end),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getPayList: AsyncThunkPayloadCreator<
	PayList[],
	YearMonthParams
> = async (data, thunkAPI) => {
	const { id, month, year } = data;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<PayList[]> = await axios.get(
			remunerationUrls.payslip.getPayList(year, month),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};

export const getUnpaidAgents: AsyncThunkPayloadCreator<
	Unpaid[],
	YearMonthParams
> = async (data, thunkAPI) => {
	const { id, month, year } = data;
	const {
		auth: { session },
	} = thunkAPI.getState() as RootState;
	try {
		const response: AxiosResponse<Unpaid[]> = await axios.get(
			remunerationUrls.payslip.unpaid(year, month),
			{ headers: { Authorization: `Bearer ${session?.token}` } }
		);
		return response.data;
	} catch (error) {
		return axios.isAxiosError(error)
			? thunkAPI.rejectWithValue(returnApiError(error))
			: thunkAPI.rejectWithValue('Fetch error');
	}
};
