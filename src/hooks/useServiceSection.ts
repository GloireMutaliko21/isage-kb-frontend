import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import { getServices } from '@/redux/service-section/section.slice';

const useServiceSection = () => {
	const { message, selectedService, services, status } = useAppSelector(
		(state) => state.service
	);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin) dispatch(getServices());
		else console.log(message);
	}, [dispatch, isLogin, message]);
	return { services, selectedService, status, message };
};

export default useServiceSection;
