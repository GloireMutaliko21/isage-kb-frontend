'use client';
import { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import PageHeader from '@/components/global/PageHeader';
import Today from '@/components/patrimoine/operations/Today';
import Week from '@/components/patrimoine/operations/Week';
import ByArticle from '@/components/patrimoine/operations/ByArticle';
import Historic from '@/components/patrimoine/operations/Historic';
import CreateOperation from '@/components/patrimoine/operations/CreateOperation';

const Page = () => {
	const [openDrawer, setopenDrawer] = useState(false);
	const CreateOperationButton = () => {
		return (
			<div className=''>
				<button onClick={() => setopenDrawer(true)}>Nouvelle opération</button>
			</div>
		);
	};

	const tabsItems: TabsProps['items'] = [
		{
			key: '1',
			label: "Fiche aujourd'hui",
			children: <Today />,
		},
		{
			key: '2',
			label: 'Fiche semaine',
			children: <Week />,
		},
		{
			key: '3',
			label: 'Fiche par article',
			children: <ByArticle />,
		},
		{
			key: '4',
			label: 'Historique',
			children: <Historic />,
		},
	];

	return (
		<main className='flex flex-col h-full'>
			<PageHeader
				title='Opérations rapports'
				actionButton={<CreateOperationButton />}
			/>
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					<Tabs defaultActiveKey='1' size='small' items={tabsItems} />
				</div>
				<CreateOperation
					openDrawer={openDrawer}
					setOpenDrawer={setopenDrawer}
				/>
			</section>
		</main>
	);
};

export default Page;
