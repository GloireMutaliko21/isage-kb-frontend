import React, { useState } from 'react';
import { Input, Table, Tag } from 'antd';
import { PiDownloadSimpleFill } from 'react-icons/pi';
import useArticles from '@/hooks/useArticles';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getArticleById } from '@/redux/article/article.slice';
import { openModal } from '@/redux/modalWindow/modalwindow.slice';
import { useAppSelector } from '@/hooks/useAppSelector';
import { generateArticlesList } from '@/docs/listeArticles';

const Articles = () => {
	const [searchedText, setSearchedText] = useState('');

	const { articles } = useArticles();
	const dispatch = useAppDispatch();

	const onGenerateList = async () => {
		if (!articles) return;
		await generateArticlesList(articles);
	};

	const onUpdate = (id: string) => {
		dispatch(getArticleById(id));
		dispatch(openModal({ modal_ID: 'UPDATE_ARTICLE' }));
	};

	return (
		<div>
			<div className='w-full flex justify-between items-center mb-5'>
				<button
					onClick={onGenerateList}
					className='flex gap-3 items-center rounded-md hover:shadow-lg duration-300 bg-secondary-700 px-4 py-2 text-white'
				>
					<PiDownloadSimpleFill className='text-xl' />
					<span>Exporter la liste</span>
				</button>
				<div>
					<Input.Search
						placeholder='Rechercher un article'
						onSearch={(v) => setSearchedText(v)}
						onChange={(e) => setSearchedText(e.target.value)}
					/>
				</div>
			</div>
			<Table
				size='small'
				pagination={{ hideOnSinglePage: true, pageSize: 12 }}
				dataSource={articles}
				columns={[
					{
						key: 'id',
						dataIndex: 'id',
						title: 'N°',
						render: (_, __, index) => index + 1,
						width: '3rem',
					},
					{
						key: 'libelle',
						dataIndex: 'libelle',
						title: 'Désignation',
						ellipsis: true,
						filteredValue: [searchedText],
						onFilter: (value, article) => {
							return (
								String(article.libelle)
									.toLowerCase()
									.includes(String(value).toLowerCase()) ||
								String(article.category?.libelle)
									.toLowerCase()
									.includes(String(value).toLowerCase())
							);
						},
					},
					{
						key: 'qty',
						dataIndex: 'qty',
						title: 'Quantité',
						width: '120px',
						render: (_, art, __) => (
							<Tag color={art.qty! >= art.stockAlert! ? 'geekblue' : 'error'}>
								{art.qty}
							</Tag>
						),
						ellipsis: true,
						align: 'center',
					},
					{
						key: 'unity',
						dataIndex: 'unity',
						title: 'Unité',
						render: (_, art, __) => art.unity?.libelle,
						ellipsis: true,
						align: 'center',
					},
					{
						key: 'category',
						dataIndex: 'category',
						title: 'Catégorie',
						render: (_, art, __) => art.category?.libelle,
						ellipsis: true,
						align: 'center',
					},
					{
						key: 'stockAlert',
						dataIndex: 'stockAlert',
						title: "Stock d'alerte",
						ellipsis: true,
						align: 'center',
					},
					{
						key: 'action',
						dataIndex: 'action',
						width: '120px',
						title: '',
						render: (_, { id }, __) => (
							<button
								className='border border-secondary-500 text-secondary-500 flex justify-center hover:text-secondary-700 py-px px-4'
								onClick={() => onUpdate(id)}
							>
								Modifier
							</button>
						),
						ellipsis: true,
					},
				]}
				components={{
					header: {
						cell: ({ children, ...rest }: { children: React.ReactNode }) => (
							<td
								{...rest}
								className='p-2 !bg-white !text-slate-500 !font-bold'
							>
								{children}
							</td>
						),
					},
					body: {
						cell: ({ children, ...rest }: { children: React.ReactNode }) => (
							<td {...rest} className='!text-slate-500'>
								{children}
							</td>
						),
					},
				}}
			/>
		</div>
	);
};

export default Articles;
