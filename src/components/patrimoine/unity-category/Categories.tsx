'use client';
import React, { useState } from 'react';
import { Empty, Input, Table } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';
import { getCategoryById } from '@/redux/property-category/category.slice';
import useCategory from '@/hooks/useCategory';
import { frenchFormattedDate } from '@/utils/dates';

const Categories = () => {
	const [searchedText, setSearchedText] = useState('');

	const { categories } = useCategory();
	const dispatch = useAppDispatch();

	console.log(categories);

	const onUpdate = (id: string) => {
		dispatch(getCategoryById(id));
		dispatch(openModal({ modal_ID: 'UPDATE_CATEGORY' }));
	};

	const expandedRowRender = (data: Category) => {
		const columnsArticles = [
			{ title: 'Désignation', dataIndex: 'libelle', key: 'libelle' },
			{ title: 'Quantité', dataIndex: 'qty', key: 'qty' },
			{ title: 'Stock alerte', dataIndex: 'stockAlert', key: 'stockAlert' },
			{
				title: 'Unité de mesure',
				dataIndex: 'unity',
				key: 'unity',
				render: (_: any, art: Article, __: number) => (
					<p>{art.unity?.libelle}</p>
				),
			},
		];
		const columnsImmobs = [
			{ title: 'Désignation', dataIndex: 'libelle', key: 'libelle' },
			{ title: 'Durée', dataIndex: 'duration', key: 'duration' },
			{ title: 'Valeur de départ', dataIndex: 'valDepart', key: 'valDepart' },
			{ title: 'VNC', dataIndex: 'vnc', key: 'vnc' },
			{
				title: 'Date amortissement',
				dataIndex: 'amortissDate',
				key: 'amortissDate',
				render: (_: any, art: Immob, __: number) => (
					<p>{frenchFormattedDate(art.amortissDate)}</p>
				),
			},
			{
				title: 'Service',
				dataIndex: 'serv',
				key: 'serv',
				render: (_: any, art: Immob, __: number) => (
					<p>{art.service?.libelle}</p>
				),
			},
		];
		return (
			<div>
				{data.articles?.length! > 0 && (
					<div>
						<p className='my-2 flex justify-center font-semibold text-lg text-black'>
							Articles
						</p>
						<Table
							columns={columnsArticles}
							dataSource={data.articles}
							pagination={false}
							size='small'
						/>
					</div>
				)}
				{data.immobilisations?.length! > 0 && (
					<div>
						<p className='my-2 flex justify-center font-semibold text-lg text-black'>
							Immobilisations
						</p>
						<Table
							columns={columnsImmobs}
							dataSource={data.immobilisations}
							pagination={false}
							size='small'
						/>
					</div>
				)}
				{data.articles?.length! < 1 && data.immobilisations?.length! < 1! && (
					<Empty />
				)}
			</div>
		);
	};

	const colums = [
		{
			title: 'Catégorie',
			dataIndex: 'libelle',
			key: 'categ',
			filteredValue: [searchedText],
			onFilter: (value: any, unity: Unity) =>
				String(unity.libelle)
					.toLowerCase()
					.includes(String(value).toLowerCase()),
		},
		{
			key: 'action',
			dataIndex: 'action',
			width: '120px',
			title: 'Action',
			render: (_: any, cat: Category, __: number) => (
				<button
					className='border border-secondary-500 text-secondary-500 flex justify-center hover:text-secondary-700 py-px px-4'
					onClick={() => onUpdate(cat.id)}
				>
					Modifier
				</button>
			),
			ellipsis: true,
		},
	];

	return (
		<section className='mt-2'>
			<div className='w-full flex justify-end items-center mb-5'>
				<div>
					<Input.Search
						placeholder='Rechercher une catégorie'
						onSearch={(v) => setSearchedText(v)}
						onChange={(e) => setSearchedText(e.target.value)}
					/>
				</div>
			</div>
			<Table
				size='small'
				columns={colums}
				pagination={{ hideOnSinglePage: true, pageSize: 12 }}
				dataSource={categories}
				expandable={{ expandedRowRender, expandRowByClick: true }}
				rowKey={(record) => record.id}
			/>
		</section>
	);
};

export default Categories;
