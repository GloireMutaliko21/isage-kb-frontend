'use client';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { updateAgent } from '@/redux/agents/agents.slice';
import { Button, DatePicker, Form, Input, Modal } from 'antd';

const UpdateAgent = ({ handlers }: { handlers: ModalsHandlers }) => {
	const dispatch = useAppDispatch();

	const { status, selectedAgent } = useAppSelector((state) => state.agents);
	const onSubmit = (values: any) => {
		dispatch(updateAgent({ ...values, id: selectedAgent?.id, dispatch }));
	};
	return (
		<Modal
			open={true}
			centered
			title="Mise à jour des infos de l'agent"
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form onFinish={onSubmit} layout='vertical'>
				<div className='!max-h-[75vh] !overflow-y-auto !no-scrollbar'>
					<Form.Item
						name='matricule'
						label='Numéro matricule'
						rules={[{ type: 'string', min: 9, message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<Input size='small' placeholder='846-377-836N' />
					</Form.Item>
					<Form.Item
						name='function'
						label='Fonction'
						rules={[{ type: 'string', min: 2, message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<Input size='small' placeholder='Ex. Enseignant' />
					</Form.Item>
					<Form.Item
						name='status'
						label="Statut de l'agent"
						rules={[{ type: 'string', min: 5, message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<Input size='small' placeholder='Permanent ou visiteur' />
					</Form.Item>
					<div className='flex gap-5 w-full justify-between flex-wrap'>
						<Form.Item
							name='engagDate'
							label="Date d'engagement"
							rules={[{ type: 'date', message: '' }]}
							style={{ marginBottom: '6px' }}
						>
							<DatePicker
								className='!w-[205px]'
								size='small'
								placeholder='Sélectionner la date'
							/>
						</Form.Item>
						<Form.Item
							name='promDate'
							label='Date dernière promotion'
							rules={[{ type: 'date', message: '' }]}
							style={{ marginBottom: '6px' }}
						>
							<DatePicker
								className='!w-[205px]'
								size='small'
								placeholder='Sélectionner la date'
							/>
						</Form.Item>
					</div>
					<Form.Item
						name='acadTitle'
						label='Titre académique'
						rules={[{ type: 'string', min: 5, message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<Input size='small' placeholder='ESU CT, ESU Ass ...' />
					</Form.Item>
					<Form.Item
						name='sifa'
						label='Numéro SIFA'
						rules={[{ message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<Input size='small' placeholder='Ex. 204' />
					</Form.Item>
					<Form.Item style={{ marginBottom: '6px' }}>
						<div className='flex justify-end w-full gap-4'>
							<Button
								size='middle'
								onClick={() => handlers.close!('NEW_AGENT')}
							>
								Annuler
							</Button>
							<Button htmlType='submit' loading={status.isLoading}>
								Soumettre
							</Button>
						</div>
					</Form.Item>
				</div>
			</Form>
		</Modal>
	);
};

export default UpdateAgent;
