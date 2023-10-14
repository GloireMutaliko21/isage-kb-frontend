'use client';

import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
	createCategory,
	updateCategory,
} from '@/redux/property-category/category.slice';
import { closeModal } from '@/redux/modalWindow/modalwindow.slice';
const CreateAndUpdateCategory = ({
	handlers,
}: {
	handlers: ModalsHandlers;
}) => {
	const dispatch = useAppDispatch();

	const { status, selectedCategory } = useAppSelector(
		(state) => state.category
	);
	const { modal_ID } = useAppSelector((state) => state.modal);

	const onSubmit = (values: any) => {
		dispatch(createCategory({ libelle: values.libelle }));
		dispatch(closeModal());
	};
	const onSubmitUpdate = (values: any) => {
		dispatch(
			updateCategory({
				id: selectedCategory?.id,
				libelle: values.libelle,
			})
		);
		dispatch(closeModal());
	};

	return (
		<Modal
			open={true}
			centered
			title={
				modal_ID == 'NEW_CATEGORY'
					? 'Création catégorie'
					: `Modification ${selectedCategory?.libelle}`
			}
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form
				onFinish={modal_ID == 'NEW_CATEGORY' ? onSubmit : onSubmitUpdate}
				layout='vertical'
			>
				<Form.Item
					name='libelle'
					label='Libellé'
					style={{ marginBottom: '6px' }}
					rules={[{ required: true }]}
				>
					<Input size='small' />
				</Form.Item>
				<Form.Item style={{ marginBottom: '6px' }}>
					<div className='flex justify-end w-full gap-4'>
						<Button
							size='middle'
							onClick={() =>
								handlers.close!(
									modal_ID == 'NEW_CATEGORY'
										? 'NEW_CATEGORY'
										: 'UPDATE_CATEGORY'
								)
							}
						>
							Annuler
						</Button>
						<Button htmlType='submit' loading={status.isLoading}>
							Soumettre
						</Button>
					</div>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default CreateAndUpdateCategory;
