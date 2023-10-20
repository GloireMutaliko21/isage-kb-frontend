import {
	Button,
	DatePicker,
	Drawer,
	Form,
	Input,
	InputNumber,
	Select,
} from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { createOperation } from '@/redux/inventaire/inventaire.slice';
import { useAppSelector } from '@/hooks/useAppSelector';
import useArticles from '@/hooks/useArticles';

const CreateOperation = ({
	openDrawer,
	setOpenDrawer,
}: {
	openDrawer: any;
	setOpenDrawer: any;
}) => {
	const onClose = () => {
		setOpenDrawer(false);
	};

	const dispatch = useAppDispatch();
	const { status } = useAppSelector((state) => state.inventaire);
	const { articles } = useArticles();
	const onSubmit = (values: any) => {
		dispatch(createOperation({ ...values }));
	};

	return (
		<Drawer
			placement='right'
			onClose={onClose}
			open={openDrawer}
			title={<p className='!font-bold text-xl'>Nouvelle opération</p>}
			footer={null}
		>
			<Form onFinish={onSubmit} layout='vertical'>
				<Form.Item
					name='typeOp'
					label='Opération'
					style={{ marginBottom: '6px' }}
					rules={[{ required: true }]}
				>
					<Select
						placeholder='Choisir le type'
						size='small'
						optionLabelProp='label'
						options={[
							{ label: 'Entrée', value: 'entry' },
							{ label: 'Sortie', value: 'out' },
						]}
					/>
				</Form.Item>
				<Form.Item
					name='articleId'
					label='Article'
					rules={[{ required: true, message: '' }]}
					style={{ marginBottom: '6px' }}
				>
					<Select
						placeholder='Sélectionner article'
						optionLabelProp='label'
						showSearch
						filterOption={(input, option) =>
							(option?.label ?? '').includes(input) ||
							(option?.label ?? '').toLowerCase().includes(input) ||
							(option?.label ?? '').toUpperCase().includes(input)
						}
						options={articles.map((art) => ({
							value: art.id,
							label: art.libelle,
						}))}
						size='small'
					/>
				</Form.Item>
				<Form.Item
					name='qty'
					label='Quantité'
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
					name='libelle'
					label='Libellé'
					style={{ marginBottom: '6px' }}
					rules={[{ required: true }]}
				>
					<Input size='small' placeholder='Motif opération' />
				</Form.Item>
				<Form.Item name='dateOp' label='Date' rules={[{ required: true }]}>
					<DatePicker
						size='small'
						placeholder='Sélectionner la date'
						className='!w-full'
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

export default CreateOperation;
