import { useEffect, useState } from 'react';
import { PiDownloadSimpleFill } from 'react-icons/pi';
import { DatePicker, Select } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getGlobalHistoricByArticle } from '@/redux/inventaire/inventaire.slice';
import useArticles from '@/hooks/useArticles';

const { RangePicker } = DatePicker;

const ByArticle = () => {
	const [date, setDate] = useState<any>();
	const [articleId, setArticleId] = useState('');

	const dispatch = useAppDispatch();
	const { stockSheet } = useAppSelector((state) => state.inventaire);
	const { articles } = useArticles();

	useEffect(() => {
		dispatch(
			getGlobalHistoricByArticle({
				id: articleId,
				start: date?.[0]?.$d,
				end: date?.[1]?.$d,
			})
		);
	}, [articleId, date]);

	const entries = stockSheet.find((fiche) => fiche.typeOp == 'entry') ?? {
		typeOp: 'entry',
		data: [],
	};
	const outs = stockSheet.find((fiche) => fiche.typeOp == 'out') ?? {
		typeOp: 'out',
		data: [],
	};

	const maxLength = Math.max(entries?.data.length!, outs?.data.length!);

	const paddedEntries = Array.from(
		{ length: maxLength },
		(_, index) =>
			entries?.data[index] || {
				date: '',
				designation: '',
				libelle: '',
				qte: '',
			}
	);
	const paddedOuts = Array.from(
		{ length: maxLength },
		(_, index) =>
			outs?.data[index] || { date: '', designation: '', libelle: '', qte: '' }
	);

	return (
		<section>
			<div className='mb-5 flex justify-between'>
				<button
					// onClick={onGenerateList}
					className='flex gap-3 items-center rounded-md hover:shadow-lg duration-300 bg-secondary-700 px-4 py-2 text-white'
				>
					<PiDownloadSimpleFill className='text-xl' />
					<span>Exporter la liste</span>
				</button>
				<div className='flex gap-5'>
					<Select
						placeholder='Sélectionner article'
						optionLabelProp='label'
						showSearch
						onChange={(value) => setArticleId(value)}
						filterOption={(input, option) =>
							(option?.label ?? '').includes(input) ||
							(option?.label ?? '').toLowerCase().includes(input) ||
							(option?.label ?? '').toUpperCase().includes(input)
						}
						options={articles.map((art) => ({
							value: art.id,
							label: art.libelle,
						}))}
					/>
					<RangePicker
						format={'DD-MM-YYYY'}
						onChange={(values) => setDate(values)}
					/>
				</div>
			</div>
			<div className='flex justify-between bg-white p-4 mb-4'>
				{/* Colonne des Entrées */}
				<div className='w-1/2 pr-2'>
					<h2 className='text-lg font-semibold mb-2 text-center'>Entrées</h2>
					<table className='w-full'>
						<thead>
							<tr>
								<th className='border p-2'>N°</th>
								<th className='border p-2'>Date</th>
								<th className='border p-2'>Article</th>
								<th className='border p-2'>Libellé</th>
								<th className='border p-2'>Qty</th>
							</tr>
						</thead>
						<tbody>
							{paddedEntries.map((entry, index) => (
								<tr key={index}>
									<td className='border p-2'>{index + 1}</td>
									<td className='border p-2'>{`${
										entry.date?.toString().slice(0, 10) || ''
									}`}</td>
									<td className='border p-2'>{entry.designation || ''}</td>
									<td className='border p-2'>{entry.libelle || ''}</td>
									<td className='border p-2'>{entry.qte || ''}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Colonne des Sorties */}
				<div className='w-1/2 pl-2'>
					<h2 className='text-lg font-semibold mb-2 text-center'>Sorties</h2>
					<table className='w-full'>
						<thead>
							<tr>
								<th className='border p-2'>N°</th>
								<th className='border p-2'>Date</th>
								<th className='border p-2'>Article</th>
								<th className='border p-2'>Libellé</th>
								<th className='border p-2'>Qty</th>
							</tr>
						</thead>
						<tbody>
							{paddedOuts.map((exit, index) => (
								<tr key={index}>
									<td className='border p-2'>{index + 1}</td>
									<td className='border p-2'>{`${
										exit.date?.toString().slice(0, 10) || ''
									}`}</td>
									<td className='border p-2'>{exit.designation || ''}</td>
									<td className='border p-2'>{exit.libelle || ''}</td>
									<td className='border p-2'>{exit.qte || ''}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default ByArticle;
