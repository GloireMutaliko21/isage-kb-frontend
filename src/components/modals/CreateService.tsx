import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { closeModal } from '@/redux/modalWindow/modalwindow.slice';
import {
	createService,
	updateService,
} from '@/redux/service-section/section.slice';

const CreateService = ({ handlers }: { handlers: ModalsHandlers }) => {
	const { selectedService, status } = useAppSelector((state) => state.service);
	const { modal_ID } = useAppSelector((state) => state.modal);
	const dispatch = useAppDispatch();
	const onSubmit = (values: any) => {
		const { libelle } = values;
		const data = { libelle, dispatch };
		dispatch(createService(data));
	};
	const onSubmitUpdate = (values: any) => {
		const { libelle } = values;
		dispatch(updateService({ id: selectedService?.id!, libelle }));
		dispatch(closeModal());
	};
	return (
		<Modal
			open={true}
			centered
			title='Nouveau service'
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form
				onFinish={modal_ID == 'SERVICE_UPDATE' ? onSubmitUpdate : onSubmit}
				layout='vertical'
			>
				<Form.Item
					name='libelle'
					label='Titre'
					rules={[{ required: true }]}
					initialValue={
						modal_ID == 'SERVICE_UPDATE' ? selectedService?.libelle : null
					}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<div className='flex justify-end w-full gap-4'>
						<Button
							size='middle'
							onClick={() =>
								handlers.close!(
									modal_ID == 'SERVICE_UPDATE'
										? 'SERVICE_UPDATE'
										: 'NEW_SERVICE'
								)
							}
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

export default CreateService;
