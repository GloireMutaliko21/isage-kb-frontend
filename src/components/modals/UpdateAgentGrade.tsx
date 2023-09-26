'use client';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import useGrades from '@/hooks/useGrades';
import { updateAgent } from '@/redux/agents/agents.slice';
import { Button, Select, Form, Modal, Input } from 'antd';
const UpdateAgentGrade = ({ handlers }: { handlers: ModalsHandlers }) => {
	const dispatch = useAppDispatch();

	const { status, selectedAgent } = useAppSelector((state) => state.agents);
	const { grades } = useGrades();
	const onSubmit = (values: any) => {
		dispatch(
			updateAgent({
				...values,
				promDate: new Date(),
				id: selectedAgent?.id,
				dispatch,
			})
		);
	};
	return (
		<Modal
			open={true}
			centered
			title='Promotion et retrogradation'
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form onFinish={onSubmit} layout='vertical'>
				<Form.Item style={{ marginBottom: '6px' }}>
					<Form.Item
						name='gradeId'
						label='Grade'
						rules={[{ required: true, message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<Select
							placeholder='Sélectionner un grade'
							optionLabelProp='label'
							options={grades.map((grade) => ({
								value: grade.id,
								label: grade.title,
							}))}
							size='small'
						/>
					</Form.Item>
					<Form.Item
						name='acadTitle'
						label='Titre académique'
						rules={[{ type: 'string', min: 5, message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<Input size='small' placeholder='ESU CT, ESU Ass ...' />
					</Form.Item>
					<div className='flex justify-end w-full gap-4'>
						<Button
							size='middle'
							onClick={() => handlers.close!('UPDATE_AGENT_GRADE')}
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

export default UpdateAgentGrade;
