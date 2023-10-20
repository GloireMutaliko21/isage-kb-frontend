import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { closeModal } from '@/redux/modalWindow/modalwindow.slice';
import { createOrder } from '@/redux/order/order.slice';
import { Button, Form, InputNumber, Modal } from 'antd';
import React from 'react';

const CreateOrder = ({ handlers }: { handlers: ModalsHandlers }) => {
	const dispatch = useAppDispatch();
	const { status } = useAppSelector((state) => state.order);
	const { selectedArticle } = useAppSelector((state) => state.articles);

	const onSubmit = (values: any) => {
		dispatch(createOrder({ articleId: selectedArticle?.id!, qty: values.qty }));
		dispatch(closeModal());
	};
	return (
		<Modal
			open={true}
			centered
			title='Commande article'
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form onFinish={onSubmit} layout='vertical'>
				<Form.Item
					name='qty'
					label='Quantité'
					style={{ marginBottom: '6px' }}
					rules={[{ required: true }]}
				>
					<InputNumber size='small' className='!w-full' />
				</Form.Item>
				<Form.Item style={{ marginBottom: '6px' }}>
					<div className='flex justify-end w-full gap-4'>
						<Button
							size='middle'
							onClick={() => handlers.close!('ORDER_ARTICLE')}
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

export default CreateOrder;
