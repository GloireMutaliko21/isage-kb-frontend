import { useEffect, useState } from 'react';
import { Input, Table, Tag } from 'antd';
import { PiDownloadSimpleFill } from 'react-icons/pi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getMonthSynthese } from '@/redux/inventaire/inventaire.slice';

const MonthSynthese = () => {
	const [searchedText, setSearchedText] = useState('');
	const dispatch = useAppDispatch();
	const { sheetSynthese } = useAppSelector((state) => state.inventaire);
	useEffect(() => {
		dispatch(getMonthSynthese());
	}, []);

	return (
		<section className='mt-2'>
			<div className='w-full flex justify-between items-center mb-5'>
				<button
					// onClick={onGenerateList}
					className='flex gap-3 items-center rounded-md hover:shadow-lg duration-300 bg-secondary-700 px-4 py-2 text-white'
				>
					<PiDownloadSimpleFill className='text-xl' />
					<span>Exporter l&apos;historique </span>
				</button>
				<div>
					<Input.Search
						placeholder='Rechercher par article'
						onSearch={(v) => setSearchedText(v)}
						onChange={(e) => setSearchedText(e.target.value)}
					/>
				</div>
			</div>
			<Table
				size='small'
				pagination={{ hideOnSinglePage: true, pageSize: 12 }}
				dataSource={sheetSynthese}
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
						title: 'Article',
						filteredValue: [searchedText],
						onFilter: (value, data) => {
							return String(data.libelle)
								.toLowerCase()
								.includes(String(value).toLowerCase());
						},
					},
					{
						key: 'entree',
						dataIndex: 'entree',
						title: 'Quantité entrée',
						render: (_, { entree }, __) => <Tag color='blue'>{entree}</Tag>,
					},
					{
						key: 'sortie',
						dataIndex: 'sortie',
						title: 'Quantité sortie',
						render: (_, { sortie }, __) => <Tag color='pink'>{sortie}</Tag>,
					},
					{
						key: 'qty',
						dataIndex: 'qty',
						title: 'Quantité disponible',
						render: (_, { qty }, __) => (
							<Tag color={`${qty! > 0 ? 'gold' : 'error'}`}>{qty}</Tag>
						),
					},
				]}
				components={{
					header: {
						cell: ({ children, ...rest }: { children: React.ReactNode }) => (
							<td {...rest} className='!p-2 !text-slate-500 !font-bold'>
								{children}
							</td>
						),
					},
				}}
			/>
		</section>
	);
};

export default MonthSynthese;
