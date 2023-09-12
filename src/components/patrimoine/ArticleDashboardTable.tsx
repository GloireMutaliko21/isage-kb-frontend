import { Table, Tag } from 'antd';
const ArticleDashboardTable = ({ data }: { data: Article[] }) => {
	return (
		<section className='p-5'>
			<div className='bg-white p-5 rounded-lg'>
				<div className='mb-5 text-lg text-slate-600 font-semibold'>
					Articles
				</div>
				<div>
					<Table
						size='small'
						pagination={{ hideOnSinglePage: true, pageSize: 8 }}
						dataSource={data}
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
							},
							{
								key: 'qty',
								dataIndex: 'qty',
								title: 'Quantité',
								render: (_, art, __) => (
									<Tag
										color={art.qty! >= art.stockAlert! ? 'geekblue' : 'error'}
									>
										{art.qty}
									</Tag>
								),
								ellipsis: true,
							},
							{
								key: 'unity',
								dataIndex: 'unity',
								title: 'Unité',
								render: (_, art, __) => art.unity?.libelle,
								ellipsis: true,
							},
							{
								key: 'category',
								dataIndex: 'category',
								title: 'Catégorie',
								render: (_, art, __) => art.category?.libelle,
								ellipsis: true,
							},
							{
								key: 'stockAlert',
								dataIndex: 'stockAlert',
								title: "Stock d'alerte",
								ellipsis: true,
							},
						]}
						components={{
							header: {
								cell: ({
									children,
									...rest
								}: {
									children: React.ReactNode;
								}) => (
									<td
										{...rest}
										className='p-2 !bg-white !text-slate-500 !font-bold'
									>
										{children}
									</td>
								),
							},
							body: {
								cell: ({
									children,
									...rest
								}: {
									children: React.ReactNode;
								}) => (
									<td {...rest} className='!text-slate-500'>
										{children}
									</td>
								),
							},
						}}
					/>
				</div>
			</div>
		</section>
	);
};

export default ArticleDashboardTable;
