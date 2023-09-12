import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import {
	getPayList,
	getUnpaidAgents,
} from '@/redux/remuneration/remuneration.slice';

const useRemuneration = () => {
	const paie = useAppSelector((state) => state.remuneration);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin) {
			dispatch(
				getPayList({
					month: new Date().getMonth() + 1,
					year: new Date().getFullYear(),
				})
			);
			dispatch(
				getUnpaidAgents({
					month: new Date().getMonth() + 1,
					year: new Date().getFullYear(),
				})
			);
		} else console.log(paie.message);
	}, [dispatch, isLogin, paie.message]);
	return { paie };
};

export default useRemuneration;
