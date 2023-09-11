import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import { checkUserRole } from '@/features/check-role';
import {
	getAllSocialsCase,
	getPubInProgSocialCase,
} from '@/redux/social-case/social-case.slice';

const useSocialCase = () => {
	const {
		message,
		pubProgSocialCases,
		selectedSocialCase,
		socialCases,
		status,
	} = useAppSelector((state) => state.socialCase);
	const dispatch = useAppDispatch();
	const { isLogin, user } = useAuth();

	useEffect(() => {
		if (
			isLogin &&
			checkUserRole(user?.session?.user, 'gestion du personnel' || 'admin')
		)
			dispatch(getAllSocialsCase());
		else console.log(message);
		if (isLogin) dispatch(getPubInProgSocialCase());
	}, [dispatch, isLogin, message, user?.session?.user]);
	return {
		pubProgSocialCases,
		selectedSocialCase,
		socialCases,
		status,
		message,
	};
};

export default useSocialCase;
