import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import useAuth from './useAuh';
import {
	getGlobalDashboardHistoric,
	getGlobalHistoric,
	getMonthSynthese,
	getTodaySheet,
} from '@/redux/inventaire/inventaire.slice';
import { lastSixMonths, lastYear } from '@/utils/dates';

const useInventaire = () => {
	const {
		message,
		todayStockSheet,
		globalSheet,
		globalDashboardSheet,
		sheetSynthese,
		status,
		stockSheet,
	} = useAppSelector((state) => state.inventaire);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	const lastYearGlobHistoric = () => dispatch(getGlobalHistoric(lastYear()));

	const lastSixMonthsGlobalHistoric = () =>
		dispatch(getGlobalHistoric(lastSixMonths()));

	useEffect(() => {
		if (isLogin) {
			dispatch(getTodaySheet());
			dispatch(getMonthSynthese());
			dispatch(getGlobalHistoric(lastSixMonths()));
			dispatch(getGlobalDashboardHistoric(lastSixMonths()));
		} else console.log(message);
	}, [dispatch, isLogin]);
	return {
		todayStockSheet,
		globalSheet,
		globalDashboardSheet,
		lastYearGlobHistoric,
		lastSixMonthsGlobalHistoric,
		message,
		sheetSynthese,
		status,
		stockSheet,
	};
};

export default useInventaire;
