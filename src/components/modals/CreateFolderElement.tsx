import { useAppDispatch } from '@/hooks/useAppDispatch';
import useFolderElement from '@/hooks/useFolderElement';
import { createFolderElement } from '@/redux/folder-element/folder-element.slice';
import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

const CreateFolderElement = ({ handlers }: { handlers: ModalsHandlers }) => {
	const { status } = useFolderElement();
	const dispatch = useAppDispatch();
	const onSubmit = (values: any) => {
		const { title } = values;
		const data = { title, dispatch };
		dispatch(createFolderElement(data));
	};

	return (
		<Modal
			open={true}
			centered
			title='Nouvel élément de dossier'
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form onFinish={onSubmit} layout='vertical'>
				<Form.Item name='title' label='Titre' rules={[{ required: true }]}>
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
