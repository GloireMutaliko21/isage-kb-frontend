import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import { getHistoric, getOrders } from '@/redux/order/order.slice';

const useOrder = () => {
	const { message, orders, closedOrder, selectedOrder, status } =
		useAppSelector((state) => state.order);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin) {
			dispatch(getOrders());
			dispatch(getHistoric());
		} else console.log(message);
	}, [dispatch, isLogin, message]);
	return { closedOrder, orders, selectedOrder, status, message };
};

export default useOrder;
