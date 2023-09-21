import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import useFolderElement from '@/hooks/useFolderElement';
import { updateGrade } from '@/redux/grade/grade.slice';
import { closeModal } from '@/redux/modalWindow/modalwindow.slice';
import { Button, Form, Modal, Select } from 'antd';

const UpdateGradeFolderIds = ({ handlers }: { handlers: ModalsHandlers }) => {
	const { folderElements } = useFolderElement();
	const dispatch = useAppDispatch();
	const { selectedGrade, status } = useAppSelector((state) => state.grade);
	const onSubmit = (values: any) => {
		dispatch(
			updateGrade({
				id: selectedGrade?.id!,
				folderIds: values.folderIds,
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
				<Form.Item
					name='folderIds'
					initialValue={[...selectedGrade?.folderIds!]}
				>
					<Select
						mode='multiple'
						// defaultValue={[...selectedGrade?.folderIds!]}
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
							onClick={() => handlers.close!('UPDATE_GRADE_FOLDERS')}
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

export default UpdateGradeFolderIds;
