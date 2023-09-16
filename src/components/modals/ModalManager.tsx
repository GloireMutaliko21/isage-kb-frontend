'use client';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { closeModal } from '@/redux/modalWindow/modalwindow.slice';
import { useCallback } from 'react';
import CreateGrade from './CreateGrade';

const ModalManager = () => {
	const { modal_ID, payload, thread } = useAppSelector((state) => state.modal);
	const dispatch = useAppDispatch();
	const close = useCallback(() => dispatch(closeModal()), [dispatch]);
	return (
		<div className=''>
			{modal_ID == 'NEW_GRADE' ? (
				<CreateGrade handlers={{ close, id: 'NEW_GRADE' }} />
			) : (
				<></>
			)}
		</div>
	);
};

export default ModalManager;
