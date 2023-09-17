import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import useFolderElement from '@/hooks/useFolderElement';
import {
	createFolderElement,
	updateFolderElement,
} from '@/redux/folder-element/folder-element.slice';
import { closeModal } from '@/redux/modalWindow/modalwindow.slice';
import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

const CreateFolderElement = ({ handlers }: { handlers: ModalsHandlers }) => {
	const { selectedFoldEl, status } = useAppSelector(
		(state) => state.folderElement
	);
	const { modal_ID } = useAppSelector((state) => state.modal);
	const dispatch = useAppDispatch();
	const onSubmit = (values: any) => {
		const { title } = values;
		const data = { title, dispatch };
		dispatch(createFolderElement(data));
	};
	const onSubmitUpdate = (values: any) => {
		const { title } = values;
		dispatch(updateFolderElement({ id: selectedFoldEl?.id!, title }));
		dispatch(closeModal());
	};

	return (
		<Modal
			open={true}
			centered
			title='Nouvel élément de dossier'
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form
				onFinish={
					modal_ID == 'FOLDER_ELEMENT_UPDATE' ? onSubmitUpdate : onSubmit
				}
				layout='vertical'
			>
				<Form.Item
					name='title'
					label='Titre'
					rules={[{ required: true }]}
					initialValue={
						modal_ID == 'FOLDER_ELEMENT_UPDATE' ? selectedFoldEl?.title : null
					}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<div className='flex justify-end w-full gap-4'>
						<Button
							size='middle'
							onClick={() => handlers.close!('NEW_FOLDER_ELEMENT')}
						>
							Annuler
						</Button>
						<Button htmlType='submit' loading={status.isLoading}>
							Terminer
						</Button>
					</div>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default CreateFolderElement;
