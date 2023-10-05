'use client';
import {
	Button,
	Divider,
	Form,
	Input,
	InputNumber,
	Modal,
	Select,
	Space,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import useArticleUnity from '@/hooks/useArticleUnity';
import useCategory from '@/hooks/useCategory';
import { createArticle, updateArticle } from '@/redux/article/article.slice';
import { createCategory } from '@/redux/property-category/category.slice';
import { createUnity } from '@/redux/article-unity/article-unity.slice';

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
						size='small'
						dropdownRender={(cat) => (
							<>
								{cat}
								<Divider style={{ margin: '8px 0' }} />
								<Form onFinish={(values) => dispatch(createCategory(values))}>
									<Space style={{ padding: '0 8px 4px' }}>
										<Form.Item name='libelle' style={{ marginBottom: '2px' }}>
											<Input placeholder='Libellé catégorie' size='small' />
										</Form.Item>
										<Form.Item style={{ marginBottom: '2px' }}>
											<Button
												htmlType='submit'
												icon={<PlusOutlined />}
												size='small'
											>
												Ajouter
											</Button>
										</Form.Item>
									</Space>
								</Form>
							</>
						)}
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
						options={categories.map((cat) => ({
							value: cat.id,
							label: cat.libelle,
						}))}
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
						dropdownRender={(cat) => (
							<>
								{cat}
								<Divider style={{ margin: '8px 0' }} />
								<Form onFinish={(values) => dispatch(createUnity(values))}>
									<Space style={{ padding: '0 8px 4px' }}>
										<Form.Item name='libelle' style={{ marginBottom: '2px' }}>
											<Input placeholder='Libellé unité' size='small' />
										</Form.Item>
										<Form.Item style={{ marginBottom: '2px' }}>
											<Button
												htmlType='submit'
												icon={<PlusOutlined />}
												size='small'
											>
												Ajouter
											</Button>
										</Form.Item>
									</Space>
								</Form>
							</>
						)}
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
