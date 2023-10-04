'use client';
import React from 'react';
import { Tabs, type TabsProps } from 'antd';
import PageHeader from '@/components/global/PageHeader';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';
import Articles from '@/components/patrimoine/articles/Articles';
import ArticlesByCateg from '@/components/patrimoine/articles/ArticlesByCateg';
import Unstocked from '@/components/patrimoine/articles/Unstocked';

const Page = () => {
	const dispatch = useAppDispatch();

	const CreateArticleButton = () => {
		return (
			<div className=''>
				<button
					onClick={() => dispatch(openModal({ modal_ID: 'NEW_ARTICLE' }))}
				>
					Ajouter un article
				</button>
			</div>
		);
	};

	const tabsItems: TabsProps['items'] = [
		{
			key: '1',
			label: 'Liste articles',
			children: <Articles />,
		},
		{
			key: '2',
			label: 'Articles par catégorie',
			children: <ArticlesByCateg />,
		},
		{
			key: '3',
			label: 'Articles en rupture',
			children: <Unstocked />,
		},
	];

	return (
		<main className='flex flex-col h-full'>
			<PageHeader
				title='Gestion des articles'
				actionButton={<CreateArticleButton />}
			/>
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
					<Tabs defaultActiveKey='1' size='small' items={tabsItems} />
				</div>
			</section>
		</main>
	);
};

export default Page;
