'use client';
import useAgents from '@/hooks/useAgents';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import useRole from '@/hooks/useRole';
import { closeModal } from '@/redux/modalWindow/modalwindow.slice';
import { createAccess } from '@/redux/roles/role.slice';
import { Button, Form, Modal, Select } from 'antd';

const CreateAccess = ({ handlers }: { handlers: ModalsHandlers }) => {
	const { agents } = useAgents();
	const { roles, status } = useRole();

	const dispatch = useAppDispatch();

	const onSubmit = (values: any) => {
		const { agentId, roleId } = values;
		dispatch(createAccess({ agentId, roleId }));
		dispatch(closeModal());
	};

	return (
		<Modal
			open={true}
			centered
			title="Attribution d'accès"
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form layout='vertical' onFinish={onSubmit}>
				<Form.Item
					name='agentId'
					label='Sélectionner agent'
					rules={[{ required: true }]}
				>
					<Select
						optionLabelProp='label'
						showSearch
						filterOption={(input, option) =>
							(option?.label ?? '').includes(input) ||
							(option?.label ?? '').toLowerCase().includes(input) ||
							(option?.label ?? '').toUpperCase().includes(input)
						}
						filterSort={(optionA, optionB) =>
							(optionA?.label ?? '')
								.toLowerCase()
								.localeCompare((optionB?.label ?? '').toLowerCase())
						}
						options={agents.map((agent) => ({
							label: agent.names,
							value: agent.id,
						}))}
					/>
				</Form.Item>
				<Form.Item
					name='roleId'
					label='Sélectionner le rôle'
					rules={[{ required: true }]}
				>
					<Select optionLabelProp='label'>
						{roles.map((role) => (
							<Select.Option key={role.id} value={role.id} label={role.title}>
								{role.title}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item>
					<div className='flex justify-end w-full gap-4'>
						<Button
							size='middle'
							onClick={() => handlers.close!('CREATE_ACCESS')}
						>
							Annuler
						</Button>
						<Button htmlType='submit' loading={status.isLoading}>
							Attribuer
						</Button>
					</div>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default CreateAccess;
