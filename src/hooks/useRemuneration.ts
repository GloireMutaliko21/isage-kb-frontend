import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import {
	getPayList,
	getPaySlipAll,
	getUnpaidAgents,
} from '@/redux/remuneration/remuneration.slice';
import { lastSixMonths, lastYear } from '@/utils/dates';

const useRemuneration = () => {
	const paie = useAppSelector((state) => state.remuneration);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	const lastYearFiches = () => dispatch(getPaySlipAll(lastYear()));
	const lastSixMonthFiches = () => dispatch(getPaySlipAll(lastSixMonths()));

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
			dispatch(getPaySlipAll(lastSixMonths()));
		} else console.log(paie.message);
	}, [dispatch, isLogin, paie.message]);
	return { paie, lastYearFiches, lastSixMonthFiches };
};

export default useRemuneration;
