import { useEffect } from 'react';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import useAuth from './useAuh';
import {
	getMonthSynthese,
	getTodaySheet,
} from '@/redux/inventaire/inventaire.slice';

const useInventaire = () => {
	const { message, sheetSynthese, status, stockSheet } = useAppSelector(
		(state) => state.inventaire
	);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin) {
			dispatch(getTodaySheet());
			dispatch(getMonthSynthese());
		} else console.log(message);
	}, [dispatch, isLogin, message]);
	return { sheetSynthese, stockSheet, status, message };
};

export default useInventaire;
