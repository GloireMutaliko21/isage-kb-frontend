'use client';
import React, { useState } from 'react';
import { Input, Table } from 'antd';
import useArticleUnity from '@/hooks/useArticleUnity';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getUnityById } from '@/redux/article-unity/article-unity.slice';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';

const Unities = () => {
	const [searchedText, setSearchedText] = useState('');

	const { unities } = useArticleUnity();
	const dispatch = useAppDispatch();

	const onUpdate = (id: string) => {
		dispatch(getUnityById(id));
		dispatch(openModal({ modal_ID: 'UPDATE_UNITY' }));
	};

	const expandedRowRender = (data: Unity) => {
		const columns = [
			{ title: 'Désignation', dataIndex: 'libelle', key: 'libelle' },
			{ title: 'Quantité', dataIndex: 'qty', key: 'qty' },
			{ title: 'Stock alerte', dataIndex: 'stockAlert', key: 'stockAlert' },
			{
				title: 'Catégorie',
				dataIndex: 'categ',
				key: 'categ',
				render: (_: any, art: Article, __: number) => (
					<p>{art.category?.libelle}</p>
				),
			},
		];
		return (
			<Table
				columns={columns}
				dataSource={data.articles}
				pagination={false}
				size='small'
			/>
		);
	};

	const colums = [
		{
			title: 'Unité',
			dataIndex: 'libelle',
			key: 'unité',
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
			render: (_: any, unity: Unity, __: number) => (
				<button
					className='border border-secondary-500 text-secondary-500 flex justify-center hover:text-secondary-700 py-px px-4'
					onClick={() => onUpdate(unity.id)}
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
						placeholder='Rechercher une unité'
						onSearch={(v) => setSearchedText(v)}
						onChange={(e) => setSearchedText(e.target.value)}
					/>
				</div>
			</div>
			<Table
				size='small'
				columns={colums}
				pagination={{ hideOnSinglePage: true, pageSize: 12 }}
				dataSource={unities}
				expandable={{ expandedRowRender, expandRowByClick: true }}
				rowKey={(record) => record.id}
			/>
		</section>
	);
};

export default Unities;
