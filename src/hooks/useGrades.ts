import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import { getGrades } from '@/redux/grade/grade.slice';

const useGrades = () => {
	const { grades, message, selectedGrade, status } = useAppSelector(
		(state) => state.grade
	);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin) dispatch(getGrades());
		else console.log(message);
	}, [dispatch, isLogin, message]);
	return { grades, selectedGrade, status, message };
};

export default useGrades;
