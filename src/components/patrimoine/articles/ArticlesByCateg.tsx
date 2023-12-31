import { generateArticlesListByCateg } from '@/docs/listeArticles';
import useArticles from '@/hooks/useArticles';
import { Input, Table } from 'antd';
import { useState } from 'react';
import { PiDownloadSimpleFill } from 'react-icons/pi';

const ArticlesByCateg = () => {
	const [searchedText, setSearchedText] = useState('');

	const { articlesByCateg } = useArticles();
	const onGenerateList = async () => {
		if (!articlesByCateg) return;
		await generateArticlesListByCateg(articlesByCateg);
	};

	const expandedRowRender = (data: ArticleByCated) => {
		const columns = [
			{ title: 'Désignation', dataIndex: 'libelle', key: 'libelle' },
			{ title: 'Quantité', dataIndex: 'qte', key: 'qte' },
			{ title: 'Stock alerte', dataIndex: 'stockAlert', key: 'stockAlert' },
			{ title: 'Unité de mesure', dataIndex: 'unity', key: 'unity' },
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
			title: 'Catégorie',
			dataIndex: 'categorie',
			key: 'categ',
			filteredValue: [searchedText],
			onFilter: (value: any, categ: ArticleByCated) =>
				String(categ.categorie)
					.toLowerCase()
					.includes(String(value).toLowerCase()),
		},
	];

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
				dataSource={articlesByCateg}
				columns={colums}
				expandable={{ expandedRowRender, expandRowByClick: true }}
				size='small'
				rowKey={(record) => record.categorie}
			/>
		</div>
	);
};

export default ArticlesByCateg;
