'use client';
import { Table, Tag } from 'antd';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import useOrder from '@/hooks/useOrder';
import { cancelOrder, closeOrder } from '@/redux/order/order.slice';

const ClosedOrders = () => {
	const dispatch = useAppDispatch();
	const { closedOrder } = useOrder();

	return (
		<main className='flex flex-col h-full'>
			<Table
				size='small'
				pagination={{ hideOnSinglePage: true, pageSize: 12 }}
				dataSource={closedOrder}
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

export default ClosedOrders;
