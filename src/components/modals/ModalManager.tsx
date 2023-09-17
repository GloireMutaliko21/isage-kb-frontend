'use client';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { closeModal } from '@/redux/modalWindow/modalwindow.slice';
import { useCallback } from 'react';
import CreateGrade from './CreateGrade';
import UpdateGradeRate from './UpdateGradeRate';
import UpdateGradeFolderIds from './UpdateGradeFolderIds';
import CreateFolderElement from './CreateFolderElement';
import DetailFolderElement from './DetailFolderElement';

const ModalManager = () => {
	const { modal_ID, payload, thread } = useAppSelector((state) => state.modal);
	const dispatch = useAppDispatch();
	const close = useCallback(() => dispatch(closeModal()), [dispatch]);
	return (
		<div className=''>
			{/* Grades */}
			{modal_ID == 'NEW_GRADE' && (
				<CreateGrade handlers={{ close, id: 'NEW_GRADE' }} />
			)}
			{modal_ID == 'UPDATE_GRADE_RATES' && (
				<UpdateGradeRate handlers={{ close, id: 'UPDATE_GRADE_RATES' }} />
			)}
			{modal_ID == 'UPDATE_GRADE_FOLDERS' && (
				<UpdateGradeFolderIds
					handlers={{ close, id: 'UPDATE_GRADE_FOLDERS' }}
				/>
			)}

			{/* Folder elements */}
			{modal_ID == 'NEW_FOLDER_ELEMENT' && (
				<CreateFolderElement handlers={{ close, id: 'NEW_FOLDER_ELEMENT' }} />
			)}
			{modal_ID == 'FOLDER_ELEMENT_UPDATE' && (
				<CreateFolderElement
					handlers={{ close, id: 'FOLDER_ELEMENT_UPDATE' }}
				/>
			)}
			{modal_ID == 'FOLDER_ELEMENT_DETAILS' && (
				<DetailFolderElement
					handlers={{ close, id: 'FOLDER_ELEMENT_DETAILS' }}
				/>
			)}
			<></>
		</div>
	);
};

export default ModalManager;
