import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as remunerationService from './remuneration.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	remMalad: {
		created: CreatedRemMalad | null;
		total: RemMalad | null;
	};
	deduction: {
		created: CreatedDeductionPrime | null;
		total: DeductionPrime | null;
		synthese: DeductionPrimeSynthese | null;
	};
	prime: {
		created: CreatedDeductionPrime | null;
		total: DeductionPrime | null;
		synthese: DeductionPrimeSynthese | null;
	};
	allocation: {
		created: CreatedAllocRemCongFerie | null;
		total: Alloc | null;
	};
	remConge: {
		created: CreatedAllocRemCongFerie | null;
		total: RemCongeFerie | null;
	};
	remFerie: {
		created: CreatedAllocRemCongFerie | null;
		total: RemCongeFerie | null;
	};
	hsupp: {
		created: CreatedHSupp | null;
		total: HSupp | null;
	};
	slipList: {
		fiche: PaySlip | null;
		liste: PayList[];
		unpaid: Unpaid[];
	};
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	remMalad: {
		created: null,
		total: null,
	},
	deduction: {
		created: null,
		synthese: null,
		total: null,
	},
	prime: {
		created: null,
		synthese: null,
		total: null,
	},
	allocation: {
		created: null,
		total: null,
	},
	remConge: {
		created: null,
		total: null,
	},
	remFerie: {
		created: null,
		total: null,
	},
	hsupp: {
		created: null,
		total: null,
	},
	slipList: {
		fiche: null,
		liste: [],
		unpaid: [],
	},
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const registerRemMaladAccid = createAsyncThunk(
	'paie/malad/add',
	remunerationService.registerRemMaladAccid
);

const getRemMaladAccPerAgent = createAsyncThunk(
	'paie/malad/get',
	remunerationService.getRemMaladAccPerAgent
);

const registerSalaryDeduction = createAsyncThunk(
	'paie/deduc/add',
	remunerationService.registerSalaryDeduction
);

const getSalDeducPerAgent = createAsyncThunk(
	'paie/deduc/get',
	remunerationService.getSalDeducPerAgent
);

const getSalDeducPerAgentLibelle = createAsyncThunk(
	'paie/deduc/synth',
	remunerationService.getSalDeducPerAgentLibelle
);

const registerPrime = createAsyncThunk(
	'paie/prime/add',
	remunerationService.registerPrime
);

const getPrimeAgent = createAsyncThunk(
	'paie/prime/get',
	remunerationService.getPrimeAgent
);

const getPrimeLibelle = createAsyncThunk(
	'paie/prime/synth',
	remunerationService.getPrimeLibelle
);

const registerAllocation = createAsyncThunk(
	'paie/alloc/add',
	remunerationService.registerAllocation
);

const getFamAllocPerAgent = createAsyncThunk(
	'paie/alloc/get',
	remunerationService.getFamAllocPerAgent
);

const registerSuppHour = createAsyncThunk(
	'paie/hsupp/add',
	remunerationService.registerSuppHour
);

const getSuppHourAgent = createAsyncThunk(
	'paie/hsupp/get',
	remunerationService.getSuppHourAgent
);

const registerRemDaysConge = createAsyncThunk(
	'paie/conge/add',
	remunerationService.registerRemDaysConge
);

const getRemDaysCongePerAgent = createAsyncThunk(
	'paie/conge/get',
	remunerationService.getRemDaysCongePerAgent
);

const registerRemDaysFerie = createAsyncThunk(
	'paie/ferie/add',
	remunerationService.registerRemDaysFerie
);

const getRemDaysFeriePerAgent = createAsyncThunk(
	'paie/ferie/get',
	remunerationService.getRemDaysFeriePerAgent
);

const registerPaySlip = createAsyncThunk(
	'paie/fiche/add',
	remunerationService.registerPaySlip
);

const getPaySlipPerAgent = createAsyncThunk(
	'paie/fiche/get',
	remunerationService.getPaySlipPerAgent
);

const getPayList = createAsyncThunk(
	'paie/liste/get',
	remunerationService.getPayList
);

const getUnpaidAgents = createAsyncThunk(
	'paie/liste/unpaid',
	remunerationService.getUnpaidAgents
);

const paieSlice = createSlice({
	name: 'paie',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// maladie
			.addCase(registerRemMaladAccid.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(registerRemMaladAccid.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.remMalad.created = payload;
				state.message = null;
			})
			.addCase(registerRemMaladAccid.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			.addCase(getRemMaladAccPerAgent.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getRemMaladAccPerAgent.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.remMalad.total = payload;
				state.message = null;
			})
			.addCase(getRemMaladAccPerAgent.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			//deduction
			.addCase(registerSalaryDeduction.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(registerSalaryDeduction.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.deduction.created = payload;
				state.message = null;
			})
			.addCase(registerSalaryDeduction.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			.addCase(getSalDeducPerAgent.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getSalDeducPerAgent.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.deduction.total = payload;
				state.message = null;
			})
			.addCase(getSalDeducPerAgent.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			.addCase(getSalDeducPerAgentLibelle.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getSalDeducPerAgentLibelle.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.deduction.synthese = payload;
				state.message = null;
			})
			.addCase(getSalDeducPerAgentLibelle.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			// primes
			.addCase(registerPrime.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(registerPrime.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.prime.created = payload;
				state.message = null;
			})
			.addCase(registerPrime.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			.addCase(getPrimeAgent.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getPrimeAgent.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.prime.total = payload;
				state.message = null;
			})
			.addCase(getPrimeAgent.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			.addCase(getPrimeLibelle.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getPrimeLibelle.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.prime.synthese = payload;
				state.message = null;
			})
			.addCase(getPrimeLibelle.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			//allocations
			.addCase(registerAllocation.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(registerAllocation.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.allocation.created = payload;
				state.message = null;
			})
			.addCase(registerAllocation.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			.addCase(getFamAllocPerAgent.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getFamAllocPerAgent.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.allocation.total = payload;
				state.message = null;
			})
			.addCase(getFamAllocPerAgent.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			//heures supp
			.addCase(registerSuppHour.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(registerSuppHour.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.hsupp.created = payload;
				state.message = null;
			})
			.addCase(registerSuppHour.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			.addCase(getSuppHourAgent.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getSuppHourAgent.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.hsupp.total = payload;
				state.message = null;
			})
			.addCase(getSuppHourAgent.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			//conge
			.addCase(registerRemDaysConge.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(registerRemDaysConge.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.remConge.created = payload;
				state.message = null;
			})
			.addCase(registerRemDaysConge.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			.addCase(getRemDaysCongePerAgent.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getRemDaysCongePerAgent.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.remConge.total = payload;
				state.message = null;
			})
			.addCase(getRemDaysCongePerAgent.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			//ferie
			.addCase(registerRemDaysFerie.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(registerRemDaysFerie.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.remFerie.created = payload;
				state.message = null;
			})
			.addCase(registerRemDaysFerie.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			.addCase(getRemDaysFeriePerAgent.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getRemDaysFeriePerAgent.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.remFerie.total = payload;
				state.message = null;
			})
			.addCase(getRemDaysFeriePerAgent.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			//fiche et liste
			.addCase(registerPaySlip.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(registerPaySlip.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.slipList.fiche = payload;
				state.message = null;
			})
			.addCase(registerPaySlip.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			.addCase(getPaySlipPerAgent.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getPaySlipPerAgent.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.slipList.fiche = payload;
				state.message = null;
			})
			.addCase(getPaySlipPerAgent.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			.addCase(getPayList.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getPayList.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.slipList.liste = payload;
				state.message = null;
			})
			.addCase(getPayList.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			.addCase(getUnpaidAgents.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getUnpaidAgents.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.slipList.unpaid = payload;
				state.message = null;
			})
			.addCase(getUnpaidAgents.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			});
	},
});

export default paieSlice.reducer;
export {
	registerRemMaladAccid,
	getRemMaladAccPerAgent,
	registerSalaryDeduction,
	getSalDeducPerAgent,
	getSalDeducPerAgentLibelle,
	registerPrime,
	getPrimeAgent,
	getPrimeLibelle,
	registerAllocation,
	getFamAllocPerAgent,
	registerSuppHour,
	getSuppHourAgent,
	registerRemDaysConge,
	getRemDaysCongePerAgent,
	registerRemDaysFerie,
	getRemDaysFeriePerAgent,
	registerPaySlip,
	getPaySlipPerAgent,
	getPayList,
	getUnpaidAgents,
};