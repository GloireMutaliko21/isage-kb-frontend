'use client';
import { useState } from 'react';
import { Select, Table, Tag } from 'antd';
import { PiDownloadSimpleFill } from 'react-icons/pi';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import useOrder from '@/hooks/useOrder';
import { cancelOrder, closeOrder } from '@/redux/order/order.slice';
import { generateOrderList } from '@/docs/orders';

const OrderList = () => {
	const dispatch = useAppDispatch();
	const [filtered, setFiltered] = useState<string[]>([]);
	const { orders } = useOrder();

	const onGenerateList = async () => {
		if (!orders) return;
		await generateOrderList(orders);
	};

	return (
		<main className='flex flex-col h-full'>
			<div className='flex justify-between gap-5 mb-5'>
				<button
					onClick={onGenerateList}
					className='flex gap-3 items-center rounded-md hover:shadow-lg duration-300 bg-secondary-700 px-4 py-2 text-white'
				>
					<PiDownloadSimpleFill className='text-xl' />
					<span>Exporter la liste</span>
				</button>
				<Select
					onChange={(v) => setFiltered(v)}
					value={filtered}
					mode='multiple'
					placeholder='Filtrer'
					optionLabelProp='label'
					placement='topRight'
					options={[
						{ label: 'Annulées', value: 'canceled' },
						{ label: 'En cours', value: 'tobuy' },
					]}
					className='w-60'
				/>
			</div>
			<Table
				size='small'
				pagination={{ hideOnSinglePage: true, pageSize: 12 }}
				dataSource={orders}
				columns={[
					{
						key: 'id',
						dataIndex: 'id',
						title: 'N°',
						render: (_, __, index) => index + 1,
						width: '3rem',
					},
					{
						key: 'article',
						dataIndex: 'article',
						title: 'Article',
						render: (_, { article }, __) => article?.libelle,
						width: '150px',
						filteredValue: [...filtered],
						onFilter: (value, order) => {
							return filtered.includes(order.status!);
						},
					},
					{
						key: 'qty',
						dataIndex: 'qty',
						title: 'Quantité commandée',
						ellipsis: true,
						render: (_, { qty, article }, __) => (
							<Tag color='blue'>
								{qty} {article?.unity?.libelle}
							</Tag>
						),
					},
					{
						key: 'qtyExist',
						dataIndex: 'qtyExist',
						title: 'Quantité actuelle',
						ellipsis: true,
						render: (_, { article }, __) => (
							<Tag color='purple'>
								{article?.qty} {article?.unity?.libelle}
							</Tag>
						),
					},
					{
						key: 'status',
						dataIndex: 'status',
						title: 'Statut',
						render: (_, { status }, __) => <Tag color='cyan'>{status}</Tag>,
						align: 'center',
						width: '85px',
					},
					{
						key: 'action',
						dataIndex: 'action',
						width: '160px',
						title: '',
						render: (_, { id, status }, __) => (
							<div className='px-3 flex gap-2 items-stretch'>
								{status == 'tobuy' && (
									<button
										onClick={() => {
											dispatch(cancelOrder(id));
										}}
										className='border border-red-500 text-red-500 flex justify-center hover:text-red-700 py-px px-4'
									>
										Annuler
									</button>
								)}
								{status == 'canceled' && (
									<button
										onClick={() => {
											dispatch(closeOrder(id));
										}}
										className='text-white flex justify-center bg-cyan-700 py-px px-4'
									>
										Fermer
									</button>
								)}
							</div>
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
		</main>
	);
};

export default OrderList;
