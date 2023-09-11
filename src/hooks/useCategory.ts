import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import { getCategories } from '@/redux/property-category/category.slice';

const useCategory = () => {
	const { categories, message, selectedCategory, status } = useAppSelector(
		(state) => state.category
	);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin && !categories) dispatch(getCategories());
		else console.log(message);
	}, [dispatch, isLogin, message]);
	return { categories, selectedCategory, status, message };
};

export default useCategory;
