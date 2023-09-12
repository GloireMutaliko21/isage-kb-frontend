import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import { getAmortis, getImmobs } from '@/redux/immobilisations/immob.slice';

const useImmob = () => {
	const { immobs, amortis, message, selectedImmob, status } = useAppSelector(
		(state) => state.immobs
	);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin) {
			dispatch(getImmobs());
			dispatch(getAmortis());
		} else console.log(message);
	}, [dispatch, isLogin, message]);
	return { immobs, selectedImmob, status, message, amortis };
};

export default useImmob;
