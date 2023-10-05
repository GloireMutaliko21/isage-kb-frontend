'use client';
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import useArticleUnity from '@/hooks/useArticleUnity';
import useCategory from '@/hooks/useCategory';
import { updateArticle } from '@/redux/article/article.slice';

const UpdateArticle = ({ handlers }: { handlers: ModalsHandlers }) => {
	const dispatch = useAppDispatch();
	const { status, selectedArticle } = useAppSelector((state) => state.articles);
	const { unities } = useArticleUnity();
	const { categories } = useCategory();

	const onSubmit = (values: any) => {
		const { libelle, stockAlert, unityId, categoryId } = values;
		dispatch(
			updateArticle({
				id: selectedArticle?.id,
				libelle,
				stockAlert,
				unityId,
				categoryId,
				dispatch,
			})
		);
		console.log(values);
	};
	return (
		<Modal
			open={true}
			centered
			title={`Modification ${selectedArticle?.libelle}`}
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form onFinish={onSubmit} layout='vertical'>
				<Form.Item
					name='libelle'
					label='Libellé'
					style={{ marginBottom: '6px' }}
				>
					<Input size='small' />
				</Form.Item>
				<Form.Item
					name='stockAlert'
					label='Stock alerte'
					style={{ marginBottom: '6px' }}
				>
					<InputNumber size='small' className='!w-full' />
				</Form.Item>
				<Form.Item
					name='categoryId'
					label='Catégorie'
					style={{ marginBottom: '6px' }}
				>
					<Select
						placeholder='Sélectionner une catégorie'
						optionLabelProp='label'
						options={categories.map((cat) => ({
							value: cat.id,
							label: cat.libelle,
						}))}
						size='small'
					/>
				</Form.Item>
				<Form.Item name='unityId' label='Unité de mesure'>
					<Select
						placeholder='Sélectionner une unité'
						optionLabelProp='label'
						options={unities.map((unity) => ({
							value: unity.id,
							label: unity.libelle,
						}))}
						size='small'
					/>
				</Form.Item>
				<Form.Item style={{ marginBottom: '6px' }}>
					<div className='flex justify-end w-full gap-4'>
						<Button
							size='middle'
							onClick={() => handlers.close!('UPDATE_ARTICLE')}
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

export default UpdateArticle;
