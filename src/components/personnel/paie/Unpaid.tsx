import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
	getUnpaidAgents,
	registerPaySlip,
} from '@/redux/remuneration/remuneration.slice';
import { useAppSelector } from '@/hooks/useAppSelector';

const Unpaid = () => {
	const dispatch = useAppDispatch();
	const { params, slipList } = useAppSelector((state) => state.remuneration);
	const { month, year } = params;
	const unpaid = slipList.unpaid;
	useEffect(() => {
		dispatch(
			getUnpaidAgents({
				month: month ?? new Date().getMonth() + 1,
				year: year ?? new Date().getFullYear(),
			})
		);
	}, [year, month, dispatch]);

	return (
		<div>
			<Table
				size='small'
				pagination={{ hideOnSinglePage: true, pageSize: 12 }}
				dataSource={unpaid}
				columns={[
					{
						key: 'id',
						dataIndex: 'id',
						title: 'N°',
						render: (_, __, index) => index + 1,
						width: '3rem',
					},
					{
						key: 'names',
						dataIndex: 'names',
						title: 'Noms',
						ellipsis: true,
						width: '10rem',
					},
					{
						key: 'primes',
						dataIndex: 'primes',
						title: 'Primes($)',
						render: (_, user, __) =>
							user.primes?.reduce(
								(a, c) => a + parseInt(c.amount.toString()),
								0
							),
						align: 'center',
						ellipsis: true,
					},
					{
						key: 'suppHours',
						dataIndex: 'suppHours',
						title: 'H. Supp(h)',
						render: (_, user, __) =>
							user.suppHours?.reduce(
								(a, c) => a + parseInt(c.number.toString()),
								0
							),
						align: 'center',
						ellipsis: true,
					},
					{
						key: 'remJMaladAccs',
						dataIndex: 'remJMaladAccs',
						title: 'J/Maladie (j)',
						ellipsis: true,
						render: (_, user, __) =>
							user.remJMaladAccs?.reduce(
								(a, c) => a + parseInt(c.days.toString()),
								0
							),
						align: 'center',
					},
					{
						key: 'remJoursConges',
						dataIndex: 'remJoursConges',
						title: 'J/Congé (j)',
						ellipsis: true,
						render: (_, user, __) =>
							user.remJoursConges?.reduce(
								(a, c) => a + parseInt(c.days.toString()),
								0
							),
						align: 'center',
					},
					{
						key: 'remJoursFerie',
						dataIndex: 'remJoursFerie',
						title: 'J/Fériés (j)',
						ellipsis: true,
						render: (_, user, __) =>
							user.remJoursFerie?.reduce(
								(a, c) => a + parseInt(c.days.toString()),
								0
							),
						align: 'center',
					},
					{
						key: 'salaryDeductions',
						dataIndex: 'salaryDeductions',
						title: 'Retenus ($)',
						ellipsis: true,
						render: (_, user, __) =>
							user.salaryDeductions?.reduce(
								(a, c) => a + parseInt(c.amount.toString()),
								0
							),
						align: 'center',
					},
					{
						key: 'familyAllocations',
						dataIndex: 'familyAllocations',
						title: 'Alloc(j)',
						ellipsis: true,
						render: (_, user, __) =>
							user.familyAllocations?.reduce(
								(a, c) => a + parseInt(c.days.toString()),
								0
							),
						align: 'center',
					},
					{
						key: 'action',
						dataIndex: 'action',
						width: '120px',
						title: '',
						render: (_, user, __) => (
							<button
								onClick={() => {
									dispatch(
										registerPaySlip({
											agentId: user.id!,
											month: month!,
											year: year!,
										})
									);

									dispatch(
										getUnpaidAgents({
											month: month!,
											year: year!,
										})
									);
								}}
								className='border border-primary-600 text-primary-600 flex justify-center hover:text-primary-800 py-px px-4'
							>
								Payer
							</button>
						),
						ellipsis: true,
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
		</div>
	);
};

export default Unpaid;
