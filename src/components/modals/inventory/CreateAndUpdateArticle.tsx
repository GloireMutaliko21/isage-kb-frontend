'use client';
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import useArticleUnity from '@/hooks/useArticleUnity';
import useCategory from '@/hooks/useCategory';
import { createArticle, updateArticle } from '@/redux/article/article.slice';

const CreateAndUpdateArticle = ({ handlers }: { handlers: ModalsHandlers }) => {
	const dispatch = useAppDispatch();
	const { status, selectedArticle } = useAppSelector((state) => state.articles);
	const { modal_ID } = useAppSelector((state) => state.modal);
	const { unities } = useArticleUnity();
	const { categories } = useCategory();

	const onSubmit = (values: any) => {
		dispatch(createArticle({ ...values, dispatch }));
	};

	const onSubmitUpdate = (values: any) => {
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
	};

	return (
		<Modal
			open={true}
			centered
			title={
				modal_ID == 'NEW_ARTICLE'
					? 'Création article'
					: `Modification ${selectedArticle?.libelle}`
			}
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form
				onFinish={modal_ID == 'NEW_ARTICLE' ? onSubmit : onSubmitUpdate}
				layout='vertical'
			>
				<Form.Item
					name='libelle'
					label='Libellé'
					style={{ marginBottom: '6px' }}
					rules={[{ required: modal_ID == 'NEW_ARTICLE' }]}
				>
					<Input size='small' />
				</Form.Item>
				<Form.Item
					name='stockAlert'
					label='Stock alerte'
					style={{ marginBottom: '6px' }}
					rules={[{ required: modal_ID == 'NEW_ARTICLE' }]}
				>
					<InputNumber size='small' className='!w-full' />
				</Form.Item>
				<Form.Item
					name='categoryId'
					label='Catégorie'
					style={{ marginBottom: '6px' }}
					rules={[{ required: modal_ID == 'NEW_ARTICLE' }]}
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
				<Form.Item
					name='unityId'
					label='Unité de mesure'
					rules={[{ required: modal_ID == 'NEW_ARTICLE' }]}
				>
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
							onClick={() =>
								handlers.close!(
									modal_ID == 'NEW_ARTICLE' ? 'NEW_ARTICLE' : 'UPDATE_ARTICLE'
								)
							}
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

export default CreateAndUpdateArticle;
