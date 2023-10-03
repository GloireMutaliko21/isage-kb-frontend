'use client';
import { Button, Form, InputNumber, Modal, Select } from 'antd';

import useAgents from '@/hooks/useAgents';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { closeModal } from '@/redux/modalWindow/modalwindow.slice';
import { registerPrime } from '@/redux/remuneration/remuneration.slice';
const Primes = ({ handlers }: { handlers: ModalsHandlers }) => {
	const { agents } = useAgents();
	const dispatch = useAppDispatch();
	const onSubmit = (values: any) => {
		const { agentId, amount, libelle } = values;
		dispatch(registerPrime({ agentId, amount, libelle }));
		dispatch(closeModal());
	};
	return (
		<Modal
			open={true}
			centered
			title='Enregistrement des primes'
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
					name='amount'
					label='Montant'
					rules={[{ required: true, type: 'number' }]}
					className='w-full'
					style={{ marginBottom: '6px' }}
				>
					<InputNumber
						size='small'
						placeholder='Ex. 10'
						type='number'
						className='w-full'
					/>
				</Form.Item>
				<Form.Item
					name='libelle'
					label='Libéllé'
					rules={[{ required: true, type: 'string' }]}
				>
					<Select
						placeholder='Libéllé'
						size='small'
						optionLabelProp='label'
						options={[
							{ label: 'Primes de risque', value: 'Primes de risque' },
							{ label: "Primes d'ancienneté", value: "Primes d'ancienneté" },
							{ label: 'Primes de pénibilité', value: 'Primes de pénibilité' },
							{ label: 'Primes de naissance', value: 'Naissance' },
							{ label: 'Gratifications', value: 'Gratifications' },
							{ label: 'Divers', value: 'Divers' },
						]}
					/>
				</Form.Item>
				<Form.Item>
					<div className='flex justify-end w-full gap-4'>
						<Button
							size='middle'
							onClick={() => handlers.close!('PRIME_GRATIF')}
						>
							Annuler
						</Button>
						<Button htmlType='submit'>Attribuer</Button>
					</div>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default Primes;
