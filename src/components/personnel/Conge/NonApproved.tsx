import React, { useEffect } from 'react';
import { Table, Tag } from 'antd';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getUnApproved } from '@/redux/conge/conge.slice';
import { useAppSelector } from '@/hooks/useAppSelector';
import { frenchFormattedDate } from '@/utils/dates';

const NonApproved = () => {
	const { unApproved } = useAppSelector((state) => state.conges);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getUnApproved());
	}, []);
	return (
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
						<p>{record.approved ? frenchFormattedDate(record.endDate) : '-'}</p>
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
						<button className='border border-primary-600 text-primary-600 flex justify-center hover:text-primary-800 py-px px-5'>
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
	);
};

export default NonApproved;
