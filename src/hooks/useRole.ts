import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import { getRoles } from '@/redux/roles/role.slice';

const useRole = () => {
	const { message, roles, selectedRole, status } = useAppSelector(
		(state) => state.role
	);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin) dispatch(getRoles());
		else console.log(message);
	}, [dispatch, isLogin, message]);
	return { roles, selectedRole, status, message };
};

export default useRole;
