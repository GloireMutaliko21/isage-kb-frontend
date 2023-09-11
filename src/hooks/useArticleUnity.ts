import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import { getUnities } from '@/redux/article-unity/article-unity.slice';

const useArticleUnity = () => {
	const { message, selectedUnity, status, unities } = useAppSelector(
		(state) => state.articleUnity
	);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin && !unities) dispatch(getUnities());
		else console.log(message);
	}, [dispatch, isLogin, message, unities]);
	return { unities, selectedUnity, status, message };
};

export default useArticleUnity;
