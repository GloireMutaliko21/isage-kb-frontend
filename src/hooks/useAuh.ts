'use client';
import { loadUserToken } from '@/redux/auth/auth.slice';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

const useAuth = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth);

	const isPendindLogin = useMemo(() => {
		return !!user.thread.find(
			(task) => task.action == 'LOGIN' && task.status == 'PENDING'
		);
	}, [user.thread]);

	const isLogin = useMemo(() => {
		return !!user.data;
	}, [user.data]);

	useEffect(() => {
		const token = localStorage.getItem('session_token');
		if (!user.token && token) dispatch(loadUserToken(token));
	}, [dispatch, user.token]);

	return { user, isPendindLogin, isLogin };
};

export default useAuth;
