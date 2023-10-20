'use client';
import { PiDownloadSimpleFill } from 'react-icons/pi';
import { useState } from 'react';
import { Input, Table, Tag } from 'antd';
import PageHeader from '@/components/global/PageHeader';
import useImmob from '@/hooks/useImmob';
import { frenchFormattedDate } from '@/utils/dates';
import CreateImmob from '@/components/patrimoine/immobs/CreateImmob';
import { generateImmobsList } from '@/docs/immobs';

const Page = () => {
	const [searchedText, setSearchedText] = useState('');
	const [openDrawer, setopenDrawer] = useState(false);
	const { immobs } = useImmob();

	const CreateImmobButton = () => {
		return (
			<div className=''>
				<button onClick={() => setopenDrawer(true)}>
					Ajouter une immobilisation
				</button>
			</div>
		);
	};

	const onGenerateList = async () => {
		if (!immobs) return;
		await generateImmobsList(immobs);
	};
	return (
		<main className='flex flex-col h-full'>
			<PageHeader
				title='Immobilisations'
				actionButton={<CreateImmobButton />}
			/>
			<section className='p-5 flex-grow'>
				<div className='bg-white p-5 rounded-lg h-full'>
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
								placeholder='Rechercher une immobilisation'
								onSearch={(v) => setSearchedText(v)}
								onChange={(e) => setSearchedText(e.target.value)}
							/>
						</div>
					</div>
					<Table
						size='small'
						pagination={{ hideOnSinglePage: true, pageSize: 12 }}
						dataSource={immobs}
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
								title: 'Libellé',

								filteredValue: [searchedText],
								onFilter: (value, article) => {
									return (
										String(article.libelle)
											.toLowerCase()
											.includes(String(value).toLowerCase()) ||
										String(article.category?.libelle)
											.toLowerCase()
											.includes(String(value).toLowerCase()) ||
										String(article.service?.libelle)
											.toLowerCase()
											.includes(String(value).toLowerCase())
									);
								},
							},
							{
								key: 'valDepart',
								dataIndex: 'valDepart',
								title: 'Vo',
								width: '120px',
								render: (_, immob, __) => (
									<Tag
										color={immob.valDepart! >= immob.vnc! ? 'cyan' : 'geekblue'}
									>
										{immob.valDepart}
									</Tag>
								),

								align: 'center',
							},
							{
								key: 'duration',
								dataIndex: 'duration',
								title: 'Durée de vie',
								render: (_, immob, __) => (
									<Tag color='blue'>{immob.duration} an(s)</Tag>
								),

								align: 'center',
							},
							{
								key: 'vnc',
								dataIndex: 'vnc',
								title: 'VNC',
								render: (_, immob, __) => (
									<Tag color='geekblue'>{immob.vnc}</Tag>
								),

								align: 'center',
							},
							{
								key: 'service',
								dataIndex: 'service',
								title: 'Service',
								render: (_, immob, __) => immob.service?.libelle,

								align: 'center',
							},
							{
								key: 'category',
								dataIndex: 'category',
								title: 'category',
								render: (_, immob, __) => immob.category?.libelle,

								align: 'center',
							},
							{
								key: 'amortissDate',
								dataIndex: 'amortissDate',
								title: 'Date amortissement',
								render: (_, immob, __) =>
									frenchFormattedDate(immob.amortissDate),
								align: 'center',
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
			</section>
			<CreateImmob openDrawer={openDrawer} setOpenDrawer={setopenDrawer} />
		</main>
	);
};

export default Page;
