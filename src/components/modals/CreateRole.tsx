import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { closeModal } from '@/redux/modalWindow/modalwindow.slice';
import { createRole, updateRole } from '@/redux/roles/role.slice';

const CreateRole = ({ handlers }: { handlers: ModalsHandlers }) => {
	const { selectedRole, status } = useAppSelector((state) => state.role);
	const { modal_ID } = useAppSelector((state) => state.modal);
	const dispatch = useAppDispatch();
	const onSubmit = (values: any) => {
		const { title } = values;
		const data = { title, dispatch };
		dispatch(createRole(data));
	};
	const onSubmitUpdate = (values: any) => {
		const { title } = values;
		dispatch(updateRole({ id: selectedRole?.id!, title }));
		dispatch(closeModal());
	};
	return (
		<Modal
			open={true}
			centered
			title='Nouveau rôle'
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form
				onFinish={modal_ID == 'UPDATE_ROLE' ? onSubmitUpdate : onSubmit}
				layout='vertical'
			>
				<Form.Item
					name='title'
					label='Titre'
					rules={[{ required: true }]}
					initialValue={modal_ID == 'UPDATE_ROLE' ? selectedRole?.title : null}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<div className='flex justify-end w-full gap-4'>
						<Button
							size='middle'
							onClick={() =>
								handlers.close!(
									modal_ID == 'UPDATE_ROLE' ? 'UPDATE_ROLE' : 'NEW_ROLE'
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

export default CreateRole;
