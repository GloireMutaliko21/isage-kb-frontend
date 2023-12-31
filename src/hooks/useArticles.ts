import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import {
	getArticleByCated,
	getArticles,
	getUnstockArticles,
} from '@/redux/article/article.slice';

const useArticles = () => {
	const {
		articles,
		articlesByCateg,
		unStocked,
		selectedArticle,
		message,
		status,
	} = useAppSelector((state) => state.articles);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin) {
			dispatch(getArticles());
			dispatch(getArticleByCated());
			dispatch(getUnstockArticles());
		} else console.log(message);
	}, [dispatch, isLogin, message]);
	return {
		articles,
		articlesByCateg,
		unStocked,
		selectedArticle,
		status,
		message,
	};
};

export default useArticles;
