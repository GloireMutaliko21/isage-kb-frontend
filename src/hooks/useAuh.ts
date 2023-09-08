'use client';
import { loadUserData, logoutUser } from '@/redux/auth/auth.slice';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useRouter } from 'next/navigation';

const useAuth = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth);

	const isLogin = useMemo(() => {
		return !!user.session;
	}, [user.session]);

	const logout = () => {
		dispatch(logoutUser());
	};

	useEffect(() => {
		const session = JSON.parse(localStorage.getItem('session-user')!);
		if (!user.session && session) dispatch(loadUserData(session));
	}, [dispatch, user.session]);

	return { user, isLogin, logout };
};

export default useAuth;
