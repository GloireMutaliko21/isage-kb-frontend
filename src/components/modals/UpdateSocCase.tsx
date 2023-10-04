'use client';
import { Button, DatePicker, Form, Input, Modal } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { updateSocialCase } from '@/redux/social-case/social-case.slice';

const UpdateSocCase = ({ handlers }: { handlers: ModalsHandlers }) => {
	const dispatch = useAppDispatch();

	const { status, selectedSocialCase } = useAppSelector(
		(state) => state.socialCase
	);
	const onSubmit = (values: any) => {
		const { description, endDate } = values;
		dispatch(
			updateSocialCase({
				description,
				endDate: new Date(endDate.$d),
				id: selectedSocialCase?.id!,
				dispatch,
			})
		);
	};
	return (
		<Modal
			open={true}
			centered
			title='Modification cas social'
			footer={null}
			onCancel={() => handlers.close!(handlers.id!)}
		>
			<Form onFinish={onSubmit} layout='vertical'>
				<Form.Item
					name='description'
					label='Description'
					rules={[
						{
							required: true,
							type: 'string',
							min: 9,
							message: '',
						},
					]}
					style={{ marginBottom: '6px' }}
				>
					<Input.TextArea rows={4} size='small' style={{ resize: 'none' }} />
				</Form.Item>
				<Form.Item
					name='endDate'
					label='Date de clôture'
					rules={[{ required: true, type: 'date', message: '' }]}
				>
					<DatePicker
						className='!w-full'
						size='small'
						placeholder='Sélectionner la date'
					/>
				</Form.Item>
				<Form.Item style={{ marginBottom: '6px' }}>
					<div className='flex justify-end w-full gap-4'>
						<Button
							size='middle'
							onClick={() => handlers.close!('UPDATE_SOCCASE')}
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

export default UpdateSocCase;
