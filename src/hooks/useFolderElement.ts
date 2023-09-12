import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import useAuth from './useAuh';
import { getFolderElements } from '@/redux/folder-element/folder-element.slice';

const useFolderElement = () => {
	const { folderElements, message, selectedFoldEl, status } = useAppSelector(
		(state) => state.folderElement
	);
	const dispatch = useAppDispatch();
	const { isLogin } = useAuth();

	useEffect(() => {
		if (isLogin && !folderElements) dispatch(getFolderElements());
		else console.log(message);
	}, [dispatch, isLogin, message]);
	return { folderElements, selectedFoldEl, status, message };
};

export default useFolderElement;
