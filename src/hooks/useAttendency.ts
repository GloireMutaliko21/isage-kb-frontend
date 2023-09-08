import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import { getDaily } from '@/redux/attendency/attendency.slice';

const useAttendency = () => {
	const { attendecies, status, message } = useAppSelector(
		(state) => state.attendency
	);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin) dispatch(getDaily());
		else console.log(message);
	}, [dispatch, isLogin, message]);
	return { attendecies, status, message };
};

export default useAttendency;
