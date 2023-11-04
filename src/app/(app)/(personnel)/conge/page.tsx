'use client';
import PageHeader from '@/components/global/PageHeader';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getOwnConges, requestConge } from '@/redux/conge/conge.slice';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';
import { frenchFormattedDate } from '@/utils/dates';
import { Button, Table, Tag } from 'antd';
import React, { useEffect } from 'react';

const Page = () => {
	const { leaves, status } = useAppSelector((state) => state.conges);
	const RequestAttendencyButton = () => {
		const dispatch = useAppDispatch();
		return (
			<div className=''>
				<Button
					loading={status.isError}
					className='!border-none !m-0 !text-white'
					onClick={() => dispatch(requestConge())}
				>
					Demander un congé
				</Button>
			</div>
		);
	};
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getOwnConges());
	}, [dispatch]);

	return (
		<main className='flex flex-col h-full'>
			<PageHeader
				title='Gestion des congés'
				actionButton={<RequestAttendencyButton />}
			/>
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					<Table
						size='small'
						pagination={{ hideOnSinglePage: true, pageSize: 10 }}
						dataSource={leaves}
						loading={status.isLoading}
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
									<p>{frenchFormattedDate(record.startDate)}</p>
								),
							},
							{
								key: 'endDate',
								dataIndex: 'endDate',
								title: 'Date de fin',
								ellipsis: true,
								render: (_, record, __) => (
									<p>{frenchFormattedDate(record.endDate)}</p>
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
								title: 'Approuvé le',
								ellipsis: true,
								render: (_, record, __) => (
									<p>{frenchFormattedDate(record.updatedAt)}</p>
								),
							},
						]}
						components={{
							header: {
								cell: ({
									children,
									...rest
								}: {
									children: React.ReactNode;
								}) => (
									<td {...rest} className='!p-2 !text-slate-500 !font-bold'>
										{children}
									</td>
								),
							},
						}}
					/>
				</div>
			</section>
		</main>
	);
};

export default Page;
