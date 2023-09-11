import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import { getImmobs } from '@/redux/immobilisations/immob.slice';

const useImmob = () => {
	const { immobs, message, selectedImmob, status } = useAppSelector(
		(state) => state.immobs
	);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin) dispatch(getImmobs());
		else console.log(message);
	}, [dispatch, immobs, isLogin, message]);
	return { immobs, selectedImmob, status, message };
};

export default useImmob;
