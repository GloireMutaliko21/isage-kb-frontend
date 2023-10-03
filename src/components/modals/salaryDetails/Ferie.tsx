'use client';
import { Button, Form, InputNumber, Modal, Select } from 'antd';

import useAgents from '@/hooks/useAgents';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { closeModal } from '@/redux/modalWindow/modalwindow.slice';
import { registerRemDaysFerie } from '@/redux/remuneration/remuneration.slice';
const Ferie = ({ handlers }: { handlers: ModalsHandlers }) => {
	const { agents } = useAgents();
	const dispatch = useAppDispatch();
	const onSubmit = (values: any) => {
		const { agentId, days } = values;
		dispatch(registerRemDaysFerie({ agentId, days }));
		dispatch(closeModal());
	};
	return (
		<Modal
			open={true}
			centered
			title='Enregistrement travail en jours fériés'
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form layout='vertical' onFinish={onSubmit}>
				<Form.Item
					name='agentId'
					label='Sélectionner agent'
					rules={[{ required: true }]}
					style={{ marginBottom: '6px' }}
				>
					<Select
						optionLabelProp='label'
						showSearch
						size='small'
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
					name='days'
					label='Nombre de jours'
					rules={[{ required: true, type: 'number' }]}
					className='w-full'
				>
					<InputNumber
						size='small'
						placeholder='Ex. 10'
						type='number'
						className='w-full'
					/>
				</Form.Item>
				<Form.Item>
					<div className='flex justify-end w-full gap-4'>
						<Button size='middle' onClick={() => handlers.close!('REM_FERIE')}>
							Annuler
						</Button>
						<Button htmlType='submit'>Attribuer</Button>
					</div>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default Ferie;
