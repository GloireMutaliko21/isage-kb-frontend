'use client';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Button, Input, Modal, Form, Select } from 'antd';
import useFolderElement from '@/hooks/useFolderElement';
import { createGrade } from '@/redux/grade/grade.slice';
import useGrades from '@/hooks/useGrades';

const CreateGrade = ({ handlers }: { handlers: ModalsHandlers }) => {
	const { folderElements } = useFolderElement();
	const { status } = useGrades();
	const dispatch = useAppDispatch();
	const onSubmit = (values: any) => {
		const { title, folderIds, baseSalary, ...rest } = values;
		const data = {
			title,
			baseSalary: parseInt(baseSalary),
			folderIds,
			rate: { base: baseSalary, ...rest },
			dispatch,
		};
		dispatch(createGrade(data));
		console.log(status);
	};

	return (
		<Modal
			open={true}
			centered
			title='Nouveau Grade'
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<div className='mt-5 flex flex-col gap-y-4 w-full'>
				<div>
					<div>
						<Form onFinish={onSubmit}>
							<div className='flex gap-3'>
								<div>
									<p className='mb-2'>
										Titre <span className='text-red-500'>*</span>
									</p>
									<Form.Item name='title'>
										<Input placeholder='Titre' type='text' size='large' />
									</Form.Item>
								</div>
								<div>
									<p className='mb-2'>
										Salaire de base <span className='text-red-500'>*</span>
									</p>
									<Form.Item name='baseSalary'>
										<Input placeholder='Ex : 100' type='number' size='large' />
									</Form.Item>
								</div>
							</div>
							<Form.Item
								label={
									<p className='mb-2'>
										Taux de rémunération <span className='text-red-500'>*</span>
									</p>
								}
								rules={[{ required: true, min: 1 }]}
							>
								<Form.Item
									name='alloc'
									className='mb-2 '
									rules={[{ required: true, min: 0 }]}
								>
									<Input
										type='number'
										addonBefore=','
										placeholder='Allocations familiales'
									/>
								</Form.Item>
								<Form.Item
									name='conge'
									className='mb-2 '
									rules={[{ required: true, min: 0 }]}
								>
									<Input
										type='number'
										addonBefore=','
										placeholder='Jours congé'
									/>
								</Form.Item>
								<Form.Item
									name='ferie'
									className='mb-2 '
									rules={[{ required: true, min: 0 }]}
								>
									<Input
										type='number'
										addonBefore=','
										placeholder='Jours feriés'
									/>
								</Form.Item>
								<Form.Item
									name='maladAcc'
									className='mb-2 '
									rules={[{ required: true, min: 0 }]}
								>
									<Input
										type='number'
										addonBefore=','
										placeholder='Jours maladie'
									/>
								</Form.Item>
								<Form.Item
									name='heureSupp'
									className='mb-2 '
									rules={[{ required: true, min: 0 }]}
								>
									<Input
										type='number'
										addonBefore=','
										placeholder='Heures suppl'
									/>
								</Form.Item>
							</Form.Item>
							<Form.Item name='folderIds'>
								<Select
									mode='multiple'
									placeholder='Sélectionner les élément du dossier'
									optionLabelProp='label'
								>
									{folderElements.map((el) => (
										<Select.Option key={el.id} value={el.id} label={el.title}>
											{el.title?.toUpperCase()}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item>
								<div className='flex justify-end w-full gap-4'>
									<Button
										size='middle'
										onClick={() => handlers.close!('NEW_GRADE')}
									>
										Annuler
									</Button>
									<Button htmlType='submit' loading={status.isLoading}>
										Soumettre
									</Button>
								</div>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default CreateGrade;
