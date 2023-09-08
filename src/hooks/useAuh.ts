'use client';
import { loadUserData } from '@/redux/auth/auth.slice';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

const useAuth = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth);

	const isLogin = useMemo(() => {
		return !!user.session;
	}, [user.session]);

	useEffect(() => {
		const session = JSON.parse(localStorage.getItem('session-user')!);
		if (!user.session && session) dispatch(loadUserData(session));
	}, [dispatch, user.session]);

	return { user, isLogin };
};

export default useAuth;
