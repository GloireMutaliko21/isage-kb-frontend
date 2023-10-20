import {
	Button,
	Divider,
	Drawer,
	Form,
	Input,
	InputNumber,
	Select,
	Space,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import useCategory from '@/hooks/useCategory';
import useServiceSection from '@/hooks/useServiceSection';
import { createImmob } from '@/redux/immobilisations/immob.slice';
import { createCategory } from '@/redux/property-category/category.slice';
import { createService } from '@/redux/service-section/section.slice';

const CreateImmob = ({
	openDrawer,
	setOpenDrawer,
}: {
	openDrawer: any;
	setOpenDrawer: any;
}) => {
	const onClose = () => {
		setOpenDrawer(false);
	};

	const { categories } = useCategory();
	const { services } = useServiceSection();

	const dispatch = useAppDispatch();
	const { status } = useAppSelector((state) => state.immobs);
	const onSubmit = (values: any) => {
		dispatch(createImmob({ ...values }));
	};
	return (
		<Drawer
			placement='right'
			onClose={onClose}
			open={openDrawer}
			title={<p className='!font-bold text-xl'>Nouvelle immobilisation</p>}
			footer={null}
		>
			<Form onFinish={onSubmit} layout='vertical'>
				<Form.Item
					name='libelle'
					label='Libellé'
					style={{ marginBottom: '6px' }}
					rules={[{ required: true }]}
				>
					<Input size='small' placeholder='Motif opération' />
				</Form.Item>
				<Form.Item
					name='valDepart'
					label="Valeur d'acquisition"
					style={{ marginBottom: '6px' }}
					rules={[{ required: true }]}
				>
					<InputNumber
						size='small'
						className='!w-full'
						placeholder='Quantité'
					/>
				</Form.Item>
				<Form.Item
					name='duration'
					label='Durée de vie'
					style={{ marginBottom: '6px' }}
					rules={[{ required: true }]}
				>
					<InputNumber
						size='small'
						className='!w-full'
						placeholder='Quantité'
					/>
				</Form.Item>
				<Form.Item
					name='categoryId'
					label='Catégorie'
					style={{ marginBottom: '6px' }}
					rules={[{ required: true }]}
				>
					<Select
						placeholder='Sélectionner une catégorie'
						optionLabelProp='label'
						size='small'
						placement='topRight'
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
					name='serviceId'
					label="Service  d'affectation"
					style={{ marginBottom: '6px' }}
					rules={[{ required: true }]}
				>
					<Select
						placeholder='Sélectionner un service'
						optionLabelProp='label'
						size='small'
						placement='topRight'
						dropdownRender={(service) => (
							<>
								{service}
								<Divider style={{ margin: '8px 0' }} />
								<Form onFinish={(values) => dispatch(createService(values))}>
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
						options={services.map((service) => ({
							value: service.id,
							label: service.libelle,
						}))}
					/>
				</Form.Item>

				<Form.Item style={{ marginBottom: '6px' }}>
					<div className='flex justify-end w-full gap-4'>
						<Button size='middle' onClick={onClose}>
							Annuler
						</Button>
						<Button htmlType='submit' loading={status.isLoading}>
							Enregistrer
						</Button>
					</div>
				</Form.Item>
			</Form>
		</Drawer>
	);
};

export default CreateImmob;
