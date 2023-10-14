'use client';

import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
	createUnity,
	updateUnity,
} from '@/redux/article-unity/article-unity.slice';
import { closeModal } from '@/redux/modalWindow/modalwindow.slice';

const CreateAndUpdateUnity = ({ handlers }: { handlers: ModalsHandlers }) => {
	const dispatch = useAppDispatch();

	const { status, selectedUnity } = useAppSelector(
		(state) => state.articleUnity
	);
	const { modal_ID } = useAppSelector((state) => state.modal);

	const onSubmit = (values: any) => {
		dispatch(createUnity({ libelle: values.libelle }));
		dispatch(closeModal());
	};
	const onSubmitUpdate = (values: any) => {
		dispatch(
			updateUnity({
				id: selectedUnity?.id,
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
				modal_ID == 'NEW_UNITY'
					? 'Création unité de mesure'
					: `Modification ${selectedUnity?.libelle}`
			}
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form
				onFinish={modal_ID == 'NEW_UNITY' ? onSubmit : onSubmitUpdate}
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
									modal_ID == 'NEW_UNITY' ? 'NEW_UNITY' : 'UPDATE_UNITY'
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

export default CreateAndUpdateUnity;
