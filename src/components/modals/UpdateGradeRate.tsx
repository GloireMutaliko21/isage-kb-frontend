import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { updateGrade } from '@/redux/grade/grade.slice';
import { closeModal } from '@/redux/modalWindow/modalwindow.slice';
import { Button, Form, Input, Modal } from 'antd';

const UpdateGradeRate = ({ handlers }: { handlers: ModalsHandlers }) => {
	const dispatch = useAppDispatch();
	const { selectedGrade, status } = useAppSelector((state) => state.grade);
	const onSubmit = (values: any) => {
		// console.log(values);
		dispatch(
			updateGrade({
				id: selectedGrade?.id!,
				rate: { base: selectedGrade?.baseSalary!, ...values },
			})
		);
		dispatch(closeModal());
	};

	return (
		<Modal
			open={true}
			centered
			title='Mise à jour taux de rémunération'
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form onFinish={onSubmit}>
				<Form.Item>
					<Form.Item
						name='alloc'
						label='Allocation'
						className='mb-2 '
						initialValue={selectedGrade?.rate?.alloc}
						rules={[{ required: true }]}
					>
						<Input
							type='number'
							addonBefore=','
							placeholder='Allocations familiales'
						/>
					</Form.Item>
					<Form.Item
						name='conge'
						className='mb-2'
						label='Jours congé'
						initialValue={selectedGrade?.rate?.conge}
						rules={[{ required: true }]}
					>
						<Input type='number' addonBefore=',' placeholder='Jours congé' />
					</Form.Item>
					<Form.Item
						name='ferie'
						label='Jours ferié'
						className='mb-2 '
						initialValue={selectedGrade?.rate?.ferie}
						rules={[{ required: true }]}
					>
						<Input type='number' addonBefore=',' placeholder='Jours feriés' />
					</Form.Item>
					<Form.Item
						name='maladAcc'
						label='Jours maladie'
						className='mb-2 '
						initialValue={selectedGrade?.rate?.maladAcc}
						rules={[{ required: true }]}
					>
						<Input type='number' addonBefore=',' placeholder='Jours maladie' />
					</Form.Item>
					<Form.Item
						name='heureSupp'
						label='Heures supp'
						className='mb-2 '
						initialValue={selectedGrade?.rate?.heureSupp}
						rules={[{ required: true }]}
					>
						<Input type='number' addonBefore=',' placeholder='Heures suppl' />
					</Form.Item>
				</Form.Item>
				<Form.Item>
					<div className='flex justify-end w-full gap-4'>
						<Button
							size='middle'
							onClick={() => handlers.close!('UPDATE_GRADE_RATES')}
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

export default UpdateGradeRate;
