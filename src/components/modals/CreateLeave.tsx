'use client';
import { Button, Modal, Form, Select, DatePicker } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { createConge } from '@/redux/conge/conge.slice';
import useAgents from '@/hooks/useAgents';
import { closeModal } from '@/redux/modalWindow/modalwindow.slice';

const { RangePicker } = DatePicker;

const CreateLeave = ({ handlers }: { handlers: ModalsHandlers }) => {
	const dispatch = useAppDispatch();
	const { agents } = useAgents();
	const { status } = useAppSelector((state) => state.conges);

	const onSubmit = (values: any) => {
		const { agentId, date } = values;
		const startDate = date[0].$d;
		const endDate = date[1].$d;
		dispatch(createConge({ agentId, startDate, endDate }));
		dispatch(closeModal());
	};
	return (
		<Modal
			open={true}
			centered
			title='Accorder congé'
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form onFinish={onSubmit} layout='vertical'>
				<Form.Item
					name='agentId'
					label='Sélectionner agent'
					rules={[{ required: true }]}
					style={{ marginBottom: '6px' }}
				>
					<Select
						optionLabelProp='label'
						size='small'
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
					name='date'
					label='Date de début et de fin'
					rules={[{ required: true, message: '' }]}
					style={{ marginBottom: '6px' }}
				>
					<RangePicker size='small' format={'DD-MM-YYYY'} />
				</Form.Item>

				<Form.Item style={{ marginBottom: '6px', marginTop: '20px' }}>
					<div className='flex justify-end w-full gap-4'>
						<Button size='middle' onClick={() => handlers.close!('NEW_LEAVE')}>
							Annuler
						</Button>
						<Button htmlType='submit' loading={status.isLoading}>
							Approuver
						</Button>
					</div>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default CreateLeave;
