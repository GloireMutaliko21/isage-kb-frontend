import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import { getAgents } from '@/redux/agents/agents.slice';

const useAgents = () => {
	const { agents, status, message } = useAppSelector((state) => state.agents);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin) dispatch(getAgents());
		else console.log(message);
	}, [dispatch, isLogin]);
	return { agents };
};

export default useAgents;
