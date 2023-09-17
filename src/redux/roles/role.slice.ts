import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as roleService from './role.service';
import { STATUS } from '@/constants/constants';

const initialState: {
	roles: Role[];
	selectedRole: Role | null;
	status: {
		isLoading: boolean;
		isSuccess: boolean;
		isError: boolean;
	};
	message: string | null;
} = {
	roles: [],
	selectedRole: null,
	status: {
		isLoading: false,
		isSuccess: false,
		isError: false,
	},
	message: null,
};

const getRoles = createAsyncThunk('roles/getAll', roleService.getRoles);

const getRoleById = createAsyncThunk('roles/getOne', roleService.getRoleById);

const createRole = createAsyncThunk('roles/create', roleService.createRole);

const updateRole = createAsyncThunk('roles/update', roleService.updateRole);

const creareAccess = createAsyncThunk(
	'roles/createAccess',
	roleService.createAccess
);

const removeAccess = createAsyncThunk(
	'roles/removeAccess',
	roleService.removeAccess
);

const deleteRole = createAsyncThunk('roles/delete', roleService.deleteRole);

const roleSlice = createSlice({
	name: 'roles',
	initialState,
	reducers: {
		setRoleIsError: (state, { payload }) => {
			state.status.isError = payload;
		},
		setRoleIsSuccess: (state, { payload }) => {
			state.status.isSuccess = payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// get all roles
			.addCase(getRoles.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getRoles.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedRole = null;
				state.roles = payload;
				state.message = null;
			})
			.addCase(getRoles.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedRole = null;
				state.message = payload as string;
			})

			// get roles by id
			.addCase(getRoleById.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(getRoleById.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedRole = payload;
				state.message = null;
			})
			.addCase(getRoleById.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedRole = null;
				state.message = payload as string;
			})

			// create role
			.addCase(createRole.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(createRole.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.selectedRole = payload;
				state.roles = [...state.roles, payload];
				state.message = 'Enregistrement réussi';
			})
			.addCase(createRole.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedRole = null;
				state.message = payload as string;
			})

			// update role
			.addCase(updateRole.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(updateRole.fulfilled, (state, { payload }) => {
				const updated = state.roles.filter((r) => r.id !== payload.id);
				state.status = STATUS.SUCCESS;
				state.selectedRole = payload;
				state.roles = [...updated, payload];
				state.message = 'Enregistrement réussi';
			})
			.addCase(updateRole.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedRole = null;
				state.message = payload as string;
			})

			// create access
			.addCase(creareAccess.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(creareAccess.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.message = 'Enregistrement réussi';
			})
			.addCase(creareAccess.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			// remove access
			.addCase(removeAccess.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(removeAccess.fulfilled, (state, { payload }) => {
				state.status = STATUS.SUCCESS;
				state.message = 'Accès supprimé';
			})
			.addCase(removeAccess.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.message = payload as string;
			})

			// update role
			.addCase(deleteRole.pending, (state) => {
				state.status = STATUS.PENDING;
			})
			.addCase(deleteRole.fulfilled, (state, { payload }) => {
				const updated = state.roles.filter((r) => r.id !== payload.id);
				state.status = STATUS.SUCCESS;
				state.selectedRole = null;
				state.roles = updated;
				state.message = 'Supprimé avec succès';
			})
			.addCase(deleteRole.rejected, (state, { payload }) => {
				state.status = STATUS.ERROR;
				state.selectedRole = null;
				state.message = payload as string;
			});
	},
});

export default roleSlice.reducer;
export {
	getRoles,
	getRoleById,
	createRole,
	updateRole,
	creareAccess,
	removeAccess,
	deleteRole,
};
export const { setRoleIsError, setRoleIsSuccess } = roleSlice.actions;
