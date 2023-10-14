'use client';
import { Tabs, type TabsProps } from 'antd';

import PageHeader from '@/components/global/PageHeader';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';
import Unities from '@/components/patrimoine/unity-category/Unities';
import Categories from '@/components/patrimoine/unity-category/Categories';

const UnityAndCategory = () => {
	const dispatch = useAppDispatch();

	const CreateCategory = () => {
		return (
			<div className=''>
				<button
					className='bg-secondary-600 p-2 text-white rounded-md text-sm'
					onClick={() => dispatch(openModal({ modal_ID: 'NEW_CATEGORY' }))}
				>
					Nouvelle catégorie
				</button>
			</div>
		);
	};

	const CreateUnity = () => {
		return (
			<div className=''>
				<button
					className='bg-secondary-600 p-2 text-white rounded-md text-sm'
					onClick={() => dispatch(openModal({ modal_ID: 'NEW_UNITY' }))}
				>
					Nouvelle unité
				</button>
			</div>
		);
	};

	const tabsItems: TabsProps['items'] = [
		{
			key: '1',
			label: 'Liste catégories',
			children: <Categories />,
		},
		{
			key: '2',
			label: 'Liste unités',
			children: <Unities />,
		},
	];

	return (
		<main className='flex flex-col h-full'>
			<div className='flex w-full justify-between items-center pr-5 border-b'>
				<PageHeader title='Gestion des catégories et unités' />
				<div className='flex gap-4'>
					<CreateCategory />
					<CreateUnity />
				</div>
			</div>
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					<Tabs defaultActiveKey='1' size='small' items={tabsItems} />
				</div>
			</section>
		</main>
	);
};

export default UnityAndCategory;
