'use client';
import { useEffect } from 'react';
import Link from 'next/link';

import PageHeader from '@/components/global/PageHeader';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { DatePicker, Table } from 'antd';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getMonthlyAgent } from '@/redux/attendency/attendency.slice';
import { formattedTime, frenchFormattedDate } from '@/utils/dates';

const Attendency = ({ params }: { params: { id: string } }) => {
	const dispatch = useAppDispatch();
	const { attendecies } = useAppSelector((state) => state.attendency);

	useEffect(() => {
		dispatch(
			getMonthlyAgent({
				id: params.id,
				month: new Date().getMonth() + 1,
				year: new Date().getFullYear(),
			})
		);
	}, []);

	const onChange = (date: any) => {
		if (date)
			dispatch(
				getMonthlyAgent({ id: params.id, month: date.$M + 1, year: date.$y })
			);
	};

	return (
		<main className='flex flex-col h-full'>
			<PageHeader
				title={`Présences mensuel de ${attendecies[0]?.agent?.names}`}
				actionButton={<Link href='.'>Retour</Link>}
			/>
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					<div className='flex justify-end mb-6'>
						<DatePicker onChange={onChange} picker='month' />
					</div>
					<Table
						size='small'
						pagination={{ hideOnSinglePage: true, pageSize: 10 }}
						dataSource={attendecies}
						columns={[
							{
								key: 'id',
								dataIndex: 'id',
								title: 'N°',
								render: (_, __, index) => index + 1,
								width: '3rem',
							},
							{
								key: 'date',
								dataIndex: 'createdAt',
								title: 'Date',
								ellipsis: true,
								render: (_, record, __) => (
									<p>{frenchFormattedDate(record.createdAt)}</p>
								),
							},
							{
								key: 'name',
								dataIndex: 'name',
								title: 'Agent',
								align: 'center',
								ellipsis: true,
								render: (_, record, __) => <p>{record.agent?.names}</p>,
							},
							{
								key: 'hour',
								dataIndex: 'hour',
								title: "Heure d'arrivée",
								ellipsis: true,
								align: 'center',
								render: (_, record, __) => (
									<p>{formattedTime(record.createdAt)}</p>
								),
							},
							{
								key: 'status',
								dataIndex: 'status',
								title: 'Statut',
								ellipsis: true,
								align: 'center',
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

export default Attendency;
