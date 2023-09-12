import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import useAuth from './useAuh';
import {
	getGlobalHistoric,
	getMonthSynthese,
	getTodaySheet,
} from '@/redux/inventaire/inventaire.slice';

const useInventaire = () => {
	const { message, globalSheet, sheetSynthese, status, stockSheet } =
		useAppSelector((state) => state.inventaire);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	const currDate = dayjs();
	const start = new Date(currDate.subtract(6, 'month').toISOString());
	const end = new Date(currDate.endOf('month').toISOString());

	useEffect(() => {
		if (isLogin) {
			dispatch(getTodaySheet());
			dispatch(getMonthSynthese());
			dispatch(getGlobalHistoric({ start, end }));
		} else console.log(message);
	}, [dispatch, isLogin, message]);
	return { sheetSynthese, globalSheet, stockSheet, status, message };
};

export default useInventaire;
