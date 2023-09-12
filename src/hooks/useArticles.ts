import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import { getArticles } from '@/redux/article/article.slice';

const useArticles = () => {
	const { articles, selectedArticle, message, status } = useAppSelector(
		(state) => state.articles
	);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin) dispatch(getArticles());
		else console.log(message);
	}, [dispatch, isLogin, message]);
	return { articles, selectedArticle, status, message };
};

export default useArticles;
