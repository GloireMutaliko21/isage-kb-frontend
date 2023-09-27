import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Modal, Table, Tag } from 'antd';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { approveConge, getUnApproved } from '@/redux/conge/conge.slice';
import { useAppSelector } from '@/hooks/useAppSelector';
import { frenchFormattedDate } from '@/utils/dates';

const { RangePicker } = DatePicker;

const NonApproved = () => {
	const { unApproved, status } = useAppSelector((state) => state.conges);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getUnApproved());
	}, [dispatch]);
	const [approveData, setApproveData] = useState({
		open: false,
		congeId: '',
		agentId: '',
	});
	const onSubmit = (values: any) => {
		dispatch(
			approveConge({
				id: approveData.congeId,
				agentId: approveData.agentId,
				startDate: values.date[0].$d,
				endDate: values.date[1].$d,
			})
		);
		setApproveData({ ...approveData, open: false });
	};
	return (
		<>
			<Table
				size='small'
				pagination={{ hideOnSinglePage: true, pageSize: 10 }}
				dataSource={unApproved}
				columns={[
					{
						key: 'id',
						dataIndex: 'id',
						title: 'N°',
						render: (_, __, index) => index + 1,
						width: '3rem',
					},
					{
						key: 'name',
						dataIndex: 'name',
						title: 'Agent',
						ellipsis: true,
						render: (_, record, __) => <p>{record.agent?.names}</p>,
					},
					{
						key: 'startDate',
						dataIndex: 'startDate',
						title: 'Date de début',
						ellipsis: true,
						render: (_, record, __) => (
							<p>
								{record.approved ? frenchFormattedDate(record.startDate) : '-'}
							</p>
						),
					},
					{
						key: 'endDate',
						dataIndex: 'endDate',
						title: 'Date de fin',
						ellipsis: true,
						render: (_, record, __) => (
							<p>
								{record.approved ? frenchFormattedDate(record.endDate) : '-'}
							</p>
						),
					},
					{
						key: 'approved',
						dataIndex: 'approved',
						title: 'Approuvé',
						ellipsis: true,
						align: 'center',
						width: '5rem',
						render: (_, record, __) => (
							<Tag color={`${record.approved ? 'blue' : 'error'}`}>
								{record.approved ? 'Oui' : 'Non'}
							</Tag>
						),
					},
					{
						key: 'requested',
						dataIndex: 'createdAt',
						title: 'Créé/demandé le',
						ellipsis: true,
						render: (_, record, __) => (
							<p>{frenchFormattedDate(record.createdAt)}</p>
						),
					},
					{
						key: 'approved',
						dataIndex: 'updatedAt',
						title: '',
						width: '120px',
						render: (_, record, __) => (
							<button
								onClick={() =>
									setApproveData({
										agentId: record.agent?.id!,
										congeId: record.id,
										open: true,
									})
								}
								className='border border-primary-600 text-primary-600 flex justify-center hover:text-primary-800 py-px px-5'
							>
								Approuver
							</button>
						),
					},
				]}
				components={{
					header: {
						cell: ({ children, ...rest }: { children: React.ReactNode }) => (
							<td {...rest} className='!p-2 !text-slate-500 !font-bold'>
								{children}
							</td>
						),
					},
				}}
			/>
			<Modal
				open={approveData.open}
				onCancel={() => setApproveData({ ...approveData, open: false })}
				centered
				title='Approver congé'
				footer={null}
			>
				<Form layout='vertical' onFinish={onSubmit}>
					<Form.Item
						name='date'
						label='Date de début et de fin'
						rules={[{ required: true, message: '' }]}
						style={{ marginBottom: '6px' }}
					>
						<RangePicker size='small' format={'DD-MM-YYYY'} />
					</Form.Item>

					<Form.Item style={{ marginBottom: '6px', marginTop: '20px' }}>
						<div className='flex justify-end w-full gap-4'>
							<Button
								size='middle'
								onClick={() => setApproveData({ ...approveData, open: false })}
							>
								Annuler
							</Button>
							<Button htmlType='submit' loading={status.isLoading}>
								Approuver
							</Button>
						</div>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default NonApproved;
