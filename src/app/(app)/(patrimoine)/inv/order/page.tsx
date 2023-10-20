import { Tabs, type TabsProps } from 'antd';
import PageHeader from '@/components/global/PageHeader';
import OrderList from '@/components/patrimoine/order/OrderList';
import ClosedOrders from '@/components/patrimoine/order/ClosedOrders';

const Orders = () => {
	const tabsItems: TabsProps['items'] = [
		{
			key: '1',
			label: 'Liste commandes',
			children: <OrderList />,
		},
		{
			key: '2',
			label: 'Commades clôturées',
			children: <ClosedOrders />,
		},
	];

	return (
		<main className='flex flex-col h-full'>
			<PageHeader title='Commandes articles' />
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					<Tabs defaultActiveKey='1' size='small' items={tabsItems} />
				</div>
			</section>
		</main>
	);
};

export default Orders;
