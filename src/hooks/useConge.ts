import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import { getAgentsOnConge } from '@/redux/conge/conge.slice';

const useConge = () => {
	const { agentInConges, message, status } = useAppSelector(
		(state) => state.conges
	);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin) dispatch(getAgentsOnConge());
		else console.log(message);
	}, [agentInConges, dispatch, isLogin, message]);
	return { agentInConges, status, message };
};

export default useConge;
