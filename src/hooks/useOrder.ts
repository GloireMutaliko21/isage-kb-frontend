import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import { getOrders } from '@/redux/order/order.slice';

const useOrder = () => {
	const { message, orders, selectedOrder, status } = useAppSelector(
		(state) => state.order
	);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin) dispatch(getOrders());
		else console.log(message);
	}, [dispatch, isLogin, message]);
	return { orders, selectedOrder, status, message };
};

export default useOrder;
