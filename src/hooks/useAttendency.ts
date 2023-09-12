import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import { getDaily } from '@/redux/attendency/attendency.slice';
import { getMonthly } from '@/redux/attendency/attendency.slice';
import { lastMonthYearAndMont } from '@/utils/dates';

const useAttendency = () => {
	const { attendecies, status, message } = useAppSelector(
		(state) => state.attendency
	);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	const lastMonthAttends = () => dispatch(getMonthly(lastMonthYearAndMont()));

	const getDailyAttends = () => dispatch(getDaily());

	useEffect(() => {
		if (isLogin) dispatch(getDaily());
		else console.log(message);
	}, [dispatch, isLogin, message]);
	return { attendecies, status, message, getDailyAttends, lastMonthAttends };
};

export default useAttendency;
