'use client';
import { useState } from 'react';
import { Select, Table, Tag } from 'antd';
import Link from 'next/link';
import PageHeader from '@/components/global/PageHeader';
import useSocialCase from '@/hooks/useSocialCase';
import { frenchFormattedDate } from '@/utils/dates';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
	closeSocialCase,
	publishSocialCase,
} from '@/redux/social-case/social-case.slice';

const Page = () => {
	const dispatch = useAppDispatch();
	const [filtered, setFiltered] = useState<string[]>([]);
	const { socialCases } = useSocialCase();
	return (
		<main className='flex flex-col h-full'>
			<PageHeader title='Gestion des cas sociaux' actionButton={''} />
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					<div className='flex justify-end gap-5 mb-5'>
						<Select
							onChange={(v) => setFiltered(v)}
							value={filtered}
							mode='multiple'
							placeholder='Filtrer'
							optionLabelProp='label'
							placement='topRight'
							options={[
								{ label: 'Publiés', value: 'published' },
								{ label: 'Non publiés', value: 'unPublished' },
								{ label: 'En cours', value: 'inProgress' },
								{ label: 'Clôturés', value: 'closed' },
							]}
							className='w-96'
						/>
					</div>
					<Table
						size='small'
						pagination={{ hideOnSinglePage: true, pageSize: 12 }}
						dataSource={socialCases}
						columns={[
							{
								key: 'id',
								dataIndex: 'id',
								title: 'N°',
								render: (_, __, index) => index + 1,
								width: '3rem',
							},
							{
								key: 'agent',
								dataIndex: 'agent',
								title: 'Agent concerné',
								render: (_, { agent }, __) => agent?.names,
								width: '150px',
								filteredValue: [...filtered],
								onFilter: (value, soccase) => {
									return (
										filtered.includes(soccase.validity) ||
										filtered.includes(soccase.status)
									);
								},
							},
							{
								key: 'description',
								dataIndex: 'description',
								title: 'Description',
								ellipsis: true,
							},
							{
								key: 'endDate',
								dataIndex: 'endDate',
								title: 'Date de fin',
								render: (_, { endDate }, __) => frenchFormattedDate(endDate),
								align: 'center',
								width: '130px',
							},
							{
								key: 'status',
								dataIndex: 'status',
								title: 'Statut',
								render: (_, { status }, __) => (
									<Tag color={`${status == 'published' ? 'blue' : 'error'}`}>
										{status}
									</Tag>
								),
								align: 'center',
								width: '85px',
							},
							{
								key: 'validity',
								dataIndex: 'validity',
								title: 'Validité',
								render: (_, { validity }, __) => (
									<Tag
										color={`${validity == 'inProgress' ? 'green' : 'error'}`}
									>
										{validity}
									</Tag>
								),
								align: 'center',
								width: '80px',
							},
							{
								key: 'action',
								dataIndex: 'action',
								width: '160px',
								title: '',
								render: (_, { id, status, validity }, __) => (
									<div className='px-3 flex gap-2 items-stretch'>
										<Link
											href={`./soccas/${id}`}
											className='border border-secondary-800 flex justify-center items-center text-secondary-800 hover:text-secondary-600 p-px px-4'
										>
											Plus
										</Link>
										{status == 'published' && validity == 'inProgress' && (
											<button
												onClick={() => {
													dispatch(closeSocialCase(id));
												}}
												className='border border-red-500 text-red-500 flex justify-center hover:text-red-700 py-px px-4'
											>
												Fermer
											</button>
										)}
										{status == 'unPublished' && validity == 'inProgress' && (
											<button
												onClick={() => {
													dispatch(publishSocialCase(id));
												}}
												className='text-white flex justify-center bg-cyan-700 py-px px-4'
											>
												Publier
											</button>
										)}
									</div>
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
